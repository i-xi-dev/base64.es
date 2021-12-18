import assert from "node:assert";
import { Base64 } from "../../../node/index.mjs";

describe("Base64.decode", () => {
  it("decode(string)", () => {
    const decoded11 = Base64.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = Base64.decode("AwIBAP/+/fw=");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded12b = Base64.decode("AwIBAP/+/fw");
    assert.strictEqual(JSON.stringify([...decoded12b]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      Base64.decode("あ");
    }, {
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP_-_fw=");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("=AwIBAP/+/fw");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("=");
    }, {
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP/+/fw,");
    }, {
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
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP_-_fw=", {padEnd:false});
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("=AwIBAP/+/fw", {padEnd:false});
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("=", {padEnd:false});
    }, {
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP/+/fw,", {padEnd:false});
    }, {
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
      message: "decode error (1)",
    });

    const decoded12z = Base64.decode("AwIBAP/+/fw", {padding:'!'});
    assert.strictEqual(JSON.stringify([...decoded12z]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      Base64.decode("あ", {padding:'!'});
    }, {
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP_-_fw!", {padding:'!'});
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("=AwIBAP/+/fw", {padding:'!'});
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("!", {padding:'!'});
    }, {
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP/+/fw,", {padding:'!'});
    }, {
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
      Base64.decode("AwIBAP/+/fw=", op);
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP/+/fw", op);
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("あ", op);
    }, {
      message: "forgiving decode error",
    });

    const decoded12 = Base64.decode("AwIBAP_-_fw=", op);
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded12b = Base64.decode("AwIBAP_-_fw", op);
    assert.strictEqual(JSON.stringify([...decoded12b]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      Base64.decode("=AwIBAP_-_fw", op);
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      Base64.decode("=", op);
    }, {
      message: "forgiving decode error",
    });

    assert.throws(() => {
      Base64.decode("AwIBAP_-_fw,", op);
    }, {
      message: "decode error (1)",
    });

  });

});
