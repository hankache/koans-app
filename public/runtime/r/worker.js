// Runs R koans on webR: R compiled to WebAssembly. In the browser this is a module worker, which
// hosts webR (webR runs R in a worker of its own, started from here); under Node, the build tools
// import makeRunner() from it (languages/r/node.mjs), so the checker and the tests use this same
// code.
//
// R starts once (about a second), so a run doesn't restart it: the runner empties the global
// environment, where the prelude and the koan define everything, before every run.
//
// Protocol:  in  { type: 'run', id, src }
//            out { type: 'ready', version } | { type: 'loaderror', message }
//                { type: 'done', id, rc, lines: [{ stream, text }] }
//                { type: 'crash', id, message, lines }

/**
 * The runner, attached to R's search path once, so emptying the global environment leaves it.
 * .koan_run(src) runs a whole koan (prelude + code + epilogue) the way Rscript runs a file: one
 * top-level expression at a time, printing visible values. An error the koan doesn't catch is
 * reported on stderr, then its line; the result is the exit code.
 */
const RUNNER = String.raw`
local({
  runner <- new.env()
  runner$top <- 0L

  # The line of the innermost call that came from koan.R, or else the top-level expression's.
  runner$line_of <- function(calls) {
    for (call in rev(calls)) {
      ref <- attr(call, "srcref")
      if (!is.null(ref) && identical(attr(ref, "srcfile")$filename, "koan.R") && ref[1] > 1) return(ref[1])
    }
    runner$top
  }

  runner$fail <- function(what, line) {
    message(what)
    if (line > 0) message("    at koan.R:", line)
    1L
  }

  .koan_top_line <- function() runner$top

  .koan_run <- function(src) {
    rm(list = ls(globalenv(), all.names = TRUE), envir = globalenv())
    # R names can't start with _, so every blank is quoted with backticks (x60) before parsing.
    src <- gsub("(?<![\\w\x60])___(?![\\w\x60])", "\x60___\x60", src, perl = TRUE)
    lines <- strsplit(src, "\n", fixed = TRUE)[[1]]
    exprs <- tryCatch(
      parse(text = lines, srcfile = srcfilecopy("koan.R", lines), keep.source = TRUE),
      error = function(e) e
    )
    if (inherits(exprs, "error")) {
      # "koan.R:3:7: unexpected '='" followed by the code and a caret.
      first <- strsplit(conditionMessage(exprs), "\n", fixed = TRUE)[[1]][1]
      line <- suppressWarnings(as.integer(sub("^[^:]*:(\\d+):.*$", "\\1", first)))
      return(runner$fail(paste0("Error: ", sub("^[^:]*:\\d+:\\d+: ", "", first)), if (is.na(line)) 0L else line))
    }
    refs <- attr(exprs, "srcref")
    for (i in seq_along(exprs)) {
      runner$top <- refs[[i]][1]
      where <- 0L
      outcome <- tryCatch(
        withCallingHandlers(
          {
            shown <- withVisible(eval(exprs[[i]], globalenv()))
            if (shown$visible) print(shown$value)
            NULL
          },
          error = function(e) where <<- runner$line_of(sys.calls()),
          warning = function(w) {
            cat("Warning message:\n", conditionMessage(w), "\n", sep = "")
            invokeRestart("muffleWarning")
          }
        ),
        error = function(e) e
      )
      if (inherits(outcome, "error")) {
        call <- conditionCall(outcome)
        what <- if (is.null(call) || identical(call[[1]], quote(eval)) || identical(call[[1]], quote(withVisible)))
          paste0("Error: ", conditionMessage(outcome))
        else
          paste0("Error in ", paste(deparse(call, width.cutoff = 500L), collapse = " "), ": ", conditionMessage(outcome))
        return(runner$fail(what, if (where > 0) where else runner$top))
      }
    }
    0L
  }

  attach(list(.koan_run = .koan_run, .koan_top_line = .koan_top_line), name = "koans:runner")
})
`;

/** A runner on webR: the WebR class and ChannelType from webr.mjs, and the folder of webR's files. */
export async function makeRunner(WebR, ChannelType, baseUrl) {
  // PostMessage: no SharedArrayBuffer, so no cross-origin isolation headers are needed.
  const webR = new WebR({ baseUrl, channelType: ChannelType.PostMessage, interactive: false });
  // webR warns, once R has started, that this channel has no nested R REPLs, which koans don't use.
  const { warn } = console;
  console.warn = (...args) => /nested R REPLs/.test(String(args[0])) || warn(...args);
  await webR.init();
  await webR.evalRVoid(RUNNER);
  const version = await webR.evalRString('paste(R.version$major, R.version$minor, sep = ".")');

  async function run(src) {
    const shelter = await new webR.Shelter();
    try {
      const { result, output } = await shelter.captureR('.koan_run(src)', {
        env: { src },
        captureConditions: false,
        captureGraphics: false,
        throwJsException: false,
      });
      const lines = [];
      for (const { type, data } of output) {
        const stream = type === 'stdout' ? 'out' : 'err';
        for (const text of String(data).split('\n')) lines.push({ stream, text });
      }
      return { rc: await result.toNumber(), lines };
    } catch (error) {
      return { rc: -1, lines: [], crash: String(error?.message ?? error) };
    } finally {
      await shelter.purge();
    }
  }

  return { run, version: `R ${version}`, close: () => webR.close() };
}

// In a browser worker: start webR once, then answer the page.
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && self.location.href === import.meta.url) {
  const ready = (async () => {
    // webr.js is webR's browser build (webr.mjs imports Node's modules).
    const { WebR, ChannelType } = await import('./webr/webr.js');
    return makeRunner(WebR, ChannelType, new URL('./webr/', import.meta.url).href);
  })();
  ready.then(
    ({ version }) => self.postMessage({ type: 'ready', version }),
    error => self.postMessage({ type: 'loaderror', message: String(error) }),
  );
  self.onmessage = async ({ data }) => {
    if (data.type !== 'run') return;
    const { run } = await ready;
    const { rc, lines, crash } = await run(data.src);
    self.postMessage(crash ? { type: 'crash', id: data.id, message: crash, lines } : { type: 'done', id: data.id, rc, lines });
  };
}
