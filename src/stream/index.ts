//

// import {
//   ByteDecoderStreamRegulator,
//   ByteEncoderStreamRegulator,
//   ByteDecoderStream,
//   ByteEncoderStream,
// } from "@i-xi-dev/fundamental"; TODO TransformStreamをどうするか
import { 
  ByteDecoderStreamRegulator,
  ByteEncoderStreamRegulator,
  ByteDecoderStream,
  ByteEncoderStream,
} from "../lib/@i-xi-dev/fundamental/index";

import {
  // type Options,
  Options,
} from "../_";

import {
  Base64Decoder,
  Base64Encoder,
} from "../index";

class Base64DecoderStreamRegulator implements ByteDecoderStreamRegulator {
  #pending: string;

  constructor() {
    this.#pending = "";
  }

  regulate(chunk: string): string {
    const temp = this.#pending + chunk;
    const surplus = temp.length % 24;

    if (temp.length < 24) {
      this.#pending = temp;
      return "";
    }
    else if (surplus === 0) {
      this.#pending = "";
      return temp;
    }
    else {
      const pendingLength = temp.length - surplus;
      this.#pending = temp.substring(pendingLength);
      return temp.substring(0, pendingLength);
    }
  }

  flush(): string {
    const remains = this.#pending;
    this.#pending = "";
    return remains;
  }
}

/**
 * 復号ストリーム
 */
class DecoderStream extends ByteDecoderStream {
  /**
   * @param options オプション
   */
  constructor(options?: Options) {
    const decoder = new Base64Decoder(options);
    const regulator = new Base64DecoderStreamRegulator();
    super(decoder, regulator);
    Object.freeze(this);
  }
}
Object.freeze(DecoderStream);

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
  DecoderStream as Base64DecoderStream,
  EncoderStream as Base64EncoderStream,
};
