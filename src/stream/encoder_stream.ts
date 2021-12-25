//

import {
  type ByteEncoderStreamRegulator,
  ByteEncoderStream,
} from "@i-xi-dev/fundamental";

import {
  type Options,
} from "../base64";

import {
  Base64Encoder,
} from "../encoder";

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
 * 符号化ストリーム
 */
class EncoderStream extends ByteEncoderStream {
  /**
   * @param options オプション
   */
  constructor(options?: Options) {
    const encoder = new Base64Encoder(options);
    const regulator = new Base64EncoderStreamRegulator();
    super(encoder, regulator);
    Object.freeze(this);
  }
}
Object.freeze(EncoderStream);

export {
  EncoderStream as Base64EncoderStream,
};
