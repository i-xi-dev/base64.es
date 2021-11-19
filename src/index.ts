//

import {
  base64char,
  base64Decode,
  base64Encode,
  Base64ResolvedOptions,
  Base64Table,
  isBase64Char,
  isBase64Table,
} from "./_.js";

/**
 * 62文字目（インデックス0～61）までの変換テーブル
 */
const TABLE_62: Readonly<Array<base64char>> = Object.freeze([
  "A",  // 0
  "B",  // 1
  "C",  // 2
  "D",  // 3
  "E",  // 4
  "F",  // 5
  "G",  // 6
  "H",  // 7
  "I",  // 8
  "J",  // 9
  "K",  // 10
  "L",  // 11
  "M",  // 12
  "N",  // 13
  "O",  // 14
  "P",  // 15
  "Q",  // 16
  "R",  // 17
  "S",  // 18
  "T",  // 19
  "U",  // 20
  "V",  // 21
  "W",  // 22
  "X",  // 23
  "Y",  // 24
  "Z",  // 25
  "a",  // 26
  "b",  // 27
  "c",  // 28
  "d",  // 29
  "e",  // 30
  "f",  // 31
  "g",  // 32
  "h",  // 33
  "i",  // 34
  "j",  // 35
  "k",  // 36
  "l",  // 37
  "m",  // 38
  "n",  // 39
  "o",  // 40
  "p",  // 41
  "q",  // 42
  "r",  // 43
  "s",  // 44
  "t",  // 45
  "u",  // 46
  "v",  // 47
  "w",  // 48
  "x",  // 49
  "y",  // 50
  "z",  // 51
  "0",  // 52
  "1",  // 53
  "2",  // 54
  "3",  // 55
  "4",  // 56
  "5",  // 57
  "6",  // 58
  "7",  // 59
  "8",  // 60
  "9",  // 61
]);

/**
 * RFC 4648 Base64 の変換テーブル
 */
const RFC4648_TABLE: Readonly<Base64Table> = Object.freeze([ ...TABLE_62, "+", "/" ]) as Base64Table;

/**
 * RFC 4648 Base64url の変換テーブル
 */
const RFC4648URL_TABLE: Readonly<Base64Table> = Object.freeze([ ...TABLE_62, "-", "_" ]) as Base64Table;

const RFC4648_PADDING = "=";

/**
 * RFC 4648 Base64 の仕様で復号/符号化するためのオプション
 */
const Rfc4648Base64Options: Base64ResolvedOptions = Object.freeze({
  table: RFC4648_TABLE,
  padEnd: true,
  padding: RFC4648_PADDING,
  forgiving: true,
});

/**
 * RFC 4648 Base64url の仕様で復号/符号化するためのオプション
 */
const Rfc4648Base64UrlOptions: Base64ResolvedOptions = Object.freeze({
  table: RFC4648URL_TABLE,
  padEnd: false,
  padding: RFC4648_PADDING,
  forgiving: true,
});

/**
 * オプション
 */
type Base64Options = {
  /** @see {@link Base64ResolvedOptions.table} */
  table: Readonly<Array<string>>,

  /** @see {@link Base64ResolvedOptions.padEnd} */
  padEnd?: boolean,

  /** @see {@link Base64ResolvedOptions.padding} */
  padding?: string,

  /** @see {@link Base64ResolvedOptions.forgiving} */
  forgiving?: boolean,
};

/**
 * オプションをBase64ResolvedOptions型に変換する
 * 未設定項目はデフォルト値で埋める
 * 
 * @param options オプション
 * @returns 未設定項目を埋めたオプションの複製
 */
function resolveOptions(options: Base64Options | Base64ResolvedOptions = Rfc4648Base64Options): Base64ResolvedOptions {
  const defaults = Rfc4648Base64Options;
  const table: Readonly<Base64Table> = isBase64Table(options.table) ? options.table : defaults.table;
  const padEnd: boolean = (typeof options.padEnd === "boolean") ? options.padEnd : defaults.padEnd;
  const padding: base64char = isBase64Char(options.padding) ? options.padding : defaults.padding;
  const forgiving: boolean = (typeof options.forgiving === "boolean") ? options.forgiving : defaults.forgiving;

  // tableとpaddingの重複チェック
  if((new Set([ ...table, padding ])).size !== 65) {
    throw new RangeError("options error: character duplicated");
  }

  return {
    table,
    padEnd,
    padding,
    forgiving,
  };
}

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
    return base64Encode(toEncode, this.#options);
  }
}
Object.freeze(Base64Encoder);

export type {
  Base64Options,
};

export {
  Base64Decoder,
  Base64Encoder,
  Rfc4648Base64Options,
  Rfc4648Base64UrlOptions,
};
