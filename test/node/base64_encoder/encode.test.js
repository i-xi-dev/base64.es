import { webcrypto } from "node:crypto";
import assert from "node:assert";
import { Base64Encoder, Rfc4648Base64UrlOptions } from "../../../node/index.mjs";

describe("Base64Encoder.prototype.encode", () => {
  it("Base64Encoder()/encode", () => {
    const encoder = new Base64Encoder();

    assert.strictEqual(encoder.encode(Uint8Array.of()), "");
    assert.strictEqual(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252)), "AwIBAP/+/fw=");
    assert.strictEqual(encoder.encode(Uint8Array.of(255)), "/w==");
    assert.strictEqual(encoder.encode(Uint8Array.of(251)), "+w==");

    const r1 = webcrypto.getRandomValues(new Uint8Array(256));
    const r2 = webcrypto.getRandomValues(new Uint8Array(255));
    const r3 = webcrypto.getRandomValues(new Uint8Array(254));
    const r4 = webcrypto.getRandomValues(new Uint8Array(253));
    const r5 = webcrypto.getRandomValues(new Uint8Array(252));
    const r6 = webcrypto.getRandomValues(new Uint8Array(251));
    const r7 = webcrypto.getRandomValues(new Uint8Array(250));
    const r8 = webcrypto.getRandomValues(new Uint8Array(249));
    const r9 = webcrypto.getRandomValues(new Uint8Array(248));

    assert.strictEqual(encoder.encode(r1), Buffer.from(r1.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r2), Buffer.from(r2.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r3), Buffer.from(r3.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r4), Buffer.from(r4.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r5), Buffer.from(r5.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r6), Buffer.from(r6.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r7), Buffer.from(r7.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r8), Buffer.from(r8.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r9), Buffer.from(r9.buffer).toString("base64"));

  });

  it("Base64Encoder({forgiving:false})/encode", () => {
    const encoder = new Base64Encoder({forgiving:false});

    assert.strictEqual(encoder.encode(Uint8Array.of()), "");
    assert.strictEqual(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252)), "AwIBAP/+/fw=");
    assert.strictEqual(encoder.encode(Uint8Array.of(255)), "/w==");
    assert.strictEqual(encoder.encode(Uint8Array.of(251)), "+w==");

    const r1 = webcrypto.getRandomValues(new Uint8Array(256));
    const r2 = webcrypto.getRandomValues(new Uint8Array(255));
    const r3 = webcrypto.getRandomValues(new Uint8Array(254));
    const r4 = webcrypto.getRandomValues(new Uint8Array(253));
    const r5 = webcrypto.getRandomValues(new Uint8Array(252));
    const r6 = webcrypto.getRandomValues(new Uint8Array(251));
    const r7 = webcrypto.getRandomValues(new Uint8Array(250));
    const r8 = webcrypto.getRandomValues(new Uint8Array(249));
    const r9 = webcrypto.getRandomValues(new Uint8Array(248));

    assert.strictEqual(encoder.encode(r1), Buffer.from(r1.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r2), Buffer.from(r2.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r3), Buffer.from(r3.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r4), Buffer.from(r4.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r5), Buffer.from(r5.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r6), Buffer.from(r6.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r7), Buffer.from(r7.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r8), Buffer.from(r8.buffer).toString("base64"));
    assert.strictEqual(encoder.encode(r9), Buffer.from(r9.buffer).toString("base64"));

  });

  it("Base64Encoder({forgiving:false,padEnd:false})/encode", () => {
    const encoder = new Base64Encoder({forgiving:false,padEnd:false});

    assert.strictEqual(encoder.encode(Uint8Array.of()), "");
    assert.strictEqual(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252)), "AwIBAP/+/fw");
    assert.strictEqual(encoder.encode(Uint8Array.of(255)), "/w");
    assert.strictEqual(encoder.encode(Uint8Array.of(251)), "+w");

    const r1 = webcrypto.getRandomValues(new Uint8Array(256));
    const r2 = webcrypto.getRandomValues(new Uint8Array(255));
    const r3 = webcrypto.getRandomValues(new Uint8Array(254));
    const r4 = webcrypto.getRandomValues(new Uint8Array(253));
    const r5 = webcrypto.getRandomValues(new Uint8Array(252));
    const r6 = webcrypto.getRandomValues(new Uint8Array(251));
    const r7 = webcrypto.getRandomValues(new Uint8Array(250));
    const r8 = webcrypto.getRandomValues(new Uint8Array(249));
    const r9 = webcrypto.getRandomValues(new Uint8Array(248));

    assert.strictEqual(encoder.encode(r1), Buffer.from(r1.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(encoder.encode(r2), Buffer.from(r2.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(encoder.encode(r3), Buffer.from(r3.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(encoder.encode(r4), Buffer.from(r4.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(encoder.encode(r5), Buffer.from(r5.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(encoder.encode(r6), Buffer.from(r6.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(encoder.encode(r7), Buffer.from(r7.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(encoder.encode(r8), Buffer.from(r8.buffer).toString("base64").replace(/=*$/, ""));
    assert.strictEqual(encoder.encode(r9), Buffer.from(r9.buffer).toString("base64").replace(/=*$/, ""));

  });

  it("Base64Encoder({forgiving:false,padding:'!'})/encode", () => {
    const encoder = new Base64Encoder({forgiving:false,padding:'!'});

    assert.strictEqual(encoder.encode(Uint8Array.of()), "");
    assert.strictEqual(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252)), "AwIBAP/+/fw!");
    assert.strictEqual(encoder.encode(Uint8Array.of(255)), "/w!!");
    assert.strictEqual(encoder.encode(Uint8Array.of(251)), "+w!!");

    const r1 = webcrypto.getRandomValues(new Uint8Array(256));
    const r2 = webcrypto.getRandomValues(new Uint8Array(255));
    const r3 = webcrypto.getRandomValues(new Uint8Array(254));
    const r4 = webcrypto.getRandomValues(new Uint8Array(253));
    const r5 = webcrypto.getRandomValues(new Uint8Array(252));
    const r6 = webcrypto.getRandomValues(new Uint8Array(251));
    const r7 = webcrypto.getRandomValues(new Uint8Array(250));
    const r8 = webcrypto.getRandomValues(new Uint8Array(249));
    const r9 = webcrypto.getRandomValues(new Uint8Array(248));

    assert.strictEqual(encoder.encode(r1), Buffer.from(r1.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(encoder.encode(r2), Buffer.from(r2.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(encoder.encode(r3), Buffer.from(r3.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(encoder.encode(r4), Buffer.from(r4.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(encoder.encode(r5), Buffer.from(r5.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(encoder.encode(r6), Buffer.from(r6.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(encoder.encode(r7), Buffer.from(r7.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(encoder.encode(r8), Buffer.from(r8.buffer).toString("base64").replace(/=/g, "!"));
    assert.strictEqual(encoder.encode(r9), Buffer.from(r9.buffer).toString("base64").replace(/=/g, "!"));

  });

  it("Base64Encoder(Rfc4648Base64UrlOptions)/encode", () => {
    const encoder = new Base64Encoder(Rfc4648Base64UrlOptions);

    assert.strictEqual(encoder.encode(Uint8Array.of()), "");
    assert.strictEqual(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252)), "AwIBAP_-_fw");
    assert.strictEqual(encoder.encode(Uint8Array.of(255)), "_w");
    assert.strictEqual(encoder.encode(Uint8Array.of(251)), "-w");

    const r1 = webcrypto.getRandomValues(new Uint8Array(256));
    const r2 = webcrypto.getRandomValues(new Uint8Array(255));
    const r3 = webcrypto.getRandomValues(new Uint8Array(254));
    const r4 = webcrypto.getRandomValues(new Uint8Array(253));
    const r5 = webcrypto.getRandomValues(new Uint8Array(252));
    const r6 = webcrypto.getRandomValues(new Uint8Array(251));
    const r7 = webcrypto.getRandomValues(new Uint8Array(250));
    const r8 = webcrypto.getRandomValues(new Uint8Array(249));
    const r9 = webcrypto.getRandomValues(new Uint8Array(248));

    assert.strictEqual(encoder.encode(r1), Buffer.from(r1.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(encoder.encode(r2), Buffer.from(r2.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(encoder.encode(r3), Buffer.from(r3.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(encoder.encode(r4), Buffer.from(r4.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(encoder.encode(r5), Buffer.from(r5.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(encoder.encode(r6), Buffer.from(r6.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(encoder.encode(r7), Buffer.from(r7.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(encoder.encode(r8), Buffer.from(r8.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    assert.strictEqual(encoder.encode(r9), Buffer.from(r9.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));

  });

});
