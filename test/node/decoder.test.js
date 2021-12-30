import assert from "node:assert";
import { Base64Decoder, Base64 } from "../../node/index.mjs";

describe("Base64Decoder.prototype.decode", () => {
  it("Base64Decoder()/decode", () => {
    const decoder = new Base64Decoder();

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = decoder.decode("AwIBAP/+/fw=");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded12b = decoder.decode("AwIBAP/+/fw");
    assert.strictEqual(JSON.stringify([...decoded12b]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      decoder.decode("あ");
    }, {
      name: "TypeError",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP_-_fw=");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=AwIBAP/+/fw");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=");
    }, {
      name: "TypeError",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw,");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

  });

  //it("Base64Decoder({forgiving:false,padEnd:false})/decode", () => {
  it("Base64Decoder({padEnd:false})/decode", () => {
    const decoder = new Base64Decoder({padEnd:false});

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    // assert.throws(() => {
    //   decoder.decode("AwIBAP/+/fw=");
    // }, {
    //   message: "decode error (1)",
    // });
    const decoded12z = decoder.decode("AwIBAP/+/fw=");
    assert.strictEqual(JSON.stringify([...decoded12z]), "[3,2,1,0,255,254,253,252]");

    const decoded12 = decoder.decode("AwIBAP/+/fw");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      decoder.decode("あ");
    }, {
      name: "TypeError",
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP_-_fw=");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=AwIBAP/+/fw");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=");
    }, {
      name: "TypeError",
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw,");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

  });

  //it("Base64Decoder({forgiving:false,padding:'!'})/decode", () => {
  it("Base64Decoder({padding:'!'})/decode", () => {
    const decoder = new Base64Decoder({padding:'!'});

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = decoder.decode("AwIBAP/+/fw!");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw=");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    // assert.throws(() => {
    //   decoder.decode("AwIBAP/+/fw");
    // }, {
    //   message: "decode error (2)",
    // });
    const decoded12z = decoder.decode("AwIBAP/+/fw");
    assert.strictEqual(JSON.stringify([...decoded12z]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      decoder.decode("あ");
    }, {
      name: "TypeError",
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP_-_fw!");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=AwIBAP/+/fw");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("!");
    }, {
      name: "TypeError",
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw,");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

  });

  it("Base64Decoder(Rfc4648Base64UrlOptions)/decode", () => {
    const decoder = new Base64Decoder({
      table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
      padEnd: false,
      padding: "=",
    });

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw=");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("あ");
    }, {
      name: "TypeError",
      message: "forgiving decode error",
    });

    const decoded12 = decoder.decode("AwIBAP_-_fw=");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded12b = decoder.decode("AwIBAP_-_fw");
    assert.strictEqual(JSON.stringify([...decoded12b]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      decoder.decode("=AwIBAP_-_fw");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=");
    }, {
      name: "TypeError",
      message: "forgiving decode error",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP_-_fw,");
    }, {
      name: "TypeError",
      message: "decode error (1)",
    });

  });

});

describe("Base64Decoder.get", () => {
  it("get()", () => {
    const decoder = Base64Decoder.get();

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = decoder.decode("AwIBAP/+/fw=");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded12b = decoder.decode("AwIBAP/+/fw");
    assert.strictEqual(JSON.stringify([...decoded12b]), "[3,2,1,0,255,254,253,252]");

  });

  it("get(Object)", () => {
    const decoder1 = Base64Decoder.get({padEnd:false});
    const decoder2 = Base64Decoder.get({padEnd:false});
    assert.notStrictEqual(decoder1, decoder2);

    const op = Base64.resolveOptions({padEnd:false});
    const decoder21 = Base64Decoder.get(op);
    const decoder22 = Base64Decoder.get(op);
    assert.strictEqual(decoder21, decoder22);

  });

});
