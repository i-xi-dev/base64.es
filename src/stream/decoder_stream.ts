//

import {
  type ByteDecoderStreamRegulator,
  ByteDecoderStream,
} from "@i-xi-dev/fundamental";

import {
  type Base64Options,
  Base64Decoder,
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
  constructor(options?: Base64Options) {
    const decoder = new Base64Decoder(options);
    const regulator = new Base64DecoderStreamRegulator();
    super(decoder, regulator);
    Object.freeze(this);
  }
}
Object.freeze(DecoderStream);

export {
  DecoderStream as Base64DecoderStream,
};
