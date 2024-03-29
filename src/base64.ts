import { BytesEncoding, Uint6, Uint8 } from "../deps.ts";

const _forgiving = true;

const _BASE64_CHARS = [
  "!",
  "+",
  "-",
  ".",
  "/",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ":",
  "=",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "_",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
] as const;

/**
 * 有効な文字
 */
type _base64char = typeof _BASE64_CHARS[number];

function _isBase64Char(value: unknown): value is _base64char {
  if ((typeof value === "string") && (value.length === 1)) {
    return (_BASE64_CHARS as Readonly<Array<string>>).includes(value);
  }
  return false;
}

/**
 * 62文字目（インデックス0～61）までの変換テーブル
 */
const _TABLE_62: Readonly<Array<_base64char>> = Object.freeze([
  "A", // 0
  "B", // 1
  "C", // 2
  "D", // 3
  "E", // 4
  "F", // 5
  "G", // 6
  "H", // 7
  "I", // 8
  "J", // 9
  "K", // 10
  "L", // 11
  "M", // 12
  "N", // 13
  "O", // 14
  "P", // 15
  "Q", // 16
  "R", // 17
  "S", // 18
  "T", // 19
  "U", // 20
  "V", // 21
  "W", // 22
  "X", // 23
  "Y", // 24
  "Z", // 25
  "a", // 26
  "b", // 27
  "c", // 28
  "d", // 29
  "e", // 30
  "f", // 31
  "g", // 32
  "h", // 33
  "i", // 34
  "j", // 35
  "k", // 36
  "l", // 37
  "m", // 38
  "n", // 39
  "o", // 40
  "p", // 41
  "q", // 42
  "r", // 43
  "s", // 44
  "t", // 45
  "u", // 46
  "v", // 47
  "w", // 48
  "x", // 49
  "y", // 50
  "z", // 51
  "0", // 52
  "1", // 53
  "2", // 54
  "3", // 55
  "4", // 56
  "5", // 57
  "6", // 58
  "7", // 59
  "8", // 60
  "9", // 61
]);

/**
 * 変換テーブル
 */
type _Base64Table = [
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
  _base64char,
];

function _isBase64Table(value: unknown): value is _Base64Table {
  return (Array.isArray(value) && (value.length === 64) &&
    value.every((i) => _isBase64Char(i)));
}

/**
 * 未設定項目の存在しないオプション
 */
type _ResolvedOptions = {
  /**  */
  rawTable: Readonly<_Base64Table>;

  /**  */
  noPadding: boolean;

  /**  */
  paddingChar: _base64char;
};

const _RFC4648_OPTIONS: _ResolvedOptions = Object.freeze({
  rawTable: Object.freeze([..._TABLE_62, "+", "/"]) as Readonly<_Base64Table>,
  noPadding: false,
  paddingChar: "=",
});

const _RFC4648URL_OPTIONS: _ResolvedOptions = Object.freeze({
  rawTable: Object.freeze([..._TABLE_62, "-", "_"]) as Readonly<_Base64Table>,
  noPadding: true,
  paddingChar: "=",
});

/**
 * 文字列をバイト列にBase64復号し、結果のバイト列を返却
 *
 * {@link [Infra Standard](https://infra.spec.whatwg.org/#forgiving-base64-decode)}および、
 * {@link [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648)}の仕様に従った。
 * 改行には非対応（必要であれば改行を除去してからdecodeすべし）。
 *
 * @param encoded Base64符号化された文字列
 * @param options オプション
 * @returns バイト列
 * @throws {TypeError} The `encoded` is not Base64-encoded string.
 */
