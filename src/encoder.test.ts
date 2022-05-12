import { expect } from '@esm-bundle/chai';
import { webcrypto } from "node:crypto";
import { Base64 } from "./index";

const crypto: Crypto = webcrypto as unknown as Crypto;

describe("Base64.Encoder.prototype.encode", () => {
  it("Base64.Encoder()/encode", () => {
    const encoder = new Base64.Encoder();

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).to.equal("AwIBAP/+/fw=");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("/w==");
    expect(encoder.encode(Uint8Array.of(251))).to.equal("+w==");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(encoder.encode(r1)).to.equal(Buffer.from(r1.buffer).toString("base64"));
    expect(encoder.encode(r2)).to.equal(Buffer.from(r2.buffer).toString("base64"));
    expect(encoder.encode(r3)).to.equal(Buffer.from(r3.buffer).toString("base64"));
    expect(encoder.encode(r4)).to.equal(Buffer.from(r4.buffer).toString("base64"));
    expect(encoder.encode(r5)).to.equal(Buffer.from(r5.buffer).toString("base64"));
    expect(encoder.encode(r6)).to.equal(Buffer.from(r6.buffer).toString("base64"));
    expect(encoder.encode(r7)).to.equal(Buffer.from(r7.buffer).toString("base64"));
    expect(encoder.encode(r8)).to.equal(Buffer.from(r8.buffer).toString("base64"));
    expect(encoder.encode(r9)).to.equal(Buffer.from(r9.buffer).toString("base64"));

  });

  it("Base64.Encoder({noPadding:true})/encode", () => {
    const encoder = new Base64.Encoder({noPadding:true});

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).to.equal("AwIBAP/+/fw");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("/w");
    expect(encoder.encode(Uint8Array.of(251))).to.equal("+w");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(encoder.encode(r1)).to.equal(Buffer.from(r1.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r2)).to.equal(Buffer.from(r2.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r3)).to.equal(Buffer.from(r3.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r4)).to.equal(Buffer.from(r4.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r5)).to.equal(Buffer.from(r5.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r6)).to.equal(Buffer.from(r6.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r7)).to.equal(Buffer.from(r7.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r8)).to.equal(Buffer.from(r8.buffer).toString("base64").replace(/=*$/, ""));
    expect(encoder.encode(r9)).to.equal(Buffer.from(r9.buffer).toString("base64").replace(/=*$/, ""));

  });

  //it("Base64.Encoder({forgiving:false,paddingChar:'!'})/encode", () => {
  it("Base64.Encoder({paddingChar:'!'})/encode", () => {
    const encoder = new Base64.Encoder({paddingChar:'!'});

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).to.equal("AwIBAP/+/fw!");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("/w!!");
    expect(encoder.encode(Uint8Array.of(251))).to.equal("+w!!");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(encoder.encode(r1)).to.equal(Buffer.from(r1.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r2)).to.equal(Buffer.from(r2.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r3)).to.equal(Buffer.from(r3.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r4)).to.equal(Buffer.from(r4.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r5)).to.equal(Buffer.from(r5.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r6)).to.equal(Buffer.from(r6.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r7)).to.equal(Buffer.from(r7.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r8)).to.equal(Buffer.from(r8.buffer).toString("base64").replace(/=/g, "!"));
    expect(encoder.encode(r9)).to.equal(Buffer.from(r9.buffer).toString("base64").replace(/=/g, "!"));

  });

  it("Base64.Encoder(Rfc4648Base64UrlOptions)/encode", () => {
    const encoder = new Base64.Encoder({
      table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
      noPadding: true,
      paddingChar: "=",
    });

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).to.equal("AwIBAP_-_fw");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("_w");
    expect(encoder.encode(Uint8Array.of(251))).to.equal("-w");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(encoder.encode(r1)).to.equal(Buffer.from(r1.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r2)).to.equal(Buffer.from(r2.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r3)).to.equal(Buffer.from(r3.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r4)).to.equal(Buffer.from(r4.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r5)).to.equal(Buffer.from(r5.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r6)).to.equal(Buffer.from(r6.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r7)).to.equal(Buffer.from(r7.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r8)).to.equal(Buffer.from(r8.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(encoder.encode(r9)).to.equal(Buffer.from(r9.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));

  });

});

describe("Base64.Encoder.get", () => {
  it("get()", () => {
    const encoder = Base64.Encoder.get();

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).to.equal("AwIBAP/+/fw=");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("/w==");
    expect(encoder.encode(Uint8Array.of(251))).to.equal("+w==");

  });

  // it("get(Object)", () => {
  //   const encoder1 = Base64.Encoder.get({noPadding:false});
  //   const encoder2 = Base64.Encoder.get({noPadding:true});
  //   expect(encoder1).to.not.equal(encoder2);

  //   const encoder21 = Base64.Encoder.get({noPadding:true});
  //   const encoder22 = Base64.Encoder.get({noPadding:true});
  //   expect(encoder21).to.equal(encoder22);

  // });

});
