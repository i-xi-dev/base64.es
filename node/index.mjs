if ("process" in globalThis) {
  const mod = "node:stream/web";
  globalThis.TransformStream = (await import(mod)).TransformStream;
}

export * from "../dist/index.js";
