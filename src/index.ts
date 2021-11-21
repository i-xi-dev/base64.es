//

import {
  // type Base64Options,
  Base64Options,
  // type Base64ResolvedOptions,
  Base64ResolvedOptions,
  // type Base64Table,
  Base64Table,
  base64Decode,
  base64Encode,
  resolveBase64Options,
} from "./_.js";

/**
 * 復号器
 */
class Base64Decoder {
  /**
   * 未設定項目を埋めたオプション
   */
  #options: Base64ResolvedOptions;

  /**
   * @param options オプション
   */
  constructor(options?: Base64Options) {
    this.#options = resolveBase64Options(options);
    Object.freeze(this);
  }

  /**
   * 文字列をバイト列にBase64復号し、結果のバイト列を返却
   * 
   * @param encoded Base64符号化された文字列
   * @returns バイト列
   */
  decode(encoded: string): Uint8Array {
    return base64Decode(encoded, this.#options);
  }
}
Object.freeze(Base64Decoder);

/**
 * 符号化器
 */
class Base64Encoder {
  /**
   * 未設定項目を埋めたオプション
   */
  #options: Base64ResolvedOptions;

  /**
   * @param options オプション
   */
  constructor(options?: Base64Options) {
    this.#options = resolveBase64Options(options);
    Object.freeze(this);
  }

  /**
   * バイト列を文字列にBase64符号化し、結果の文字列を返却
   * 
   * @param toEncode バイト列
   * @returns Base64符号化された文字列
   */
  encode(toEncode: Uint8Array): string {
    return base64Encode(toEncode, this.#options);
  }
}
Object.freeze(Base64Encoder);

export type {
  Base64Options,
  Base64Table,
};

export {
  Base64Decoder,
  Base64Encoder,
};
