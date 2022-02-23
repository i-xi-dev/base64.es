import { expect } from '@esm-bundle/chai';
import { Base64Encoder } from "../../dist/index.js";

describe("Base64Encoder.prototype.encode", () => {
  it("Base64Encoder()/encode", () => {
    const encoder = new Base64Encoder();

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).to.equal("AwIBAP/+/fw=");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("/w==");
    expect(encoder.encode(Uint8Array.of(251))).to.equal("+w==");

  });

  it("Base64Encoder({padEnd:false})/encode", () => {
    const encoder = new Base64Encoder({padEnd:false});

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).to.equal("AwIBAP/+/fw");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("/w");
    expect(encoder.encode(Uint8Array.of(251))).to.equal("+w");

  });

  //it("Base64Encoder({forgiving:false,padding:'!'})/encode", () => {
  it("Base64Encoder({padding:'!'})/encode", () => {
    const encoder = new Base64Encoder({padding:'!'});

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).to.equal("AwIBAP/+/fw!");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("/w!!");
    expect(encoder.encode(Uint8Array.of(251))).to.equal("+w!!");

  });

  it("Base64Encoder(Rfc4648Base64UrlOptions)/encode", () => {
    const encoder = new Base64Encoder({
      table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
      padEnd: false,
      padding: "=",
    });

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).to.equal("AwIBAP_-_fw");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("_w");
    expect(encoder.encode(Uint8Array.of(251))).to.equal("-w");

  });

});

describe("Base64Encoder.get", () => {
  it("get()", () => {
    const encoder = Base64Encoder.get();

    expect(encoder.encode(Uint8Array.of())).to.equal("");
    expect(encoder.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).to.equal("AwIBAP/+/fw=");
    expect(encoder.encode(Uint8Array.of(255))).to.equal("/w==");
    expect(encoder.encode(Uint8Array.of(251))).to.equal("+w==");

  });

  it("get(Object)", () => {
    const encoder1 = Base64Encoder.get({padEnd:true});
    const encoder2 = Base64Encoder.get({padEnd:false});
    expect(encoder1).to.not.equal(encoder2);

    const encoder21 = Base64Encoder.get({padEnd:false});
    const encoder22 = Base64Encoder.get({padEnd:false});
    expect(encoder21).to.equal(encoder22);

  });

});
