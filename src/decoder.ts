//

import {
  type ByteDecoder,
} from "@i-xi-dev/fundamental";

import {
  type Options,
  type ResolvedOptions,
  decode,
  resolveOptions,
} from "./base64";

/**
 * 復号器
 */
class Base64Decoder implements ByteDecoder {
  static #decoderCache: WeakMap<ResolvedOptions, Base64Decoder> = new WeakMap();

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

  static get(options?: Options): ByteDecoder {
    const resolvedOptions = resolveOptions(options);
    if (Base64Decoder.#decoderCache.has(resolvedOptions) !== true) {
      Base64Decoder.#decoderCache.set(resolvedOptions, new Base64Decoder(resolvedOptions));
    }
    return Base64Decoder.#decoderCache.get(resolvedOptions) as Base64Decoder;
  }
}
Object.freeze(Base64Decoder);

export {
  Base64Decoder,
};
