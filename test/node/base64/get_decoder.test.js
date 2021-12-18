import assert from "node:assert";
import { Base64 } from "../../../node/index.mjs";

describe("Base64.getDecoder", () => {
  it("getDecoder()", () => {
    const decoder = Base64.getDecoder();

    const decoded11 = decoder.decode("");
    assert.strictEqual(JSON.stringify([...decoded11]), "[]");

    const decoded12 = decoder.decode("AwIBAP/+/fw=");
    assert.strictEqual(JSON.stringify([...decoded12]), "[3,2,1,0,255,254,253,252]");

    const decoded12b = decoder.decode("AwIBAP/+/fw");
    assert.strictEqual(JSON.stringify([...decoded12b]), "[3,2,1,0,255,254,253,252]");

  });

  it("getDecoder(Object)", () => {
    const decoder1 = Base64.getDecoder({padEnd:false});
    const decoder2 = Base64.getDecoder({padEnd:false});
    assert.notStrictEqual(decoder1, decoder2);

    const op = Base64.resolveOptions({padEnd:false});
    const decoder21 = Base64.getDecoder(op);
    const decoder22 = Base64.getDecoder(op);
    assert.strictEqual(decoder21, decoder22);

  });

});

