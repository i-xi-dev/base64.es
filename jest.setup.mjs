// TODO 何故importが使えないのか
// TODO 何故importが使えないのか

// globalThisがNodeのと違うのでimportしないと使えないもの

const { TransformStream } = require("node:stream/web");
globalThis.TransformStream = TransformStream;
