// A small WASI (preview 1) for Go's compiler, its linker and the programs they build, with an
// in-memory file system. It covers what those three call; anything else answers ENOSYS. Used by
// the worker in the browser and by languages/go/node.mjs under Node, so both run Go the same way.

const ERR = { SUCCESS: 0, BADF: 8, EXIST: 20, INVAL: 28, ISDIR: 31, NOENT: 44, NOSYS: 52, NOTDIR: 54 };
const TYPE = { CHAR: 2, DIR: 3, FILE: 4 };
const ALL_RIGHTS = 0xffffffffffffffffn;

/** Thrown by proc_exit to stop the program: start() returns its code. */
class Exit {
  constructor(code) {
    this.code = code;
  }
}

/**
 * Files by absolute path. Each is { data: Uint8Array, size }, with data growing as it's written.
 * Folders are the parents of files, plus any made with mkdir.
 */
export class MemFS {
  constructor() {
    this.files = new Map();
    this.dirs = new Set(['/']);
  }
  write(path, bytes) {
    this.files.set(path, { data: bytes, size: bytes.length });
    for (let d = parent(path); !this.dirs.has(d); d = parent(d)) this.dirs.add(d);
  }
  read(path) {
    const f = this.files.get(path);
    return f && f.data.subarray(0, f.size);
  }
  isDir(path) {
    return this.dirs.has(path);
  }
}

const parent = path => path.slice(0, path.lastIndexOf('/')) || '/';

function resolve(base, rel) {
  const parts = rel.startsWith('/') ? [] : base.split('/').filter(Boolean);
  for (const p of rel.split('/')) {
    if (p === '' || p === '.') continue;
    if (p === '..') parts.pop();
    else parts.push(p);
  }
  return '/' + parts.join('/');
}

/**
 * One process: its arguments and environment, a file system with / preopened as fd 3, and
 * callbacks for what it writes to stdout (1) and stderr (2).
 */
export class WASI {
  constructor({ args, env = {}, fs, write }) {
    this.args = args;
    this.env = Object.entries(env).map(([k, v]) => `${k}=${v}`);
    this.fs = fs;
    this.write = write;
    this.fds = new Map([
      [0, { kind: 'stdio' }],
      [1, { kind: 'stdio' }],
      [2, { kind: 'stdio' }],
      [3, { kind: 'dir', path: '/', preopen: true }],
    ]);
    this.nextFd = 4;
    this.imports = { wasi_snapshot_preview1: this.functions() };
  }

  /** Runs the program's _start; returns its exit code. */
  start(instance) {
    this.memory = instance.exports.memory;
    try {
      instance.exports._start();
      return 0;
    } catch (e) {
      if (e instanceof Exit) return e.code;
      throw e;
    }
  }

