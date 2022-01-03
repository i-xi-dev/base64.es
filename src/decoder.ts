//

import {
  type ByteDecoder,
  SizedMap,
} from "@i-xi-dev/fundamental";
import {
  type Base64Options,
  type ResolvedOptions,
  decode,
  resolveOptions,
} from "./base64";

/**
 * Base64 decoder
 */
class Base64Decoder implements ByteDecoder {
  /**
   * インスタンスのキャッシュ
   * static getで使用
   */
  static #pool: SizedMap<string, Base64Decoder> = new SizedMap(1);

  /**
   * 未設定項目を埋めたオプション
   */
  #options: ResolvedOptions;

  /**
   * @param options - The `Base64Options` dictionary.
   */
  constructor(options?: Base64Options) {
    this.#options = resolveOptions(options);
    Object.freeze(this);
  }

  /**
   * Decodes a Base64-encoded string into an `Uint8Array`.
   * 
   * @param encoded - The string to decode.
   * @returns An `Uint8Array` containing the decoded bytes.
   */
  decode(encoded: string): Uint8Array {
    return decode(encoded, this.#options);
  }

  /**
   * Returns a `Base64Decoder` object.
   * 
   * @param options - The `Base64Options` dictionary.
   * @returns An instance of `Base64Decoder`.
   */
  static get(options?: Base64Options): Base64Decoder {
    const resolvedOptions = resolveOptions(options);

    const poolKey = JSON.stringify(resolvedOptions);
    let decoder = Base64Decoder.#pool.get(poolKey);
    if (decoder) {
      return decoder;
    }
    decoder = new Base64Decoder(resolvedOptions);
    Base64Decoder.#pool.set(poolKey, decoder);
    return decoder;
  }
}
Object.freeze(Base64Decoder);

export {
  Base64Decoder,
};
