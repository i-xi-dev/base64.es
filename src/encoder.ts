//

import {
  type ByteEncoder,
} from "@i-xi-dev/fundamental";

import {
  type Options,
  type ResolvedOptions,
  encode,
  resolveOptions,
} from "./base64";

/**
 * 符号化器
 */
class Base64Encoder implements ByteEncoder {
  static #encoderCache: WeakMap<ResolvedOptions, Base64Encoder> = new WeakMap();

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

  static getEncoder(options?: Options): Base64Encoder {
    const resolvedOptions = resolveOptions(options);
    if (Base64Encoder.#encoderCache.has(resolvedOptions) !== true) {
      Base64Encoder.#encoderCache.set(resolvedOptions, new Base64Encoder(resolvedOptions));
    }
    return Base64Encoder.#encoderCache.get(resolvedOptions) as Base64Encoder;
  }
}
Object.freeze(Base64Encoder);

export {
  Base64Encoder,
};
