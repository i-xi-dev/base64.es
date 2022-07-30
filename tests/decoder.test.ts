import { assertStrictEquals, assertThrows } from "std/testing/asserts";
import { Base64 } from "../mod.ts";

Deno.test("Base64.Decoder.prototype.decode - Base64.Decoder()", () => {
  const decoder = new Base64.Decoder();

  const decoded11 = decoder.decode("");
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12 = decoder.decode("AwIBAP/+/fw=");
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12b = decoder.decode("AwIBAP/+/fw");
  assertStrictEquals(
    JSON.stringify([...decoded12b]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      decoder.decode("あ");
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP_-_fw=");
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      decoder.decode("=AwIBAP/+/fw");
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      decoder.decode("=");
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP/+/fw,");
    },
    TypeError,
    "decode error (1)",
  );
});

Deno.test("Base64.Decoder.prototype.decode - Base64.Decoder({noPadding:true})", () => {
  const decoder = new Base64.Decoder({ noPadding: true });

  const decoded11 = decoder.decode("");
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12z = decoder.decode("AwIBAP/+/fw=");
  assertStrictEquals(
    JSON.stringify([...decoded12z]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12 = decoder.decode("AwIBAP/+/fw");
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      decoder.decode("あ");
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP_-_fw=");
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      decoder.decode("=AwIBAP/+/fw");
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      decoder.decode("=");
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP/+/fw,");
    },
    TypeError,
    "decode error (1)",
  );
});

Deno.test("Base64.Decoder.prototype.decode - Base64.Decoder({paddingChar:'!'})", () => {
  const decoder = new Base64.Decoder({ paddingChar: "!" });

  const decoded11 = decoder.decode("");
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12 = decoder.decode("AwIBAP/+/fw!");
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP/+/fw=");
    },
    TypeError,
    "decode error (1)",
  );

  const decoded12z = decoder.decode("AwIBAP/+/fw");
  assertStrictEquals(
    JSON.stringify([...decoded12z]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      decoder.decode("あ");
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP_-_fw!");
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      decoder.decode("=AwIBAP/+/fw");
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      decoder.decode("!");
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP/+/fw,");
    },
    TypeError,
    "decode error (1)",
  );
});

Deno.test("Base64.Decoder.prototype.decode - Base64.Decoder(Rfc4648Base64UrlOptions)", () => {
  const decoder = new Base64.Decoder({
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
  });

  const decoded11 = decoder.decode("");
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  assertThrows(
    () => {
      decoder.decode("AwIBAP/+/fw=");
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP/+/fw");
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      decoder.decode("あ");
    },
    TypeError,
    "forgiving decode error",
  );

  const decoded12 = decoder.decode("AwIBAP_-_fw=");
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12b = decoder.decode("AwIBAP_-_fw");
  assertStrictEquals(
    JSON.stringify([...decoded12b]),
    "[3,2,1,0,255,254,253,252]",
  );

  assertThrows(
    () => {
      decoder.decode("=AwIBAP_-_fw");
    },
    TypeError,
    "decode error (1)",
  );

  assertThrows(
    () => {
      decoder.decode("=");
    },
    TypeError,
    "forgiving decode error",
  );

  assertThrows(
    () => {
      decoder.decode("AwIBAP_-_fw,");
    },
    TypeError,
    "decode error (1)",
  );
});

Deno.test("Base64.Decoder.get()", () => {
  const decoder = Base64.Decoder.get();

  const decoded11 = decoder.decode("");
  assertStrictEquals(JSON.stringify([...decoded11]), "[]");

  const decoded12 = decoder.decode("AwIBAP/+/fw=");
  assertStrictEquals(
    JSON.stringify([...decoded12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decoded12b = decoder.decode("AwIBAP/+/fw");
  assertStrictEquals(
    JSON.stringify([...decoded12b]),
    "[3,2,1,0,255,254,253,252]",
  );
});

// Deno.test("Base64.Decoder.get(Object)", () => {
//   const decoder1 = Base64.Decoder.get({noPadding:false});
//   const decoder2 = Base64.Decoder.get({noPadding:true});
//   assertStrictEquals(decoder1).to.not.equal(decoder2);

//   const decoder21 = Base64.Decoder.get({noPadding:true});
//   const decoder22 = Base64.Decoder.get({noPadding:true});
//   assertStrictEquals(decoder21, decoder22);

// });
