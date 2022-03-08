//

import {
  type ByteEncoderStreamRegulator,
  ByteEncoderStream,
} from "@i-xi-dev/fundamental";
import { type Base64Options } from "../base64";
import { Base64Encoder } from "../encoder";

class Base64EncoderStreamRegulator implements ByteEncoderStreamRegulator {
  #pending: Uint8Array;

  constructor() {
    this.#pending = new Uint8Array(0);
  }

  regulate(chunk: Uint8Array): Uint8Array {
    const temp = new Uint8Array(this.#pending.length + chunk.length);
    temp.set(this.#pending);
    temp.set(chunk, this.#pending.length);
    const surplus = temp.length % 24;

    if (temp.length < 24) {
      this.#pending = temp;
      return new Uint8Array(0);
    }
    else if (surplus === 0) {
      this.#pending = new Uint8Array(0);
      return temp;
    }
    else {
      const pendingLength = temp.length - surplus;
      this.#pending = temp.subarray(pendingLength);
      return temp.subarray(0, pendingLength);
    }
  }

  flush(): Uint8Array {
    const remains = this.#pending;
    this.#pending = new Uint8Array(0);
    return remains;
  }
}

/**
 * The `TransformStream` that encodes a stream of `Uint8Array` into Base64-encoded string stream.
 * 
 * @example
 * ```javascript
 * const encoderStream = new Base64EncoderStream();
 * // readableStream: ReadableStream<Uint8Array>
 * // writableStream: WritableStream<string>
 * readableStream.pipeThrough(encoderStream).pipeTo(writableStream);
 * ```
 */
class Base64EncoderStream extends ByteEncoderStream {
  /**
   * @param options - The `Base64Options` dictionary.
   */
  constructor(options?: Base64Options) {
    const encoder = new Base64Encoder(options);
    const regulator = new Base64EncoderStreamRegulator();
    super(encoder, regulator);
    Object.freeze(this);
  }
}
Object.freeze(Base64EncoderStream);

export {
  Base64EncoderStream,
};
