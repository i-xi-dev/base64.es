import assert from "node:assert";
import { webcrypto as crypto } from "node:crypto";
import { Base64 } from "../../node/index.mjs";

describe("Base64.decode", () => {
  it("decode(string)", () => {
    const decoded11 = Base64.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = Base64.decode("AwIBAP/+/fw=");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded12b = Base64.decode("AwIBAP/+/fw");
    assert.strictEqual(JSON.stringify([...decoded12b]), "[3,2,1,0,255,254,253,252]");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const dr1 = Base64.decode(Buffer.from(r1.buffer).toString("base64"));
    assert.strictEqual(JSON.stringify([...dr1]), JSON.stringify([...r1]));

    assert.throws(() => {
      Base64.decode("あ");
    }, {
      name: "TypeError",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP_-_fw=");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("=AwIBAP/+/fw");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("=");
    }, {
      name: "TypeError",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP/+/fw,");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

  });

  it("decode(string, {padEnd:false})", () => {
    const decoded11 = Base64.decode("", {padEnd:false});
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12z = Base64.decode("AwIBAP/+/fw=", {padEnd:false});
    assert.strictEqual(JSON.stringify([...decoded12z]), "[3,2,1,0,255,254,253,252]");

    const decoded12 = Base64.decode("AwIBAP/+/fw", {padEnd:false});
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      Base64.decode("あ", {padEnd:false});
    }, {
      name: "TypeError",
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP_-_fw=", {padEnd:false});
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("=AwIBAP/+/fw", {padEnd:false});
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("=", {padEnd:false});
    }, {
      name: "TypeError",
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP/+/fw,", {padEnd:false});
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

  });

  it("decode(string, {padding:'!'})", () => {
    const decoded11 = Base64.decode("", {padding:'!'});
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = Base64.decode("AwIBAP/+/fw!", {padding:'!'});
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      Base64.decode("AwIBAP/+/fw=", {padding:'!'});
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    const decoded12z = Base64.decode("AwIBAP/+/fw", {padding:'!'});
    assert.strictEqual(JSON.stringify([...decoded12z]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      Base64.decode("あ", {padding:'!'});
    }, {
      name: "TypeError",
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP_-_fw!", {padding:'!'});
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("=AwIBAP/+/fw", {padding:'!'});
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("!", {padding:'!'});
    }, {
      name: "TypeError",
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP/+/fw,", {padding:'!'});
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

  });

  it("decode(string, Rfc4648Base64UrlOptions)", () => {
    const op = {
      table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
      padEnd: false,
      padding: "=",
    };

    const decoded11 = Base64.decode("", op);
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    assert.throws(() => {
      const opx = {
        table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
        padEnd: false,
        padding: "A",
      };
      Base64.decode("AwIBAP/+/fw=", opx);
    }, {
      name: "RangeError",
      message: "options error: character duplicated",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP/+/fw=", op);
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP/+/fw", op);
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("あ", op);
    }, {
      name: "TypeError",
      message: "forgiving decode error",
    });

    const decoded12 = Base64.decode("AwIBAP_-_fw=", op);
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded12b = Base64.decode("AwIBAP_-_fw", op);
    assert.strictEqual(JSON.stringify([...decoded12b]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      Base64.decode("=AwIBAP_-_fw", op);
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("=", op);
    }, {
      name: "TypeError",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP_-_fw,", op);
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

  });

});

describe("Base64.encode", () => {
  it("encode(Uint8Array)", () => {
    assert.strictEqual(Base64.encode(Uint8Array.of()), "");
    assert.strictEqual(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252)), "AwIBAP/+/fw=");
    assert.strictEqual(Base64.encode(Uint8Array.of(255)), "/w==");
    assert.strictEqual(Base64.encode(Uint8Array.of(251)), "+w==");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    assert.strictEqual(Base64.encode(r1), Buffer.from(r1.buffer).toString("base64"));
    assert.strictEqual(Base64.encode(r2), Buffer.from(r2.buffer).toString("base64"));
    assert.strictEqual(Base64.encode(r3), Buffer.from(r3.buffer).toString("base64"));
    assert.strictEqual(Base64.encode(r4), Buffer.from(r4.buffer).toString("base64"));
    assert.strictEqual(Base64.encode(r5), Buffer.from(r5.buffer).toString("base64"));
    assert.strictEqual(Base64.encode(r6), Buffer.from(r6.buffer).toString("base64"));
    assert.strictEqual(Base64.encode(r7), Buffer.from(r7.buffer).toString("base64"));
    assert.strictEqual(Base64.encode(r8), Buffer.from(r8.buffer).toString("base64"));
    assert.strictEqual(Base64.encode(r9), Buffer.from(r9.buffer).toString("base64"));

  });

  it("encode(Uint8Array, {padEnd:false})", () => {
    assert.strictEqual(Base64.encode(Uint8Array.of(), {padEnd:false}), "");
    assert.strictEqual(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {padEnd:false}), "AwIBAP/+/fw");
    assert.strictEqual(Base64.encode(Uint8Array.of(255), {padEnd:false}), "/w");
    assert.strictEqual(Base64.encode(Uint8Array.of(251), {padEnd:false}), "+w");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    assert.strictEqual(Base64.encode(r1, {padEnd:false}), Buffer.from(r1.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(Base64.encode(r2, {padEnd:false}), Buffer.from(r2.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(Base64.encode(r3, {padEnd:false}), Buffer.from(r3.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(Base64.encode(r4, {padEnd:false}), Buffer.from(r4.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(Base64.encode(r5, {padEnd:false}), Buffer.from(r5.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(Base64.encode(r6, {padEnd:false}), Buffer.from(r6.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(Base64.encode(r7, {padEnd:false}), Buffer.from(r7.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(Base64.encode(r8, {padEnd:false}), Buffer.from(r8.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(Base64.encode(r9, {padEnd:false}), Buffer.from(r9.buffer).toString("base64").replace(/=*$/, ""));

  });

  it("encode(Uint8Array, {padding:'!'})", () => {
    assert.strictEqual(Base64.encode(Uint8Array.of(), {padding:'!'}), "");
    assert.strictEqual(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {padding:'!'}), "AwIBAP/+/fw!");
    assert.strictEqual(Base64.encode(Uint8Array.of(255), {padding:'!'}), "/w!!");
    assert.strictEqual(Base64.encode(Uint8Array.of(251), {padding:'!'}), "+w!!");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    assert.strictEqual(Base64.encode(r1, {padding:'!'}), Buffer.from(r1.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(Base64.encode(r2, {padding:'!'}), Buffer.from(r2.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(Base64.encode(r3, {padding:'!'}), Buffer.from(r3.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(Base64.encode(r4, {padding:'!'}), Buffer.from(r4.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(Base64.encode(r5, {padding:'!'}), Buffer.from(r5.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(Base64.encode(r6, {padding:'!'}), Buffer.from(r6.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(Base64.encode(r7, {padding:'!'}), Buffer.from(r7.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(Base64.encode(r8, {padding:'!'}), Buffer.from(r8.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(Base64.encode(r9, {padding:'!'}), Buffer.from(r9.buffer).toString("base64").replace(/=/g, "!"));

  });

  it("encode(Uint8Array, Rfc4648Base64UrlOptions)", () => {
    const op = {
      table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
      padEnd: false,
      padding: "=",
    };

    assert.strictEqual(Base64.encode(Uint8Array.of(), op), "");
    assert.strictEqual(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), op), "AwIBAP_-_fw");
    assert.strictEqual(Base64.encode(Uint8Array.of(255), op), "_w");
    assert.strictEqual(Base64.encode(Uint8Array.of(251), op), "-w");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    assert.strictEqual(Base64.encode(r1, op), Buffer.from(r1.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(Base64.encode(r2, op), Buffer.from(r2.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(Base64.encode(r3, op), Buffer.from(r3.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(Base64.encode(r4, op), Buffer.from(r4.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(Base64.encode(r5, op), Buffer.from(r5.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(Base64.encode(r6, op), Buffer.from(r6.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(Base64.encode(r7, op), Buffer.from(r7.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(Base64.encode(r8, op), Buffer.from(r8.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(Base64.encode(r9, op), Buffer.from(r9.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));

  });

});
