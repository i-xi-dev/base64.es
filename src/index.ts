//

import type { base64char, Base64ResolvedOptions, Base64Table } from "./_.js";
import { base64Decode, isBase64Char, isBase64Table } from "./_.js";

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
const Rfc4648Options: Base64ResolvedOptions = Object.freeze({
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
function resolveOptions(options: Base64Options | Base64ResolvedOptions = Rfc4648Options): Base64ResolvedOptions {
  const defaults = Rfc4648Options;
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






class Base64Decoder {
  #options: Base64ResolvedOptions;

  constructor(options?: Base64Options) {
    this.#options = resolveOptions(options);
    Object.freeze(this);
  }

  decode(encoded: string): Uint8Array {
    return base64Decode(encoded, this.#options);
  }
}
Object.freeze(Base64Decoder);

class Base64Encoder {
  #options: Base64ResolvedOptions;

  constructor(options?: Base64Options) {
    this.#options = resolveOptions(options);
    Object.freeze(this);
  }

}
Object.freeze(Base64Encoder);