function _decode(encoded: string, options: _ResolvedOptions): Uint8Array {
  let work: string = encoded;
  if (_forgiving === true) {
    // deno-lint-ignore no-control-regex
    work = work.replaceAll(/[\u{9}\u{A}\u{C}\u{D}\u{20}]/gu, "");
  }

  if (_forgiving === true) {
    // work.lengthの箇所は、仕様では符号位置数だがlengthを使用する
    // length !== 符号位置数の場合の処理結果が正しくなくなるが、そうなったとしてもisEncodedでエラーとなる為問題は無いはず

    if ((work.length % 4) === 0) {
      for (let i = 0; i < 2; i++) {
        if (work.endsWith(options.paddingChar)) {
          work = work.substring(0, work.length - 1);
        } else {
          break;
        }
      }
    }

    if ((work.length % 4) === 1) {
      throw new TypeError("forgiving decode error");
    }
  }

  if (_isEncoded(work, options) !== true) {
    throw new TypeError("decode error (1)");
  }

  const paddingStart = work.indexOf(options.paddingChar);
  let paddingCount: number;
  let encodedBody: string;
  if ((options.noPadding !== true) && (_forgiving !== true)) {
    if ((work.length % 4) !== 0) {
      throw new TypeError("decode error (2)");
    }

    if (paddingStart >= 0) {
      paddingCount = work.length - paddingStart;
      encodedBody = work.substring(0, paddingStart);
    } else {
      paddingCount = 0;
      encodedBody = work;
    }
  } else {
    // if (paddingStart >= 0) {
    //  throw new TypeError("decode error (3)"); (1)で例外になる
    // }
    paddingCount = (work.length % 4 === 0) ? 0 : 4 - (work.length % 4);
    encodedBody = work;
  }

  let _6bit1: Uint6;
  let _6bit2: Uint6;
  let _6bit3: Uint6;
  let _6bit4: Uint6;
  let _8bitI = 0;
  const encodedByteCount = ((encodedBody.length + paddingCount) * 3 / 4) -
    paddingCount;
  const decodedBytes = new Uint8Array(encodedByteCount);

  let i = 0;
  if (encodedBody.length >= 4) {
    for (i = 0; i < encodedBody.length; i = i + 4) {
      // 8-bit (1)
      _6bit1 = options.rawTable.indexOf(encodedBody[i] as _base64char) as Uint6;
      _6bit2 = options.rawTable.indexOf(
        encodedBody[i + 1] as _base64char,
      ) as Uint6;
      decodedBytes[_8bitI++] = (_6bit1 << 2) | (_6bit2 >> 4);

      // 8-bit (2)
      if (typeof encodedBody[i + 2] !== "string") {
        decodedBytes[_8bitI++] = (_6bit2 & 0b001111) << 4;
        break;
      }
      _6bit3 = options.rawTable.indexOf(
        encodedBody[i + 2] as _base64char,
      ) as Uint6;
      decodedBytes[_8bitI++] = ((_6bit2 & 0b001111) << 4) | (_6bit3 >> 2);

      // 8-bit (3)
      if (typeof encodedBody[i + 3] !== "string") {
        decodedBytes[_8bitI++] = (_6bit3 & 0b000011) << 6;
        break;
      }
      _6bit4 = options.rawTable.indexOf(
        encodedBody[i + 3] as _base64char,
      ) as Uint6;
      decodedBytes[_8bitI++] = ((_6bit3 & 0b000011) << 6) | _6bit4;
    }
  }
  return decodedBytes;
}

function _isEncoded(work: string, options: _ResolvedOptions): boolean {
  const tablePattern = "[" +
    options.rawTable.map((chr) => `\\u{${chr.charCodeAt(0).toString(16)}}`)
      .join(
        "",
      ) +
    "]";

  let regex: RegExp;
  if ((options.noPadding !== true) && (_forgiving !== true)) {
    const paddingPattern = `\\u{${
      options.paddingChar.charCodeAt(0).toString(16)
    }}`;
    regex = new RegExp(
      `^(${tablePattern}+${paddingPattern}*|${tablePattern}*)$`,
      "u",
    );
  } else {
    regex = new RegExp(`^${tablePattern}*$`, "u");
  }

  return regex.test(work);
}

