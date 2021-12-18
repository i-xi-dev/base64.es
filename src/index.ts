//

import {
  type ByteDecoder,
  type ByteEncoder,
} from "@i-xi-dev/fundamental";

import {
  type Options,
  type ResolvedOptions,
  type Table,
  decode,
  encode,
  resolveOptions,
} from "./_";

/**
 * 復号器
 */
class Base64Decoder implements ByteDecoder {
  /**
   * 未設定項目を埋めたオプション
   */
  #options: ResolvedOptions;

  /**
   * @param options オプション
   */
  constructor(options?: Options) {
    this.#options = resolveOptions(options);
    Object.freeze(this);
  }

  /**
   * 文字列をバイト列にBase64復号し、結果のバイト列を返却
   * 
   * @param encoded Base64符号化された文字列
   * @returns バイト列
   */
  decode(encoded: string): Uint8Array {
    return decode(encoded, this.#options);
  }
}
Object.freeze(Base64Decoder);

/**
 * 符号化器
 */
class Base64Encoder implements ByteEncoder {
  /**
   * 未設定項目を埋めたオプション
   */
  #options: ResolvedOptions;

  /**
   * @param options オプション
   */
  constructor(options?: Options) {
    this.#options = resolveOptions(options);
    Object.freeze(this);
  }

  /**
   * バイト列を文字列にBase64符号化し、結果の文字列を返却
   * 
   * @param toEncode バイト列
   * @returns Base64符号化された文字列
   */
  encode(toEncode: Uint8Array): string {
    return encode(toEncode, this.#options);
  }
}
Object.freeze(Base64Encoder);

const decoderCache: WeakMap<ResolvedOptions, Base64Decoder> = new WeakMap();

const encoderCache: WeakMap<ResolvedOptions, Base64Encoder> = new WeakMap();

const Base64 = Object.freeze({
  resolveOptions(options?: Options | ResolvedOptions): ResolvedOptions {
    return resolveOptions(options);
  },
  
  getDecoder(options?: Options | ResolvedOptions): Base64Decoder {
    const resolvedOptions = resolveOptions(options);
    if (decoderCache.has(resolvedOptions) !== true) {
      decoderCache.set(resolvedOptions, new Base64Decoder(resolvedOptions));
    }
    return decoderCache.get(resolvedOptions) as Base64Decoder;    
  },

  getEncoder(options?: Options | ResolvedOptions): Base64Encoder {
    const resolvedOptions = resolveOptions(options);
    if (encoderCache.has(resolvedOptions) !== true) {
      encoderCache.set(resolvedOptions, new Base64Encoder(resolvedOptions));
    }
    return encoderCache.get(resolvedOptions) as Base64Encoder;
  },

  decode(encoded: string, options: Options | ResolvedOptions): Uint8Array {
    const resolvedOptions = resolveOptions(options);
    return decode(encoded, resolvedOptions);
  },

  encode(toEncode: Uint8Array, options: Options | ResolvedOptions): string {
    const resolvedOptions = resolveOptions(options);
    return encode(toEncode, resolvedOptions);
  },
});

export {
  type Options as Base64Options,
  type Table as Base64Table,
  Base64Decoder,
  Base64Encoder,
  Base64,
};