  functions() {
    const enc = new TextEncoder();
    const dec = new TextDecoder();
    const view = () => new DataView(this.memory.buffer);
    const bytes = () => new Uint8Array(this.memory.buffer);
    const str = (ptr, len) => dec.decode(bytes().subarray(ptr, ptr + len));
    const fs = this.fs;
    const fds = this.fds;

    // Each iovec: a pointer and a length.
    const iovecs = (ptr, count) => {
      const v = view();
      return Array.from({ length: count }, (_, i) => [v.getUint32(ptr + i * 8, true), v.getUint32(ptr + i * 8 + 4, true)]);
    };
    const strings = (list, ptrsAt, bufAt) => {
      const v = view();
      for (const s of list) {
        const b = enc.encode(s + '\0');
        v.setUint32(ptrsAt, bufAt, true);
        bytes().set(b, bufAt);
        ptrsAt += 4;
        bufAt += b.length;
      }
      return ERR.SUCCESS;
    };
    const sizes = (list, countAt, sizeAt) => {
      view().setUint32(countAt, list.length, true);
      view().setUint32(sizeAt, list.reduce((n, s) => n + enc.encode(s).length + 1, 0), true);
      return ERR.SUCCESS;
    };
    const filestat = (at, type, size) => {
      const v = view();
      for (let i = 0; i < 64; i += 8) v.setBigUint64(at + i, 0n, true);
      v.setUint8(at + 16, type);
      v.setBigUint64(at + 24, 1n, true);
      v.setBigUint64(at + 32, BigInt(size), true);
    };
    const pathAt = (dirfd, ptr, len) => {
      const dir = fds.get(dirfd);
      return dir?.kind === 'dir' ? resolve(dir.path, str(ptr, len)) : null;
    };
    const stat = path => (fs.files.has(path) ? [TYPE.FILE, fs.files.get(path).size] : fs.isDir(path) ? [TYPE.DIR, 0] : null);

    // Writes into a file at a position, growing it as needed.
    const writeAt = (file, pos, chunk) => {
      const end = pos + chunk.length;
      if (end > file.data.length) {
        const grown = new Uint8Array(Math.max(end, file.data.length * 2, 4096));
        grown.set(file.data.subarray(0, file.size));
        file.data = grown;
      }
      file.data.set(chunk, pos);
      file.size = Math.max(file.size, end);
    };
    const readAt = (file, pos, iovs) => {
      let n = 0;
      for (const [ptr, len] of iovs) {
        const chunk = file.data.subarray(Math.min(pos + n, file.size), Math.min(pos + n + len, file.size));
        bytes().set(chunk, ptr);
        n += chunk.length;
        if (chunk.length < len) break;
      }
      return n;
    };

    return {
      args_sizes_get: (c, s) => sizes(this.args, c, s),
      args_get: (p, b) => strings(this.args, p, b),
      environ_sizes_get: (c, s) => sizes(this.env, c, s),
      environ_get: (p, b) => strings(this.env, p, b),

      clock_res_get: (_id, at) => (view().setBigUint64(at, 1000n, true), ERR.SUCCESS),
      clock_time_get: (id, _precision, at) => {
        const ms = id === 0 ? Date.now() : performance.now();
        view().setBigUint64(at, BigInt(Math.round(ms * 1e6)), true);
        return ERR.SUCCESS;
      },
      random_get: (ptr, len) => {
        for (let i = 0; i < len; i += 65536) crypto.getRandomValues(bytes().subarray(ptr + i, ptr + Math.min(len, i + 65536)));
        return ERR.SUCCESS;
      },
      sched_yield: () => ERR.SUCCESS,
      proc_exit: code => {
        throw new Exit(code);
      },
      // Go sleeps by waiting on a clock. A worker can't block, so a sleep spins until it's over;
      // anything else is ready at once.
      poll_oneoff: (inAt, outAt, count, neventsAt) => {
        const v = view();
        for (let i = 0; i < count; i++) {
          const sub = inAt + i * 48;
          const tag = v.getUint8(sub + 8);
          if (tag === 0) {
            const timeout = Number(v.getBigUint64(sub + 24, true)) / 1e6;
            const absolute = v.getUint16(sub + 40, true) & 1;
            const until = absolute ? timeout : performance.now() + timeout;
            while (performance.now() < until);
          }
          const ev = outAt + i * 32;
          v.setBigUint64(ev, v.getBigUint64(sub, true), true);
          v.setUint16(ev + 8, 0, true);
          v.setUint8(ev + 10, tag);
          for (let j = 16; j < 32; j += 8) v.setBigUint64(ev + j, 0n, true);
        }
        v.setUint32(neventsAt, count, true);
        return ERR.SUCCESS;
      },

      fd_write: (fd, iovsAt, count, writtenAt) => {
        const f = fds.get(fd);
        if (!f) return ERR.BADF;
        let n = 0;
        for (const [ptr, len] of iovecs(iovsAt, count)) {
          const chunk = bytes().slice(ptr, ptr + len);
          if (f.kind === 'stdio') this.write(fd, chunk);
          else if (f.kind === 'file') {
            const file = fs.files.get(f.path);
            const pos = f.append ? file.size : f.pos;
            writeAt(file, pos, chunk);
            f.pos = pos + len;
          } else return ERR.BADF;
          n += len;
        }
        view().setUint32(writtenAt, n, true);
        return ERR.SUCCESS;
      },
      fd_pwrite: (fd, iovsAt, count, offset, writtenAt) => {
        const f = fds.get(fd);
        if (f?.kind !== 'file') return ERR.BADF;
        let pos = Number(offset);
        for (const [ptr, len] of iovecs(iovsAt, count)) {
          writeAt(fs.files.get(f.path), pos, bytes().slice(ptr, ptr + len));
          pos += len;
        }
        view().setUint32(writtenAt, pos - Number(offset), true);
        return ERR.SUCCESS;
      },
      fd_read: (fd, iovsAt, count, readAt_) => {
        const f = fds.get(fd);
        if (!f) return ERR.BADF;
        if (f.kind === 'stdio') return view().setUint32(readAt_, 0, true), ERR.SUCCESS;
        if (f.kind !== 'file') return ERR.ISDIR;
        const n = readAt(fs.files.get(f.path), f.pos, iovecs(iovsAt, count));
        f.pos += n;
        view().setUint32(readAt_, n, true);
        return ERR.SUCCESS;
      },
      fd_pread: (fd, iovsAt, count, offset, readAt_) => {
        const f = fds.get(fd);
        if (f?.kind !== 'file') return ERR.BADF;
        view().setUint32(readAt_, readAt(fs.files.get(f.path), Number(offset), iovecs(iovsAt, count)), true);
        return ERR.SUCCESS;
      },
      fd_seek: (fd, offset, whence, newAt) => {
        const f = fds.get(fd);
        if (f?.kind !== 'file') return ERR.BADF;
        const base = whence === 0 ? 0 : whence === 1 ? f.pos : fs.files.get(f.path).size;
        f.pos = base + Number(offset);
        view().setBigUint64(newAt, BigInt(f.pos), true);
        return ERR.SUCCESS;
      },
      fd_tell: (fd, at) => {
        const f = fds.get(fd);
        if (f?.kind !== 'file') return ERR.BADF;
        view().setBigUint64(at, BigInt(f.pos), true);
        return ERR.SUCCESS;
      },
      fd_close: fd => (fds.delete(fd) ? ERR.SUCCESS : ERR.BADF),
      fd_sync: () => ERR.SUCCESS,
      fd_datasync: () => ERR.SUCCESS,
      fd_fdstat_get: (fd, at) => {
        const f = fds.get(fd);
        if (!f) return ERR.BADF;
        const v = view();
        v.setUint8(at, f.kind === 'stdio' ? TYPE.CHAR : f.kind === 'dir' ? TYPE.DIR : TYPE.FILE);
        v.setUint16(at + 2, f.append ? 1 : 0, true);
        v.setBigUint64(at + 8, ALL_RIGHTS, true);
        v.setBigUint64(at + 16, ALL_RIGHTS, true);
        return ERR.SUCCESS;
      },
      fd_fdstat_set_flags: () => ERR.SUCCESS,
      fd_filestat_get: (fd, at) => {
        const f = fds.get(fd);
        if (!f) return ERR.BADF;
        if (f.kind === 'stdio') filestat(at, TYPE.CHAR, 0);
        else if (f.kind === 'dir') filestat(at, TYPE.DIR, 0);
        else filestat(at, TYPE.FILE, fs.files.get(f.path).size);
        return ERR.SUCCESS;
      },
      fd_filestat_set_size: (fd, size) => {
        const f = fds.get(fd);
        if (f?.kind !== 'file') return ERR.BADF;
        const file = fs.files.get(f.path);
        const n = Number(size);
        if (n > file.size) writeAt(file, file.size, new Uint8Array(n - file.size));
        file.size = n;
        return ERR.SUCCESS;
      },
      fd_prestat_get: (fd, at) => {
        const f = fds.get(fd);
        if (!f?.preopen) return ERR.BADF;
        view().setUint8(at, 0);
        view().setUint32(at + 4, enc.encode(f.path).length, true);
        return ERR.SUCCESS;
      },
      fd_prestat_dir_name: (fd, ptr, len) => {
        const f = fds.get(fd);
        if (!f?.preopen) return ERR.BADF;
        bytes().set(enc.encode(f.path).subarray(0, len), ptr);
        return ERR.SUCCESS;
      },
      fd_readdir: (fd, _buf, _len, _cookie, usedAt) => {
        if (fds.get(fd)?.kind !== 'dir') return ERR.NOTDIR;
        view().setUint32(usedAt, 0, true);
        return ERR.SUCCESS;
      },

      path_open: (dirfd, _dirflags, ptr, len, oflags, _rb, _ri, fdflags, fdAt) => {
        const path = pathAt(dirfd, ptr, len);
        if (path === null) return ERR.BADF;
        const CREAT = 1, DIRECTORY = 2, EXCL = 4, TRUNC = 8;
        let f;
        if (fs.isDir(path)) {
          f = { kind: 'dir', path };
        } else {
          if (oflags & DIRECTORY) return fs.files.has(path) ? ERR.NOTDIR : ERR.NOENT;
          const exists = fs.files.has(path);
          if (exists && oflags & EXCL) return ERR.EXIST;
          if (!exists && !(oflags & CREAT)) return ERR.NOENT;
          if (!fs.isDir(parent(path))) return ERR.NOENT;
          if (!exists || oflags & TRUNC) fs.write(path, new Uint8Array(0));
          f = { kind: 'file', path, pos: 0, append: Boolean(fdflags & 1) };
        }
        const fd = this.nextFd++;
        fds.set(fd, f);
        view().setUint32(fdAt, fd, true);
        return ERR.SUCCESS;
      },
      path_filestat_get: (dirfd, _flags, ptr, len, at) => {
        const path = pathAt(dirfd, ptr, len);
        if (path === null) return ERR.BADF;
        const s = stat(path);
        if (!s) return ERR.NOENT;
        filestat(at, ...s);
        return ERR.SUCCESS;
      },
      path_filestat_set_times: () => ERR.SUCCESS,
      path_create_directory: (dirfd, ptr, len) => {
        const path = pathAt(dirfd, ptr, len);
        if (path === null) return ERR.BADF;
        if (stat(path)) return ERR.EXIST;
        fs.dirs.add(path);
        return ERR.SUCCESS;
      },
      path_remove_directory: (dirfd, ptr, len) => {
        const path = pathAt(dirfd, ptr, len);
        if (path === null) return ERR.BADF;
        return fs.dirs.delete(path) ? ERR.SUCCESS : ERR.NOENT;
      },
      path_unlink_file: (dirfd, ptr, len) => {
        const path = pathAt(dirfd, ptr, len);
        if (path === null) return ERR.BADF;
        return fs.files.delete(path) ? ERR.SUCCESS : ERR.NOENT;
      },
      path_rename: (fd1, p1, l1, fd2, p2, l2) => {
        const from = pathAt(fd1, p1, l1);
        const to = pathAt(fd2, p2, l2);
        if (from === null || to === null) return ERR.BADF;
        const file = fs.files.get(from);
        if (!file) return ERR.NOENT;
        fs.files.delete(from);
        fs.files.set(to, file);
        return ERR.SUCCESS;
      },
      path_readlink: () => ERR.INVAL,
      path_symlink: () => ERR.NOSYS,
      path_link: () => ERR.NOSYS,
      sock_accept: () => ERR.NOSYS,
      sock_recv: () => ERR.NOSYS,
      sock_send: () => ERR.NOSYS,
      sock_shutdown: () => ERR.NOSYS,
    };
  }
}
