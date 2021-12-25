// globalThisがNodeのと違うのでimportしないと使えないもの
// TODO 何故importが使えないのか

const { webcrypto } = require("node:crypto");
globalThis.crypto = webcrypto;
