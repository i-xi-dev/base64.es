import { assertStrictEquals, assertThrows } from "std/testing/asserts";
import { Base64 } from "../src/base64.ts";
import { _crypto as crypto } from "https://raw.githubusercontent.com/i-xi-dev/compat.es/1.0.1/mod.ts";

function test(arrayBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(arrayBuffer);
  const binStr = [...bytes].map((byte) => String.fromCharCode(byte)).join("");
  return globalThis.btoa(binStr);
}

Deno.test("Base64.decode(string)", () => {
  const decoded11 = Base64.decode("");
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12 = Base64.decode("AwIBAP/+/fw=");
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12b = Base64.decode("AwIBAP/+/fw");
  assertStrictEquals(
    JSON.stringify([...decoded12b]),
    "[3,2,1,0,255,254,253,252]",
  );

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const dr1 = Base64.decode(test(r1.buffer));
  assertStrictEquals(JSON.stringify([...dr1]), JSON.stringify([...r1]));

  assertThrows(
    () => {
      Base64.decode("あ");
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      Base64.decode("AwIBAP_-_fw=");
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      Base64.decode("=AwIBAP/+/fw");
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      Base64.decode("=");
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      Base64.decode("AwIBAP/+/fw,");
    },
    TypeError,
    "decode error (1)",
  );
});

Deno.test("Base64.decode(string, {noPadding:true})", () => {
  const decoded11 = Base64.decode("", { noPadding: true });
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12z = Base64.decode("AwIBAP/+/fw=", { noPadding: true });
  assertStrictEquals(
    JSON.stringify([...decoded12z]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12 = Base64.decode("AwIBAP/+/fw", { noPadding: true });
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      Base64.decode("あ", { noPadding: true });
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      Base64.decode("AwIBAP_-_fw=", { noPadding: true });
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      Base64.decode("=AwIBAP/+/fw", { noPadding: true });
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      Base64.decode("=", { noPadding: true });
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      Base64.decode("AwIBAP/+/fw,", { noPadding: true });
    },
    TypeError,
    "decode error (1)",
  );
});

Deno.test("Base64.decode(string, {noPadding:true})", () => {
  const decoded12z = Base64.decode("AwIBAP/+/fw=", { noPadding: true });
  assertStrictEquals(
    JSON.stringify([...decoded12z]),
    "[3,2,1,0,255,254,253,252]",
  );
});

Deno.test("Base64.decode(string, {paddingChar:'!'})", () => {
  const decoded11 = Base64.decode("", { paddingChar: "!" });
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12 = Base64.decode("AwIBAP/+/fw!", { paddingChar: "!" });
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      Base64.decode("AwIBAP/+/fw=", { paddingChar: "!" });
    },
    TypeError,
    "decode error (1)",
  );

  const decoded12z = Base64.decode("AwIBAP/+/fw", { paddingChar: "!" });
  assertStrictEquals(
    JSON.stringify([...decoded12z]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      Base64.decode("あ", { paddingChar: "!" });
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      Base64.decode("AwIBAP_-_fw!", { paddingChar: "!" });
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      Base64.decode("=AwIBAP/+/fw", { paddingChar: "!" });
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      Base64.decode("!", { paddingChar: "!" });
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      Base64.decode("AwIBAP/+/fw,", { paddingChar: "!" });
    },
    TypeError,
    "decode error (1)",
  );
});

Deno.test("Base64.decode(string, {paddingChar:'!'})", () => {
  const decoded12 = Base64.decode("AwIBAP/+/fw!", { paddingChar: "!" });
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );
});

Deno.test("Base64.decode(string, Rfc4648Base64UrlOptions)", () => {
  const op = {
    table: [
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
      "-",
      "_",
    ],
    noPadding: true,
    paddingChar: "=",
  };

  const decoded11 = Base64.decode("", op);
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  assertThrows(
    () => {
      const opx = {
        table: [
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
          "-",
          "_",
        ],
        noPadding: true,
        paddingChar: "A",
      };
      Base64.decode("AwIBAP/+/fw=", opx);
    },
    RangeError,
    "options error: character duplicated",
  );

  assertThrows(
    () => {
      Base64.decode("AwIBAP/+/fw=", op);
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      Base64.decode("AwIBAP/+/fw", op);
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      Base64.decode("あ", op);
    },
    TypeError,
    "forgiving decode error",
  );

  const decoded12 = Base64.decode("AwIBAP_-_fw=", op);
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12b = Base64.decode("AwIBAP_-_fw", op);
  assertStrictEquals(
    JSON.stringify([...decoded12b]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      Base64.decode("=AwIBAP_-_fw", op);
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      Base64.decode("=", op);
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      Base64.decode("AwIBAP_-_fw,", op);
    },
    TypeError,
    "decode error (1)",
  );
});

