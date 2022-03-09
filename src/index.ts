//

import {
  Base64Options,
  _decode,
  _encode,
  _resolveOptions,
} from "./base64";
import { Base64Decoder } from "./decoder";
import { Base64Encoder } from "./encoder";

/**
 * Provides Base64 decoding and Base64 encoding methods.
 */
namespace Base64 {
  /**
   * Decodes a Base64-encoded string into an `Uint8Array`.
   * 
   * @example
   * ```javascript
   * Base64.decode("AwIBAP/+/fw=");
   * // → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
   * ```
   * 
   * @example
   * ```javascript
   * const rfc4648urlOptions = Base64.Options["rfc4648url"];
   * Base64.decode("AwIBAP_-_fw", rfc4648urlOptions);
   * // → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
   * ```
   * 
   * @param encoded - The string to decode.
   * @param options - The `Base64Options` dictionary.
   * @returns An `Uint8Array` containing the decoded bytes.
   * @throws {RangeError} The `options.table` contains duplicate characters, or the `options.paddingChar` character is contained in the `options.table`.
   * @throws {TypeError} The `encoded` is not Base64-encoded string.
   */
  export function decode(encoded: string, options?: Base64Options): Uint8Array {
    const resolvedOptions = _resolveOptions(options);
    return _decode(encoded, resolvedOptions);
  }

  /**
   * Encodes the specified bytes into a string.
   * 
   * @example
   * ```javascript
   * Base64.encode(Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC));
   * // → "AwIBAP/+/fw="
   * ```
   * 
   * @example
   * ```javascript
   * const rfc4648urlOptions = Base64.Options["rfc4648url"];
   * Base64.encode(Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC), rfc4648urlOptions);
   * // → "AwIBAP_-_fw"
   * ```
   * 
   * @param toEncode - The bytes to encode.
   * @param options - The `Base64Options` dictionary.
   * @returns A string containing the Base64-encoded characters.
   * @throws {RangeError} The `options.table` contains duplicate characters, or the `options.paddingChar` character is contained in the `options.table`.
   */
  export function encode(toEncode: Uint8Array, options?: Base64Options): string {
    const resolvedOptions = _resolveOptions(options);
    return _encode(toEncode, resolvedOptions);
  }

  export type Options = Base64Options;

  /**
   * The alias for the {@link Base64Options}.
   */
  export const Options = Base64Options;

  // /TODO
  // XXX Decoder: Base64Decoder
  // XXX Encoder: Base64Encoder
}
Object.freeze(Base64);

export {
  Base64Options,
  Base64Decoder,
  Base64Encoder,
  Base64,
};
