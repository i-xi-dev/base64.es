// globalThisがNodeのと違うのでimportしないと使えないもの
// TODO 何故importが使えないのか

const { webcrypto } = require("node:crypto");
globalThis.crypto = webcrypto;

const { ReadableStream, WritableStream, TransformStream } = require("node:stream/web");
globalThis.ReadableStream = ReadableStream;
globalThis.WritableStream = WritableStream;
globalThis.TransformStream = TransformStream;
