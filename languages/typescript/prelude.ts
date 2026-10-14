// Run before every koan, on ONE line (the build drops these comments), so the koan's lines shift
// by exactly one. ___ and assert come from the worker (public/runtime/typescript/worker.js, which
// also declares their types). The async function lets koans use await; the epilogue closes it.
"use strict"; const { ___, assert } = globalThis.__koan; (async () => {