Deno.test("Base64.encode(Uint8Array)", () => {
  assertStrictEquals(Base64.encode(Uint8Array.of()), "");
  assertStrictEquals(
    Base64.encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252)),
    "AwIBAP/+/fw=",
  );
  assertStrictEquals(Base64.encode(Uint8Array.of(255)), "/w==");
  assertStrictEquals(Base64.encode(Uint8Array.of(251)), "+w==");

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const r2 = crypto.getRandomValues(new Uint8Array(255));
  const r3 = crypto.getRandomValues(new Uint8Array(254));
  const r4 = crypto.getRandomValues(new Uint8Array(253));
  const r5 = crypto.getRandomValues(new Uint8Array(252));
  const r6 = crypto.getRandomValues(new Uint8Array(251));
  const r7 = crypto.getRandomValues(new Uint8Array(250));
  const r8 = crypto.getRandomValues(new Uint8Array(249));
  const r9 = crypto.getRandomValues(new Uint8Array(248));

  assertStrictEquals(Base64.encode(r1), test(r1.buffer));
  assertStrictEquals(Base64.encode(r2), test(r2.buffer));
  assertStrictEquals(Base64.encode(r3), test(r3.buffer));
  assertStrictEquals(Base64.encode(r4), test(r4.buffer));
  assertStrictEquals(Base64.encode(r5), test(r5.buffer));
  assertStrictEquals(Base64.encode(r6), test(r6.buffer));
  assertStrictEquals(Base64.encode(r7), test(r7.buffer));
  assertStrictEquals(Base64.encode(r8), test(r8.buffer));
  assertStrictEquals(Base64.encode(r9), test(r9.buffer));
});

