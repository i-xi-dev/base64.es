//

import {
  type ByteDecoder,
  SizedMap,
} from "@i-xi-dev/fundamental";
import {
  type Base64Options,
  type _ResolvedOptions,
  _decode,
  _resolveOptions,
} from "./base64";

/**
 * Base64 decoder
 * 
 * @example
 * ```javascript
 * const decoder = new Base64Decoder();
 * decoder.decode("AwIBAP/+/fw=");
 * // → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
 * ```
 * 
 * @example
 * ```javascript
 * const rfc4648urlOptions = Base64.Options.RFC4648URL;
 * const decoder = new Base64Decoder(rfc4648urlOptions);
 * decoder.decode("AwIBAP_-_fw");
 * // → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
 * ```
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
  #options: _ResolvedOptions;

  /**
   * @param options - The `Base64Options` dictionary.
   * @throws {RangeError} The `options.table` contains duplicate characters, or the `options.padding` character is contained in the `options.table`.
   */
  constructor(options?: Base64Options) {
    this.#options = _resolveOptions(options);
    Object.freeze(this);
  }

  /**
   * Decodes a Base64-encoded string into an `Uint8Array`.
   * 
   * @param encoded - The string to decode.
   * @returns An `Uint8Array` containing the decoded bytes.
   * @throws {TypeError} The `encoded` is not Base64-encoded string.
   */
  decode(encoded: string): Uint8Array {
    return _decode(encoded, this.#options);
  }

  /**
   * Returns a `Base64Decoder` object.
   * 
   * @param options - The `Base64Options` dictionary.
   * @returns An instance of `Base64Decoder`.
   * @throws {RangeError} The `options.table` contains duplicate characters, or the `options.padding` character is contained in the `options.table`.
   */
  static get(options?: Base64Options): Base64Decoder {
    const resolvedOptions = _resolveOptions(options);

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
