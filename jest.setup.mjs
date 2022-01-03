// TODO 何故importが使えないのか

const { TransformStream } = require("node:stream/web");
globalThis.TransformStream = TransformStream;
