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
  static #cache: WeakMap<ResolvedOptions, Base64Decoder> = new WeakMap();

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

  static getInstance(options?: Options): Base64Decoder {
    const resolvedOptions = resolveOptions(options);
    if (Base64Decoder.#cache.has(resolvedOptions) !== true) {
      Base64Decoder.#cache.set(resolvedOptions, new Base64Decoder(resolvedOptions));
    }
    return Base64Decoder.#cache.get(resolvedOptions) as Base64Decoder;
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
  static #cache: WeakMap<ResolvedOptions, Base64Encoder> = new WeakMap();

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

  static getInstance(options?: Options): Base64Encoder {
    const resolvedOptions = resolveOptions(options);
    if (Base64Encoder.#cache.has(resolvedOptions) !== true) {
      Base64Encoder.#cache.set(resolvedOptions, new Base64Encoder(resolvedOptions));
    }
    return Base64Encoder.#cache.get(resolvedOptions) as Base64Encoder;
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

export {
  type Options as Base64Options,
  type Table as Base64Table,
  Base64Decoder,
  Base64Encoder,
};
