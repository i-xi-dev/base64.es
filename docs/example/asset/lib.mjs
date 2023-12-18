const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

/**
 * @param {Uint8Array} input
 * @returns {string}
 */
export function decodeUtf8(input) {
  return utf8Decoder.decode(input);
}

/**
 * @param {string} input
 * @returns {Uint8Array}
 */
export function encodeUtf8(input) {
  return utf8Encoder.encode(input);
}

/**
 * @param {Uint8Array} bytes
 * @returns {string}
 */
export function bytesToString(bytes) {
  return [...bytes].map((byte) =>
    byte.toString(16).toUpperCase().padStart(2, "0")
  ).join(" ");
}