Deno.test("Base64.encode(Uint8Array, {noPadding:true})", () => {
  assertStrictEquals(Base64.encode(Uint8Array.of(), { noPadding: true }), "");
  assertStrictEquals(
    Base64.encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), {
      noPadding: true,
    }),
    "AwIBAP/+/fw",
  );
  assertStrictEquals(
    Base64.encode(Uint8Array.of(255), { noPadding: true }),
    "/w",
  );
  assertStrictEquals(
    Base64.encode(Uint8Array.of(251), { noPadding: true }),
    "+w",
  );

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const r2 = crypto.getRandomValues(new Uint8Array(255));
  const r3 = crypto.getRandomValues(new Uint8Array(254));
  const r4 = crypto.getRandomValues(new Uint8Array(253));
  const r5 = crypto.getRandomValues(new Uint8Array(252));
  const r6 = crypto.getRandomValues(new Uint8Array(251));
  const r7 = crypto.getRandomValues(new Uint8Array(250));
  const r8 = crypto.getRandomValues(new Uint8Array(249));
  const r9 = crypto.getRandomValues(new Uint8Array(248));

  assertStrictEquals(
    Base64.encode(r1, { noPadding: true }),
    test(r1.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Base64.encode(r2, { noPadding: true }),
    test(r2.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Base64.encode(r3, { noPadding: true }),
    test(r3.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Base64.encode(r4, { noPadding: true }),
    test(r4.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Base64.encode(r5, { noPadding: true }),
    test(r5.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Base64.encode(r6, { noPadding: true }),
    test(r6.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Base64.encode(r7, { noPadding: true }),
    test(r7.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Base64.encode(r8, { noPadding: true }),
    test(r8.buffer).replace(/=*$/, ""),
  );
  assertStrictEquals(
    Base64.encode(r9, { noPadding: true }),
    test(r9.buffer).replace(/=*$/, ""),
  );
});

Deno.test("Base64.encode(Uint8Array, {noPadding:true})", () => {
  assertStrictEquals(
    Base64.encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), {
      noPadding: true,
    }),
    "AwIBAP/+/fw",
  );
});

Deno.test("Base64.encode(Uint8Array, {noPadding:1})", () => {
  assertStrictEquals(
    Base64.encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), {
      noPadding: 1 as unknown as boolean,
    }),
    "AwIBAP/+/fw=",
  );
});

Deno.test("Base64.encode(Uint8Array, {paddingChar:'!'})", () => {
  assertStrictEquals(Base64.encode(Uint8Array.of(), { paddingChar: "!" }), "");
  assertStrictEquals(
    Base64.encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), {
      paddingChar: "!",
    }),
    "AwIBAP/+/fw!",
  );
  assertStrictEquals(
    Base64.encode(Uint8Array.of(255), { paddingChar: "!" }),
    "/w!!",
  );
  assertStrictEquals(
    Base64.encode(Uint8Array.of(251), { paddingChar: "!" }),
    "+w!!",
  );

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const r2 = crypto.getRandomValues(new Uint8Array(255));
  const r3 = crypto.getRandomValues(new Uint8Array(254));
  const r4 = crypto.getRandomValues(new Uint8Array(253));
  const r5 = crypto.getRandomValues(new Uint8Array(252));
  const r6 = crypto.getRandomValues(new Uint8Array(251));
  const r7 = crypto.getRandomValues(new Uint8Array(250));
  const r8 = crypto.getRandomValues(new Uint8Array(249));
  const r9 = crypto.getRandomValues(new Uint8Array(248));

  assertStrictEquals(
    Base64.encode(r1, { paddingChar: "!" }),
    test(r1.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Base64.encode(r2, { paddingChar: "!" }),
    test(r2.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Base64.encode(r3, { paddingChar: "!" }),
    test(r3.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Base64.encode(r4, { paddingChar: "!" }),
    test(r4.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Base64.encode(r5, { paddingChar: "!" }),
    test(r5.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Base64.encode(r6, { paddingChar: "!" }),
    test(r6.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Base64.encode(r7, { paddingChar: "!" }),
    test(r7.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Base64.encode(r8, { paddingChar: "!" }),
    test(r8.buffer).replace(/=/g, "!"),
  );
  assertStrictEquals(
    Base64.encode(r9, { paddingChar: "!" }),
    test(r9.buffer).replace(/=/g, "!"),
  );
});

Deno.test("Base64.encode(Uint8Array, {paddingChar:'!'})", () => {
  assertStrictEquals(
    Base64.encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), {
      paddingChar: "!",
    }),
    "AwIBAP/+/fw!",
  );
});

Deno.test("Base64.encode(Uint8Array, {paddingChar:'!!'})", () => {
  assertStrictEquals(
    Base64.encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), {
      paddingChar: "!!",
    }),
    "AwIBAP/+/fw=",
  );
});

Deno.test("Base64.encode(Uint8Array, Rfc4648Base64UrlOptions)", () => {
  const op = {
    table: [
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
      "-",
      "_",
    ],
    noPadding: true,
    paddingChar: "=",
  };

  assertStrictEquals(Base64.encode(Uint8Array.of(), op), "");
  assertStrictEquals(
    Base64.encode(Uint8Array.of(3, 2, 1, 0, 255, 254, 253, 252), op),
    "AwIBAP_-_fw",
  );
  assertStrictEquals(Base64.encode(Uint8Array.of(255), op), "_w");
  assertStrictEquals(Base64.encode(Uint8Array.of(251), op), "-w");

  const r1 = crypto.getRandomValues(new Uint8Array(256));
  const r2 = crypto.getRandomValues(new Uint8Array(255));
  const r3 = crypto.getRandomValues(new Uint8Array(254));
  const r4 = crypto.getRandomValues(new Uint8Array(253));
  const r5 = crypto.getRandomValues(new Uint8Array(252));
  const r6 = crypto.getRandomValues(new Uint8Array(251));
  const r7 = crypto.getRandomValues(new Uint8Array(250));
  const r8 = crypto.getRandomValues(new Uint8Array(249));
  const r9 = crypto.getRandomValues(new Uint8Array(248));

  assertStrictEquals(
    Base64.encode(r1, op),
    test(r1.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Base64.encode(r2, op),
    test(r2.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Base64.encode(r3, op),
    test(r3.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Base64.encode(r4, op),
    test(r4.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Base64.encode(r5, op),
    test(r5.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Base64.encode(r6, op),
    test(r6.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Base64.encode(r7, op),
    test(r7.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Base64.encode(r8, op),
    test(r8.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
  assertStrictEquals(
    Base64.encode(r9, op),
    test(r9.buffer).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"),
  );
});

Deno.test("Base64.Options[string]", () => {
  const op1 = Base64.Options.RFC4648;
  const decoded1 = Base64.decode("AwIBAP/+/fw=");
  assertStrictEquals(
    JSON.stringify([...decoded1]),
    "[3,2,1,0,255,254,253,252]",
  );
  const decoded1b = Base64.decode("AwIBAP/+/fw=", op1);
  assertStrictEquals(
    JSON.stringify([...decoded1b]),
    "[3,2,1,0,255,254,253,252]",
  );

  const op2 = Base64.Options.RFC4648URL;
  const decoded2 = Base64.decode("AwIBAP_-_fw", op2);
  assertStrictEquals(
    JSON.stringify([...decoded2]),
    "[3,2,1,0,255,254,253,252]",
  );

  // assertThrows(() => {
  //   Base64.Options = {};
  // }, TypeError);

  // assertThrows(() => {
  //   Base64.Options["x"] = {};
  // }, TypeError);

  const opx = Base64.Options.RFC4648 as Base64.Options;
  assertThrows(() => {
    opx.table = [];
  }, TypeError);
  // assertThrows(() => {
  //   opx.table[0] = "1";
  // }, TypeError);
  assertThrows(() => {
    opx.noPadding = true;
  }, TypeError);
  assertThrows(() => {
    opx.paddingChar = "!";
  }, TypeError);
});
