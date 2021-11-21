//

import {
  // type Base64Options,
  Base64Options,
  // type Base64ResolvedOptions,
  Base64ResolvedOptions,
  base64Decode,
  base64Encode,
  resolveBase64Options,
} from "../_.js";

type Base64DecoderStreamPending = {
  chars: string,
};

/**
 * 復号ストリーム
 */
class Base64DecoderStream implements TransformStream {
  /**
   * 未設定項目を埋めたオプション
   */
  readonly #options: Base64ResolvedOptions;

  readonly #pending: Base64DecoderStreamPending;

  readonly #stream: TransformStream<string, Uint8Array>;

  /**
   * @param options オプション
   */
  constructor(options?: Base64Options) {
    const self = (): Base64DecoderStream => this;
    const transformer: Transformer<string, Uint8Array> = {
      transform(chunk: string, controller: TransformStreamDefaultController<Uint8Array>): void {
        const decoded = self().#decodeChunk(chunk);
        controller.enqueue(decoded);
      },
      flush(controller: TransformStreamDefaultController<Uint8Array>): void {
        if (self().#pending.chars.length > 0) {
          const decoded = base64Decode(self().#pending.chars, self().#options);
          controller.enqueue(decoded);
        }
      },
    };

    this.#options = resolveBase64Options(options);
    this.#pending = Object.seal({
      chars: "",
    });
    this.#stream = new TransformStream<string, Uint8Array>(transformer);

    Object.freeze(this);
  }

  get writable(): WritableStream<string> {
    return this.#stream.writable;
  }

  get readable(): ReadableStream<Uint8Array> {
    return this.#stream.readable;
  }

  #decodeChunk(chunk: string): Uint8Array {
    const temp = this.#pending.chars + chunk;
    const surplus = temp.length % 24;

    let toDecode: string;
    if (temp.length < 24) {
      this.#pending.chars = temp;
      toDecode = "";
    }
    else if (surplus === 0) {
      this.#pending.chars = "";
      toDecode = temp;
    }
    else {
      const pendingLength = temp.length - surplus;
      this.#pending.chars = temp.substring(pendingLength);
      toDecode = temp.substring(0, pendingLength);
    }

    return base64Decode(toDecode, this.#options);
  }
}
Object.freeze(Base64DecoderStream);

type Base64EncoderStreamPending = {
  bytes: Uint8Array,
};

/**
 * 符号化ストリーム
 */
class Base64EncoderStream implements TransformStream {
  /**
   * 未設定項目を埋めたオプション
   */
  readonly #options: Base64ResolvedOptions;

  readonly #pending: Base64EncoderStreamPending;

  readonly #stream: TransformStream<Uint8Array, string>;

  /**
   * @param options オプション
   */
  constructor(options?: Base64Options) {
    const self = (): Base64EncoderStream => this;
    const transformer: Transformer<Uint8Array, string> = {
      transform(chunk: Uint8Array, controller: TransformStreamDefaultController<string>): void {
        const encoded = self().#encodeChunk(chunk);
        controller.enqueue(encoded);
      },
      flush(controller: TransformStreamDefaultController<string>): void {
        if (self().#pending.bytes.length > 0) {
          const encoded = base64Encode(Uint8Array.from(self().#pending.bytes), self().#options);
          controller.enqueue(encoded);
        }
      },
    };

    this.#options = resolveBase64Options(options);
    this.#pending = Object.seal({
      bytes: new Uint8Array(0),
    });
    this.#stream = new TransformStream<Uint8Array, string>(transformer);

    Object.freeze(this);
  }

  get writable(): WritableStream<Uint8Array> {
    return this.#stream.writable;
  }

  get readable(): ReadableStream<string> {
    return this.#stream.readable;
  }

  #encodeChunk(chunk: Uint8Array): string {
    const temp = new Uint8Array(this.#pending.bytes.length + chunk.length);
    temp.set(this.#pending.bytes);
    temp.set(chunk, this.#pending.bytes.length);
    const surplus = temp.length % 24;

    let toEncode: Uint8Array;
    if (temp.length < 24) {
      this.#pending.bytes = temp;
      toEncode = new Uint8Array(0);
    }
    else if (surplus === 0) {
      this.#pending.bytes = new Uint8Array(0);
      toEncode = temp;
    }
    else {
      const pendingLength = temp.length - surplus;
      this.#pending.bytes = temp.subarray(pendingLength);
      toEncode = temp.subarray(0, pendingLength);
    }

    return base64Encode(toEncode, this.#options);
  }
}
Object.freeze(Base64EncoderStream);

export {
  Base64DecoderStream,
  Base64EncoderStream,
};
