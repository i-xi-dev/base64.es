if ("process" in globalThis) {
  const mod = "node:stream/web";
  if (!globalThis.TransformStream) {
    globalThis.TransformStream = (await import(mod)).TransformStream;
  }
}

export * from "../dist/index.js";
