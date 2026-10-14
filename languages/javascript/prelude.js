// Run before every koan, on ONE line (the build drops these comments), so the koan's lines shift
// by exactly one. Vitest's expect lives in the worker (public/runtime/javascript/worker.js), which
// hands it over in globalThis.__koan. The async function lets koans use await; the epilogue
// closes it.
"use strict"; const { ___, expect } = globalThis.__koan; (async () => {
