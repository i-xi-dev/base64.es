
const CHARS = [
  "!",
  "+",
  "-",
  ".",
  "/",
  "0", //
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
  "A", //
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
  "a", //
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
type char = typeof CHARS[number];

function isChar(value: unknown): value is char {
  if ((typeof value === "string") && (value.length === 1)) {
    return CHARS.includes(value as char);
  }
  return false;
}

/**
 * 変換テーブル
 */
type Table = [
  char, char, char, char, char, char, char, char,
  char, char, char, char, char, char, char, char,
  char, char, char, char, char, char, char, char,
  char, char, char, char, char, char, char, char,
  char, char, char, char, char, char, char, char,
  char, char, char, char, char, char, char, char,
  char, char, char, char, char, char, char, char,
  char, char, char, char, char, char, char, char,
];

function isTable(value: unknown): value is Table {
  return (Array.isArray(value) && (value.length === 64) && value.every((i) => isChar(i)));
}

/**
 * RFC 4648 Base64 の0～61番目の文字までの変換テーブル
 */
const RFC4648_TABLE: Readonly<Table> = [
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
  "+",  // 62
  "/",  // 63
] as const;

/**
 * RFC 4648 Base64url の0～61番目の文字までの変換テーブル
 */
const RFC4648URL_TABLE: Readonly<Table> = [
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
  "-",  // 62
  "_",  // 63
] as const;

/**
 * オプション
 */
type Base64Options = {
  /** 変換テーブル */
  table: Readonly<Table>,

  /** パディングを付加するか否か */
  padEnd?: boolean,

  /** パディング文字 */
  padding?: char,

  /**
   * 復号時:
   *    復号を寛容に行うか否か
   *    （https://infra.spec.whatwg.org/#forgiving-base64-decode の仕様で復号するか否か）
   *    ※trueの場合、padEndは無視する
   * 
   * 符号化時
   *    無視する
   */
  forgiving?: boolean,
};

const RFC4648_PADDING = "=";

/**
 * 未設定がないオプション
 */
type ResolvedOptions = {
  /** @see {@link Base64Options.table} */
  table: Readonly<Table>,

  /** @see {@link Base64Options.padEnd} */
  padEnd: boolean,

  /** @see {@link Base64Options.padding} */
  padding: char,

  /** @see {@link Base64Options.forgiving} */
  forgiving: boolean,
};

/**
 * RFC 4648 Base64 の仕様で復号/符号化するためのオプション
 */
const DefaultOptions: ResolvedOptions = {
  table: RFC4648_TABLE,
  padEnd: true,
  padding: RFC4648_PADDING,
  forgiving: true,
};

/**
 * オプションの未設定項目を埋めた複製を返す
 * @param options オプション
 * @returns 未設定項目を埋めたオプションの複製
 */
function resolveDecodeOptions(options: Base64Options | ResolvedOptions = DefaultOptions): ResolvedOptions {
  const table: Readonly<Table> = isTable(options.table) ? options.table : DefaultOptions.table.slice(0) as Table;
  const padEnd: boolean = (typeof options.padEnd === "boolean") ? options.padEnd : DefaultOptions.padEnd;
  const padding: char = isChar(options.padding) ? options.padding : DefaultOptions.padding;
  const forgiving: boolean = (typeof options.forgiving === "boolean") ? options.forgiving : DefaultOptions.forgiving;
  return {
    table,
    padEnd,
    padding,
    forgiving,
  };
}

/**
 * 文字列をバイト列にBase64復号し、結果のバイト列を返却
 * 
 * {@link https://infra.spec.whatwg.org/#forgiving-base64-decode Infra Standard}および、
 * {@link https://datatracker.ietf.org/doc/html/rfc4648 RFC 4648}の仕様に従った。
 * 改行には非対応（必要であれば改行を除去してからdecodeすべし）。
 * 
 * @param encoded Base64符号化された文字列
 * @param options オプション
 * @returns バイト列
 */
function decode(encoded: string, options?: Base64Options | ResolvedOptions): Uint8Array {
  const resolvedOptions: ResolvedOptions = resolveDecodeOptions(options);

  let work: string = encoded;
  if (resolvedOptions.forgiving === true) {
    // work = work.replaceAll(/[\u{9}\u{A}\u{C}\u{D}\u{20}]/gu, "");
    work = work.replace(/[\u{9}\u{A}\u{C}\u{D}\u{20}]/gu, "");
  }

  if (resolvedOptions.forgiving === true) {
    // work.lengthの箇所は、仕様では符号位置数だがlengthを使用する
    // length !== 符号位置数の場合の処理結果が正しくなくなるが、そうなったとしてもisEncodedでエラーとなる為問題は無いはず

    if ((work.length % 4) === 0) {
      for (let i = 0; i < 2; i++) {
        if (work.endsWith(resolvedOptions.padding)) {
          work = work.substring(0, (work.length - 1));
        }
        else {
          break;
        }
      }
    }

    if ((work.length % 4) === 1) {
      throw new TypeError("EncodingError: forgiving decode error");
    }
  }

  if (isEncoded(work, resolvedOptions) !== true) {
    throw new TypeError("EncodingError: decode error (1)");
  }

  const paddingStart = work.indexOf(resolvedOptions.padding);
  let paddingCount: number;
  let encodedBody: string;
  if ((resolvedOptions.padEnd === true) && (resolvedOptions.forgiving !== true)) {
    if ((work.length % 4) !== 0) {
      throw new TypeError("EncodingError: decode error (2)");
    }

    if (paddingStart >= 0) {
      paddingCount = work.length - paddingStart;
      encodedBody = work.substring(0, paddingStart);
    }
    else {
      paddingCount = 0;
      encodedBody = work;
    }
  }
  else {
    // if (paddingStart >= 0) {
    //  throw new TypeError("EncodingError: decode error (3)"); (1)で例外になる
    // }
    paddingCount = (work.length % 4 === 0) ? 0 : 4 - (work.length % 4);
    encodedBody = work;
  }

  let _6bit1: number;
  let _6bit2: number;
  let _6bit3: number;
  let _6bit4: number;
  let _8bitI = 0;
  const encodedByteCount = ((encodedBody.length + paddingCount) * 3 / 4) - paddingCount;
  const decodedBytes = new Uint8Array(encodedByteCount);

  let i = 0;
  if (encodedBody.length >= 4) {
    for (i = 0; i < encodedBody.length; i = i + 4) {
      // 8-bit (1)
      _6bit1 = resolvedOptions.table.indexOf(encodedBody[i] as char);
      _6bit2 = resolvedOptions.table.indexOf(encodedBody[i + 1] as char);
      decodedBytes[_8bitI++] = (_6bit1 << 2) | (_6bit2 >> 4);

      // 8-bit (2)
      if (typeof encodedBody[i + 2] !== "string") {
        decodedBytes[_8bitI++] = ((_6bit2 & 0b001111) << 4);
        break;
      }
      _6bit3 = resolvedOptions.table.indexOf(encodedBody[i + 2] as char);
      decodedBytes[_8bitI++] = ((_6bit2 & 0b001111) << 4) | (_6bit3 >> 2);

      // 8-bit (3)
      if (typeof encodedBody[i + 3] !== "string") {
        decodedBytes[_8bitI++] = ((_6bit3 & 0b000011) << 6);
        break;
      }
      _6bit4 = resolvedOptions.table.indexOf(encodedBody[i + 3] as char);
      decodedBytes[_8bitI++] = ((_6bit3 & 0b000011) << 6) | _6bit4;
    }
  }
  return decodedBytes;
}

function isEncoded(work: string, resolvedOptions: ResolvedOptions): boolean {
  const tablePattern = "[" + resolvedOptions.table.map((chr) => `\\u${ chr.charCodeAt(0).toString(16) }`).join("") + "]";

  let regex: RegExp;
  if ((resolvedOptions.padEnd === true) && (resolvedOptions.forgiving !== true)) {
    const paddingPattern = `\\u{${ resolvedOptions.padding.charCodeAt(0).toString(16) }}`;
    regex = new RegExp(`^(${ tablePattern }+${ paddingPattern }*|${ tablePattern }*)$`, "u");
  }
  else {
    regex = new RegExp(`^${ tablePattern }*$`, "u");
  }

  return regex.test(work);
}

/** 0～255の整数を表すものとする */
type uint8 = number;

/**
 * バイト列を文字列にBase64符号化し、結果の文字列を返却
 * 
 * {@link https://infra.spec.whatwg.org/#forgiving-base64-decode Infra Standard}および、
 * {@link https://datatracker.ietf.org/doc/html/rfc4648 RFC 4648}の仕様に従った。
 * 改行には非対応（必要であればencode結果を改行すべし）。
 * 
 * @param toEncode バイト列
 * @param options Base64符号化方式オプション
 * @returns Base64符号化された文字列
 */
function encode(toEncode: Uint8Array, options?: Base64Options | ResolvedOptions): string {
  const resolvedOptions: ResolvedOptions = resolveDecodeOptions(options);

  let _6bit1e: string;
  let _6bit2e: string;
  let _6bit3e: string;
  let _6bit4e: string;
  let encodedChars = "";
  for (let i = 0; i < toEncode.byteLength; i = i + 3) { 
    const [ _n8bit1, _n8bit2, _n8bit3 ] = toEncode.subarray(i, i + 3);
    const _8bit1: uint8 = _n8bit1 as uint8;
    const _8bit2: uint8 = (_n8bit2 !== undefined) ? (_n8bit2 as uint8) : 0;

    // 6-bit (1)
    _6bit1e = resolvedOptions.table[_8bit1 >> 2] as string;

    // 6-bit (2)
    _6bit2e = resolvedOptions.table[((_8bit1 & 0b00000011) << 4) | (_8bit2 >> 4)] as string;

    if (_n8bit2 !== undefined) {
      const _8bit3: uint8 = (_n8bit3 !== undefined) ? (_n8bit3 as uint8) : 0;

      // 6-bit (3)
      _6bit3e = resolvedOptions.table[((_8bit2 & 0b00001111) << 2) | (_8bit3 >> 6)] as string;

      if (_n8bit3 !== undefined) {
        // 6-bit (4)
        _6bit4e = resolvedOptions.table[_8bit3 & 0b00111111] as string;
      }
      else {
        _6bit4e = (resolvedOptions.padEnd === true) ? resolvedOptions.padding : "";
      }
    }
    else {
      _6bit3e = (resolvedOptions.padEnd === true) ? resolvedOptions.padding : "";
      _6bit4e = (resolvedOptions.padEnd === true) ? resolvedOptions.padding : "";
    }
    encodedChars = encodedChars.concat(_6bit1e + _6bit2e + _6bit3e + _6bit4e);
  }
  return encodedChars;
}

export type {
  Base64Options,
};

/**
 * RFC 4648 Base64url の仕様で復号/符号化するためのオプション
 */
const Rfc4648Base64UrlOptions: Base64Options = {
  table: RFC4648URL_TABLE,
  padEnd: false,
  padding: RFC4648_PADDING,
  forgiving: true,
};

export {
  DefaultOptions as Rfc4648Base64Options,
  Rfc4648Base64UrlOptions,
  decode,
  encode,
};
