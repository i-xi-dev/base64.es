import assert from "node:assert";
import { Base64Decoder, Rfc4648Base64UrlOptions } from "../../../node/index.mjs";

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
      message: "forgiving decode error",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP_-_fw=");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=AwIBAP/+/fw");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=");
    }, {
      message: "forgiving decode error",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw,");
    }, {
      message: "decode error (1)",
    });

  });

  it("Base64Decoder({forgiving:false})/decode", () => {
    const decoder = new Base64Decoder({forgiving:false});

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = decoder.decode("AwIBAP/+/fw=");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw");
    }, {
      message: "decode error (2)",
    });

    assert.throws(() => {
      decoder.decode("あ");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP_-_fw=");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=AwIBAP/+/fw");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw,");
    }, {
      message: "decode error (1)",
    });

  });

  it("Base64Decoder({forgiving:false,padEnd:false})/decode", () => {
    const decoder = new Base64Decoder({forgiving:false,padEnd:false});

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw=");
    }, {
      message: "decode error (1)",
    });

    const decoded12 = decoder.decode("AwIBAP/+/fw");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      decoder.decode("あ");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP_-_fw=");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=AwIBAP/+/fw");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw,");
    }, {
      message: "decode error (1)",
    });

  });

  it("Base64Decoder({forgiving:false,padding:'!'})/decode", () => {
    const decoder = new Base64Decoder({forgiving:false,padding:'!'});

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = decoder.decode("AwIBAP/+/fw!");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw=");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw");
    }, {
      message: "decode error (2)",
    });

    assert.throws(() => {
      decoder.decode("あ");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP_-_fw!");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=AwIBAP/+/fw");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("!");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw,");
    }, {
      message: "decode error (1)",
    });

  });

  it("Base64Decoder(Rfc4648Base64UrlOptions)/decode", () => {
    const decoder = new Base64Decoder(Rfc4648Base64UrlOptions);

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw=");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP/+/fw");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("あ");
    }, {
      message: "forgiving decode error",
    });

    const decoded12 = decoder.decode("AwIBAP_-_fw=");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded12b = decoder.decode("AwIBAP_-_fw");
    assert.strictEqual(JSON.stringify([...decoded12b]), "[3,2,1,0,255,254,253,252]");

    assert.throws(() => {
      decoder.decode("=AwIBAP_-_fw");
    }, {
      message: "decode error (1)",
    });

    assert.throws(() => {
      decoder.decode("=");
    }, {
      message: "forgiving decode error",
    });

    assert.throws(() => {
      decoder.decode("AwIBAP_-_fw,");
    }, {
      message: "decode error (1)",
    });

  });

});

