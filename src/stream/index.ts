//

import {
  // type Base64Options,
  Base64Options,
  // type Base64ResolvedOptions,
  Base64ResolvedOptions,
  resolveBase64Options,
} from "./../_.js";

/**
 * 復号ストリーム
 */
class Base64DecoderStream {
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


}
Object.freeze(Base64DecoderStream);

/**
 * 符号化ストリーム
 */
class Base64EncoderStream {
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


}
Object.freeze(Base64EncoderStream);

export {
  Base64DecoderStream,
  Base64EncoderStream,
};