/**
 * バイト列を文字列にBase64符号化し、結果の文字列を返却
 *
 * {@link [Infra Standard](https://infra.spec.whatwg.org/#forgiving-base64-encode)}および、
 * {@link [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648)}の仕様に従った。
 * 改行には非対応（必要であればencode結果を改行すべし）。
 *
 * @param toEncode バイト列
 * @param options Base64符号化方式オプション
 * @returns Base64符号化された文字列
 */
function _encode(toEncode: Uint8Array, options: _ResolvedOptions): string {
  let _6bit1e: string;
  let _6bit2e: string;
  let _6bit3e: string;
  let _6bit4e: string;
  let encodedChars = "";
  for (let i = 0; i < toEncode.byteLength; i = i + 3) {
    const [_n8bit1, _n8bit2, _n8bit3] = toEncode.subarray(i, i + 3);
    const _8bit1: Uint8 = _n8bit1 as Uint8;
    const _8bit2: Uint8 = (_n8bit2 !== undefined) ? (_n8bit2 as Uint8) : 0;

    // 6-bit (1)
    _6bit1e = options.rawTable[_8bit1 >> 2] as string;

    // 6-bit (2)
    _6bit2e = options
      .rawTable[((_8bit1 & 0b00000011) << 4) | (_8bit2 >> 4)] as string;

    if (_n8bit2 !== undefined) {
      const _8bit3: Uint8 = (_n8bit3 !== undefined) ? (_n8bit3 as Uint8) : 0;

      // 6-bit (3)
      _6bit3e = options
        .rawTable[((_8bit2 & 0b00001111) << 2) | (_8bit3 >> 6)] as string;

      if (_n8bit3 !== undefined) {
        // 6-bit (4)
        _6bit4e = options.rawTable[_8bit3 & 0b00111111] as string;
      } else {
        _6bit4e = (options.noPadding !== true) ? options.paddingChar : "";
      }
    } else {
      _6bit3e = (options.noPadding !== true) ? options.paddingChar : "";
      _6bit4e = (options.noPadding !== true) ? options.paddingChar : "";
    }
    encodedChars = encodedChars.concat(_6bit1e + _6bit2e + _6bit3e + _6bit4e);
  }
  return encodedChars;
}

/**
 * オプションをResolvedOptions型に変換する
 * 未設定項目はデフォルト値で埋める
 *
 * @param options オプション
 * @returns 未設定項目を埋めたオプションの複製
 * @throws {RangeError} The `options.rawTable` contains duplicate characters, or the `options.paddingChar` character is contained in the `options.rawTable`.
 */
function _resolveOptions(
  options: Base64.Options | _ResolvedOptions = {},
): _ResolvedOptions {
  const defaultOptions = _RFC4648_OPTIONS;

  let rawTable: Readonly<_Base64Table>;

  if (
    ("tableLastChars" in options) && Array.isArray(options.tableLastChars) &&
    (options.tableLastChars.length === 2) &&
    options.tableLastChars.every((c) => _isBase64Char(c))
  ) {
    rawTable = Object.freeze([
      ...defaultOptions.rawTable.slice(0, 62),
      options.tableLastChars[0],
      options.tableLastChars[1],
    ]) as Readonly<_Base64Table>;
  } else if (("rawTable" in options) && _isBase64Table(options.rawTable)) {
    rawTable = Object.freeze([...options.rawTable]) as Readonly<_Base64Table>;
  } else if (("table" in options) && _isBase64Table(options.table)) {
    rawTable = Object.freeze([...options.table]) as Readonly<_Base64Table>;
  } else {
    rawTable = defaultOptions.rawTable;
  }

  let noPadding: boolean = defaultOptions.noPadding;
  if (typeof options.noPadding === "boolean") {
    noPadding = options.noPadding;
  }

  let paddingChar: _base64char = defaultOptions.paddingChar;
  if (_isBase64Char(options.paddingChar)) {
    paddingChar = options.paddingChar;
  }

  // tableとpaddingの重複チェック
  if ((new Set([...rawTable, paddingChar])).size !== 65) {
    throw new RangeError("options error: character duplicated");
  }

  return Object.freeze({
    rawTable,
    noPadding,
    paddingChar,
  });
}

