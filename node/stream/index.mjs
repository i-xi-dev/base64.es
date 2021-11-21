import { TransformStream } from "node:stream/web";
globalThis.TransformStream = TransformStream;

export {
  Base64DecoderStream,
  Base64EncoderStream,
} from "../../dist/stream/index.js";
