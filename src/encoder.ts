//

import {
  type ByteEncoder,
  SizedMap,
} from "@i-xi-dev/fundamental";
import {
  type Base64Options,
  type _ResolvedOptions,
  _encode,
  _resolveOptions,
} from "./base64";

/**
 * Base64 encoder
 */
class Base64Encoder implements ByteEncoder {
  /**
   * インスタンスのキャッシュ
   * static getで使用
   */
  static #pool: SizedMap<string, Base64Encoder> = new SizedMap(1);

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
   * Encodes the specified bytes into a string.
   * 
   * @param toEncode - The bytes to encode.
   * @returns A string containing the Base64-encoded characters.
   */
  encode(toEncode: Uint8Array): string {
    return _encode(toEncode, this.#options);
  }

  /**
   * Returns a `Base64Encoder` object.
   * 
   * @param options - The `Base64Options` dictionary.
   * @returns An instance of `Base64Encoder`.
   * @throws {RangeError} The `options.table` contains duplicate characters, or the `options.padding` character is contained in the `options.table`.
   */
  static get(options?: Base64Options): Base64Encoder {
    const resolvedOptions = _resolveOptions(options);

    const poolKey = JSON.stringify(resolvedOptions);
    let encoder = Base64Encoder.#pool.get(poolKey);
    if (encoder) {
      return encoder;
    }
    encoder = new Base64Encoder(resolvedOptions);
    Base64Encoder.#pool.set(poolKey, encoder);
    return encoder;
  }
}
Object.freeze(Base64Encoder);

export {
  Base64Encoder,
};