class _DecoderStreamRegulator implements BytesEncoding.DecoderStreamRegulator {
  #pending: string;

  constructor() {
    this.#pending = "";
  }

  regulate(chunk: string): string {
    const temp = this.#pending + chunk;
    const surplus = temp.length % 24;

    if (temp.length < 24) {
      this.#pending = temp;
      return "";
    } else if (surplus === 0) {
      this.#pending = "";
      return temp;
    } else {
      const pendingLength = temp.length - surplus;
      this.#pending = temp.substring(pendingLength);
      return temp.substring(0, pendingLength);
    }
  }

  flush(): string {
    const remains = this.#pending;
    this.#pending = "";
    return remains;
  }
}
Object.freeze(_DecoderStreamRegulator);

class _EncoderStreamRegulator implements BytesEncoding.EncoderStreamRegulator {
  #pending: Uint8Array;

  constructor() {
    this.#pending = new Uint8Array(0);
  }

  regulate(chunk: Uint8Array): Uint8Array {
    const temp = new Uint8Array(this.#pending.length + chunk.length);
    temp.set(this.#pending);
    temp.set(chunk, this.#pending.length);
    const surplus = temp.length % 24;

    if (temp.length < 24) {
      this.#pending = temp;
      return new Uint8Array(0);
    } else if (surplus === 0) {
      this.#pending = new Uint8Array(0);
      return temp;
    } else {
      const pendingLength = temp.length - surplus;
      this.#pending = temp.subarray(pendingLength);
      return temp.subarray(0, pendingLength);
    }
  }

  flush(): Uint8Array {
    const remains = this.#pending;
    this.#pending = new Uint8Array(0);
    return remains;
  }
}
Object.freeze(_EncoderStreamRegulator);

/**
 * Provides Base64 decoding and Base64 encoding methods.
 */
namespace Base64 {
  /**
   * Decodes a Base64-encoded string into an `Uint8Array`.
   *
   * @param encoded The string to decode.
   * @param options The `Base64.Options` dictionary.
   * @returns An `Uint8Array` containing the decoded byte sequence.
   * @throws {RangeError} The `options.rawTable` contains duplicate characters, or the `options.paddingChar` character is contained in the `options.rawTable`.
   * @throws {TypeError} The `encoded` is not Base64-encoded string.
   * @example
   * ```javascript
   * Base64.decode("AwIBAP/+/fw=");
   * // → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
   * ```
   * @example
   * ```javascript
   * const rfc4648urlOptions = Base64.Options.RFC4648URL;
   * Base64.decode("AwIBAP_-_fw", rfc4648urlOptions);
   * // → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
   * ```
   */
  export function decode(encoded: string, options?: Options): Uint8Array {
    const resolvedOptions = _resolveOptions(options);
    return _decode(encoded, resolvedOptions);
  }

  /**
   * Encodes the specified byte sequence into a string.
   *
   * @param toEncode The byte sequence to encode.
   * @param options The `Base64.Options` dictionary.
   * @returns A string containing the Base64-encoded characters.
   * @throws {RangeError} The `options.rawTable` contains duplicate characters, or the `options.paddingChar` character is contained in the `options.rawTable`.
   * @example
   * ```javascript
   * Base64.encode(Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC));
   * // → "AwIBAP/+/fw="
   * ```
   * @example
   * ```javascript
   * const rfc4648urlOptions = Base64.Options.RFC4648URL;
   * Base64.encode(Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC), rfc4648urlOptions);
   * // → "AwIBAP_-_fw"
   * ```
   */
  export function encode(toEncode: Uint8Array, options?: Options): string {
    const resolvedOptions = _resolveOptions(options);
    return _encode(toEncode, resolvedOptions);
  }

  /**
   * The object with the following optional fields.
   * The defaults are the values that conforms to the RFC 4648 Base64 specification.
   *
   * ***
   *
   * **`rawTable`**:
   *
   * The 64 characters index table.
   * The default is `[ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/" ]`.
   *
   * The following restrictions apply:
   * - The `length` of the `rawTable` must be 64.
   * - The `length` of all elements contained in the `rawTable` must be 1.
   * - The `rawTable` must not contain duplicate characters.
   *
   * ***
   *
   * **`table`**:
   *
   * [deprecated] Alias for the `rawTable`.
   *
   * ***
   *
   * **`tableLastChars`**:
   *
   * The last two characters of the 64 characters index table.
   * The default is `[ "+", "/" ]`.
   *
   * `tableLastChars` and `rawTable` are mutually exclusive, with `tableLastChars` taking precedence over `rawTable`.
   * If `tableLastChars` is specified, the first to 62nd characters of the 64 characters index table are `[ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]`.
   *
   * ***
   *
   * **`noPadding`**:
   *
   * Whether to omit the padding.
   * The default is `false`.
   * However, the decoder ignores this value.
   *
   * ***
   *
   * **`paddingChar`**:
   *
   * The padding character.
   * The default is `"="`.
   *
   * The following restrictions apply:
   * - The `length` of the `paddingChar` must be 1.
   * - The `paddingChar` must not be a character contained in the `rawTable`.
   */
  export type Options = {
    /**
     * The 64 characters index table.
     * The default is `[ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/" ]`.
     *
     * The following restrictions apply:
     * - The `length` of the `rawTable` must be 64.
     * - The `length` of all elements contained in the `rawTable` must be 1.
     * - The `rawTable` must not contain duplicate characters.
     */
    rawTable?: Readonly<Array<string>>;

    /**
     * @deprecated
     *
     * Alias for the `rawTable`.
     */
    table?: Readonly<Array<string>>;

    /**
     * The last two characters of the 64 characters index table.
     * The default is `[ "+", "/" ]`.
     *
     * `tableLastChars` and `rawTable` are mutually exclusive, with `tableLastChars` taking precedence over `rawTable`.
     * If `tableLastChars` is specified, the first to 62nd characters of the 64 characters index table are `[ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ]`.
     */
    tableLastChars?: Readonly<[string, string]>;

    /**
     * Whether to omit the padding.
     * The default is `false`.
     * However, the decoder ignores this value.
     */
    noPadding?: boolean;

    /**
     * The padding character.
     * The default is `"="`.
     *
     * The following restrictions apply:
     * - The `length` of the `paddingChar` must be 1.
     * - The `paddingChar` must not be a character contained in the `rawTable`.
     */
    paddingChar?: string;
  };

  export namespace Options {
    /**
     * The options for [RFC 4648 Base64](https://datatracker.ietf.org/doc/html/rfc4648#section-4).
     *
     * | field | value |
     * | :--- | :--- |
     * | `rawTable` | `[ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/" ]` |
     * | `noPadding` | `false` |
     * | `paddingChar` | `"="` |
     */
    export const RFC4648: Options = _RFC4648_OPTIONS;

    /**
     * The options for [RFC 4648 Base64url](https://datatracker.ietf.org/doc/html/rfc4648#section-5).
     *
     * | field | value |
     * | :--- | :--- |
     * | `rawTable` | `[ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_" ]` |
     * | `noPadding` | `true` |
     * | `paddingChar` | `"="` |
     */
    export const RFC4648URL: Options = _RFC4648URL_OPTIONS;
  }
  Object.freeze(Options);

  /**
   * Base64 decoder
   *
   * @example
   * ```javascript
   * const decoder = new Base64.Decoder();
   *
   * decoder.decode("AwIBAP/+/fw=");
   * // → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
   * ```
   * @example
   * ```javascript
   * const rfc4648urlOptions = Base64.Options.RFC4648URL;
   * const decoder = new Base64.Decoder(rfc4648urlOptions);
   *
   * decoder.decode("AwIBAP_-_fw");
   * // → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
   * ```
   */
  export class Decoder implements BytesEncoding.Decoder {
    /**
     * 未設定項目を埋めたオプション
     */
    #options: _ResolvedOptions;

    /**
     * @param options The `Base64.Options` dictionary.
     * @throws {RangeError} The `options.rawTable` contains duplicate characters, or the `options.padding` character is contained in the `options.rawTable`.
     */
    constructor(options?: Options) {
      this.#options = _resolveOptions(options);
      Object.freeze(this);
    }

    /**
     * Decodes a Base64-encoded string into an `Uint8Array`.
     *
     * @param encoded The string to decode.
     * @returns An `Uint8Array` containing the decoded byte sequence.
     * @throws {TypeError} The `encoded` is not Base64-encoded string.
     */
    decode(encoded: string): Uint8Array {
      return _decode(encoded, this.#options);
    }
  }
  Object.freeze(Decoder);

  /**
   * Base64 encoder
   *
   * @example
   * ```javascript
   * const encoder = new Base64.Encoder();
   *
   * encoder.encode(Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC));
   * // → "AwIBAP/+/fw="
   * ```
   * @example
   * ```javascript
   * const rfc4648urlOptions = Base64.Options.RFC4648URL;
   * const encoder = new Base64.Encoder(rfc4648urlOptions);
   *
   * encoder.encode(Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC));
   * // → "AwIBAP_-_fw"
   * ```
   */
  export class Encoder implements BytesEncoding.Encoder {
    /**
     * 未設定項目を埋めたオプション
     */
    #options: _ResolvedOptions;

    /**
     * @param options The `Base64.Options` dictionary.
     * @throws {RangeError} The `options.rawTable` contains duplicate characters, or the `options.padding` character is contained in the `options.rawTable`.
     */
    constructor(options?: Options) {
      this.#options = _resolveOptions(options);
      Object.freeze(this);
    }

    /**
     * Encodes the specified byte sequence into a string.
     *
     * @param toEncode The byte sequence to encode.
     * @returns A string containing the Base64-encoded characters.
     */
    encode(toEncode: Uint8Array): string {
      return _encode(toEncode, this.#options);
    }
  }
  Object.freeze(Encoder);

  /**
   * The `TransformStream` that decodes a stream of Base64-encoded string into `Uint8Array` stream.
   *
   * @example
   * ```javascript
   * const decoderStream = new Base64.DecoderStream();
   * // readableStream: ReadableStream<string>
   * // writableStream: WritableStream<Uint8Array>
   *
   * readableStream.pipeThrough(decoderStream).pipeTo(writableStream);
   * ```
   */
  export class DecoderStream extends BytesEncoding.DecoderStream {
    /**
     * @param options The `Base64.Options` dictionary.
     */
    constructor(options?: Base64.Options) {
      const decoder = new Base64.Decoder(options);
      const regulator = new _DecoderStreamRegulator();
      super(decoder, regulator);
      Object.freeze(this);
    }
  }
  Object.freeze(DecoderStream);

  /**
   * The `TransformStream` that encodes a stream of `Uint8Array` into Base64-encoded string stream.
   *
   * @example
   * ```javascript
   * const encoderStream = new Base64.EncoderStream();
   * // readableStream: ReadableStream<Uint8Array>
   * // writableStream: WritableStream<string>
   *
   * readableStream.pipeThrough(encoderStream).pipeTo(writableStream);
   * ```
   */
  export class EncoderStream extends BytesEncoding.EncoderStream {
    /**
     * @param options The `Base64.Options` dictionary.
     */
    constructor(options?: Base64.Options) {
      const encoder = new Base64.Encoder(options);
      const regulator = new _EncoderStreamRegulator();
      super(encoder, regulator);
      Object.freeze(this);
    }
  }
  Object.freeze(EncoderStream);
}
Object.freeze(Base64);

export { Base64 };
