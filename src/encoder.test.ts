import { Base64Encoder } from "./encoder";
import { Base64 } from "./base64";

describe("Base64Encoder.prototype.encode", () => {
  it("Base64Encoder()/encode", () => {
    const encoder = new Base64Encoder();

    expect(encoder.encode(Uint8Array.of())).toBe("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).toBe("AwIBAP/+/fw=");
    expect(encoder.encode(Uint8Array.of(255))).toBe("/w==");
    expect(encoder.encode(Uint8Array.of(251))).toBe("+w==");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(encoder.encode(r1)).toBe(Buffer.from(r1.buffer).toString("base64"));
    expect(encoder.encode(r2)).toBe(Buffer.from(r2.buffer).toString("base64"));
    expect(encoder.encode(r3)).toBe(Buffer.from(r3.buffer).toString("base64"));
    expect(encoder.encode(r4)).toBe(Buffer.from(r4.buffer).toString("base64"));
    expect(encoder.encode(r5)).toBe(Buffer.from(r5.buffer).toString("base64"));
    expect(encoder.encode(r6)).toBe(Buffer.from(r6.buffer).toString("base64"));
    expect(encoder.encode(r7)).toBe(Buffer.from(r7.buffer).toString("base64"));
    expect(encoder.encode(r8)).toBe(Buffer.from(r8.buffer).toString("base64"));
    expect(encoder.encode(r9)).toBe(Buffer.from(r9.buffer).toString("base64"));

  });

  // it("Base64Encoder({forgiving:false})/encode", () => {
  //   const encoder = new Base64Encoder({forgiving:false});

  //   assert.strictEqual(encoder.encode(Uint8Array.of()), "");
  //   assert.strictEqual(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252)), "AwIBAP/+/fw=");
  //   assert.strictEqual(encoder.encode(Uint8Array.of(255)), "/w==");
  //   assert.strictEqual(encoder.encode(Uint8Array.of(251)), "+w==");

  //   const r1 = crypto.getRandomValues(new Uint8Array(256));
  //   const r2 = crypto.getRandomValues(new Uint8Array(255));
  //   const r3 = crypto.getRandomValues(new Uint8Array(254));
  //   const r4 = crypto.getRandomValues(new Uint8Array(253));
  //   const r5 = crypto.getRandomValues(new Uint8Array(252));
  //   const r6 = crypto.getRandomValues(new Uint8Array(251));
  //   const r7 = crypto.getRandomValues(new Uint8Array(250));
  //   const r8 = crypto.getRandomValues(new Uint8Array(249));
  //   const r9 = crypto.getRandomValues(new Uint8Array(248));

  //   assert.strictEqual(encoder.encode(r1), Buffer.from(r1.buffer).toString("base64"));
  //   assert.strictEqual(encoder.encode(r2), Buffer.from(r2.buffer).toString("base64"));
  //   assert.strictEqual(encoder.encode(r3), Buffer.from(r3.buffer).toString("base64"));
  //   assert.strictEqual(encoder.encode(r4), Buffer.from(r4.buffer).toString("base64"));
  //   assert.strictEqual(encoder.encode(r5), Buffer.from(r5.buffer).toString("base64"));
  //   assert.strictEqual(encoder.encode(r6), Buffer.from(r6.buffer).toString("base64"));
  //   assert.strictEqual(encoder.encode(r7), Buffer.from(r7.buffer).toString("base64"));
  //   assert.strictEqual(encoder.encode(r8), Buffer.from(r8.buffer).toString("base64"));
  //   assert.strictEqual(encoder.encode(r9), Buffer.from(r9.buffer).toString("base64"));

  // });

  //it("Base64Encoder({forgiving:false,padEnd:false})/encode", () => {
  it("Base64Encoder({padEnd:false})/encode", () => {
    const encoder = new Base64Encoder({padEnd:false});

    expect(encoder.encode(Uint8Array.of())).toBe("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).toBe("AwIBAP/+/fw");
    expect(encoder.encode(Uint8Array.of(255))).toBe("/w");
    expect(encoder.encode(Uint8Array.of(251))).toBe("+w");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(encoder.encode(r1)).toBe(Buffer.from(r1.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r2)).toBe(Buffer.from(r2.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r3)).toBe(Buffer.from(r3.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r4)).toBe(Buffer.from(r4.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r5)).toBe(Buffer.from(r5.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r6)).toBe(Buffer.from(r6.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r7)).toBe(Buffer.from(r7.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r8)).toBe(Buffer.from(r8.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r9)).toBe(Buffer.from(r9.buffer).toString("base64").replace(/=*$/, ""));

  });

  //it("Base64Encoder({forgiving:false,padding:'!'})/encode", () => {
  it("Base64Encoder({padding:'!'})/encode", () => {
    const encoder = new Base64Encoder({padding:'!'});

    expect(encoder.encode(Uint8Array.of())).toBe("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).toBe("AwIBAP/+/fw!");
    expect(encoder.encode(Uint8Array.of(255))).toBe("/w!!");
    expect(encoder.encode(Uint8Array.of(251))).toBe("+w!!");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(encoder.encode(r1)).toBe(Buffer.from(r1.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r2)).toBe(Buffer.from(r2.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r3)).toBe(Buffer.from(r3.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r4)).toBe(Buffer.from(r4.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r5)).toBe(Buffer.from(r5.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r6)).toBe(Buffer.from(r6.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r7)).toBe(Buffer.from(r7.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r8)).toBe(Buffer.from(r8.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r9)).toBe(Buffer.from(r9.buffer).toString("base64").replace(/=/g, "!"));

  });

  it("Base64Encoder(Rfc4648Base64UrlOptions)/encode", () => {
    const encoder = new Base64Encoder({
      table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
      padEnd: false,
      padding: "=",
    });

    expect(encoder.encode(Uint8Array.of())).toBe("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).toBe("AwIBAP_-_fw");
    expect(encoder.encode(Uint8Array.of(255))).toBe("_w");
    expect(encoder.encode(Uint8Array.of(251))).toBe("-w");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(encoder.encode(r1)).toBe(Buffer.from(r1.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r2)).toBe(Buffer.from(r2.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r3)).toBe(Buffer.from(r3.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r4)).toBe(Buffer.from(r4.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r5)).toBe(Buffer.from(r5.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r6)).toBe(Buffer.from(r6.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r7)).toBe(Buffer.from(r7.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r8)).toBe(Buffer.from(r8.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r9)).toBe(Buffer.from(r9.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));

  });

});

describe("Base64Encoder.get", () => {
  it("get()", () => {
    const encoder = Base64Encoder.get();

    expect(encoder.encode(Uint8Array.of())).toBe("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).toBe("AwIBAP/+/fw=");
    expect(encoder.encode(Uint8Array.of(255))).toBe("/w==");
    expect(encoder.encode(Uint8Array.of(251))).toBe("+w==");

  });

  it("get(Object)", () => {
    const encoder1 = Base64Encoder.get({padEnd:false});
    const encoder2 = Base64Encoder.get({padEnd:false});
    expect(encoder1).not.toBe(encoder2);

    const op = Base64.resolveOptions({padEnd:false});
    const encoder21 = Base64Encoder.get(op);
    const encoder22 = Base64Encoder.get(op);
    expect(encoder21).toBe(encoder21);

  });

});