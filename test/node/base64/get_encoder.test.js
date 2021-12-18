import { webcrypto } from "node:crypto";
import assert from "node:assert";
import { Base64 } from "../../../node/index.mjs";

describe("Base64.getEncoder", () => {
  it("getEncoder()", () => {
    const encoder = Base64.getEncoder();

    assert.strictEqual(encoder.encode(Uint8Array.of()), "");
    assert.strictEqual(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252)), "AwIBAP/+/fw=");
    assert.strictEqual(encoder.encode(Uint8Array.of(255)), "/w==");
    assert.strictEqual(encoder.encode(Uint8Array.of(251)), "+w==");

  });

  it("getEncoder(Object)", () => {
    const encoder1 = Base64.getEncoder({padEnd:false});
    const encoder2 = Base64.getEncoder({padEnd:false});
    assert.notStrictEqual(encoder1, encoder2);

    const op = Base64.resolveOptions({padEnd:false});
    const encoder21 = Base64.getEncoder(op);
    const encoder22 = Base64.getEncoder(op);
    assert.strictEqual(encoder21, encoder22);

  });

});
