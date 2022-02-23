import { expect } from '@esm-bundle/chai';
import { webcrypto } from "node:crypto";
import { Base64 } from "./base64";

const crypto: Crypto = webcrypto as unknown as Crypto;

describe("Base64.decode", () => {
  it("decode(string)", () => {
    const decoded11 = Base64.decode("");
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    const decoded12 = Base64.decode("AwIBAP/+/fw=");
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    const decoded12b = Base64.decode("AwIBAP/+/fw");
    expect(JSON.stringify([...decoded12b])).to.equal("[3,2,1,0,255,254,253,252]");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const dr1 = Base64.decode(Buffer.from(r1.buffer).toString("base64"));
    expect(JSON.stringify([...dr1])).to.equal(JSON.stringify([...r1]));

    expect(() => {
      Base64.decode("あ");
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("AwIBAP_-_fw=");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("=AwIBAP/+/fw");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("=");
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("AwIBAP/+/fw,");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

  });

  it("decode(string, {padEnd:false})", () => {
    const decoded11 = Base64.decode("", {padEnd:false});
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    const decoded12z = Base64.decode("AwIBAP/+/fw=", {padEnd:false});
    expect(JSON.stringify([...decoded12z])).to.equal("[3,2,1,0,255,254,253,252]");

    const decoded12 = Base64.decode("AwIBAP/+/fw", {padEnd:false});
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    expect(() => {
      Base64.decode("あ", {padEnd:false});
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("AwIBAP_-_fw=", {padEnd:false});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("=AwIBAP/+/fw", {padEnd:false});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("=", {padEnd:false});
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("AwIBAP/+/fw,", {padEnd:false});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

  });

  it("decode(string, {noPadding:true})", () => {
    const decoded12z = Base64.decode("AwIBAP/+/fw=", {noPadding:true});
    expect(JSON.stringify([...decoded12z])).to.equal("[3,2,1,0,255,254,253,252]");

  });

  it("decode(string, {noPadding:false,padEnd:false})", () => {
    const decoded12z = Base64.decode("AwIBAP/+/fw=", {noPadding:false,padEnd:false});
    expect(JSON.stringify([...decoded12z])).to.equal("[3,2,1,0,255,254,253,252]");

  });

  it("decode(string, {noPadding:true,padEnd:true})", () => {
    const decoded12z = Base64.decode("AwIBAP/+/fw=", {noPadding:true,padEnd:true});
    expect(JSON.stringify([...decoded12z])).to.equal("[3,2,1,0,255,254,253,252]");

  });

  it("decode(string, {padding:'!'})", () => {
    const decoded11 = Base64.decode("", {padding:'!'});
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    const decoded12 = Base64.decode("AwIBAP/+/fw!", {padding:'!'});
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    expect(() => {
      Base64.decode("AwIBAP/+/fw=", {padding:'!'});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    const decoded12z = Base64.decode("AwIBAP/+/fw", {padding:'!'});
    expect(JSON.stringify([...decoded12z])).to.equal("[3,2,1,0,255,254,253,252]");

    expect(() => {
      Base64.decode("あ", {padding:'!'});
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("AwIBAP_-_fw!", {padding:'!'});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("=AwIBAP/+/fw", {padding:'!'});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("!", {padding:'!'});
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("AwIBAP/+/fw,", {padding:'!'});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

  });

  it("decode(string, {paddingChar:'!'})", () => {
    const decoded12 = Base64.decode("AwIBAP/+/fw!", {paddingChar:'!'});
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

  });

  it("decode(string, {paddingChar:'!',padding:'-'})", () => {
    const decoded12 = Base64.decode("AwIBAP/+/fw!", {paddingChar:'!',padding:'-'});
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

  });

  it("decode(string, Rfc4648Base64UrlOptions)", () => {
    const op = {
      table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
      noPadding: true,
      paddingChar: "=",
    };

    const decoded11 = Base64.decode("", op);
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    expect(() => {
      const opx = {
        table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
        noPadding: true,
        paddingChar: "A",
      };
      Base64.decode("AwIBAP/+/fw=", opx);
    }).to.throw(RangeError, "options error: character duplicated").with.property("name", "RangeError");

    expect(() => {
      Base64.decode("AwIBAP/+/fw=", op);
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("AwIBAP/+/fw", op);
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("あ", op);
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    const decoded12 = Base64.decode("AwIBAP_-_fw=", op);
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    const decoded12b = Base64.decode("AwIBAP_-_fw", op);
    expect(JSON.stringify([...decoded12b])).to.equal("[3,2,1,0,255,254,253,252]");

    expect(() => {
      Base64.decode("=AwIBAP_-_fw", op);
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("=", op);
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("AwIBAP_-_fw,", op);
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

  });

});

describe("Base64.encode", () => {
  it("encode(Uint8Array)", () => {
    expect(Base64.encode(Uint8Array.of())).to.equal("");
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).to.equal("AwIBAP/+/fw=");
    expect(Base64.encode(Uint8Array.of(255))).to.equal("/w==");
    expect(Base64.encode(Uint8Array.of(251))).to.equal("+w==");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(Base64.encode(r1)).to.equal(Buffer.from(r1.buffer).toString("base64"));
    expect(Base64.encode(r2)).to.equal(Buffer.from(r2.buffer).toString("base64"));
    expect(Base64.encode(r3)).to.equal(Buffer.from(r3.buffer).toString("base64"));
    expect(Base64.encode(r4)).to.equal(Buffer.from(r4.buffer).toString("base64"));
    expect(Base64.encode(r5)).to.equal(Buffer.from(r5.buffer).toString("base64"));
    expect(Base64.encode(r6)).to.equal(Buffer.from(r6.buffer).toString("base64"));
    expect(Base64.encode(r7)).to.equal(Buffer.from(r7.buffer).toString("base64"));
    expect(Base64.encode(r8)).to.equal(Buffer.from(r8.buffer).toString("base64"));
    expect(Base64.encode(r9)).to.equal(Buffer.from(r9.buffer).toString("base64"));

  });

  it("encode(Uint8Array, {padEnd:false})", () => {
    expect(Base64.encode(Uint8Array.of(), {padEnd:false})).to.equal("");
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {padEnd:false})).to.equal("AwIBAP/+/fw");
    expect(Base64.encode(Uint8Array.of(255), {padEnd:false})).to.equal("/w");
    expect(Base64.encode(Uint8Array.of(251), {padEnd:false})).to.equal("+w");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(Base64.encode(r1, {padEnd:false})).to.equal(Buffer.from(r1.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r2, {padEnd:false})).to.equal(Buffer.from(r2.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r3, {padEnd:false})).to.equal(Buffer.from(r3.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r4, {padEnd:false})).to.equal(Buffer.from(r4.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r5, {padEnd:false})).to.equal(Buffer.from(r5.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r6, {padEnd:false})).to.equal(Buffer.from(r6.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r7, {padEnd:false})).to.equal(Buffer.from(r7.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r8, {padEnd:false})).to.equal(Buffer.from(r8.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r9, {padEnd:false})).to.equal(Buffer.from(r9.buffer).toString("base64").replace(/=*$/, ""));

  });

  it("encode(Uint8Array, {noPadding:true})", () => {
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {noPadding:true})).to.equal("AwIBAP/+/fw");

  });

  it("encode(Uint8Array, {noPadding:true,padEnd:true})", () => {
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {noPadding:true,padEnd:true})).to.equal("AwIBAP/+/fw");

  });

  it("encode(Uint8Array, {noPadding:false,padEnd:false})", () => {
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {noPadding:false,padEnd:false})).to.equal("AwIBAP/+/fw=");

  });

  it("encode(Uint8Array, {padEnd:1})", () => {
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {padEnd:1 as unknown as boolean})).to.equal("AwIBAP/+/fw=");

  });

  it("encode(Uint8Array, {padding:'!'})", () => {
    expect(Base64.encode(Uint8Array.of(), {padding:'!'})).to.equal("");
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {padding:'!'})).to.equal("AwIBAP/+/fw!");
    expect(Base64.encode(Uint8Array.of(255), {padding:'!'})).to.equal("/w!!");
    expect(Base64.encode(Uint8Array.of(251), {padding:'!'})).to.equal("+w!!");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(Base64.encode(r1, {padding:'!'})).to.equal(Buffer.from(r1.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r2, {padding:'!'})).to.equal(Buffer.from(r2.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r3, {padding:'!'})).to.equal(Buffer.from(r3.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r4, {padding:'!'})).to.equal(Buffer.from(r4.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r5, {padding:'!'})).to.equal(Buffer.from(r5.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r6, {padding:'!'})).to.equal(Buffer.from(r6.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r7, {padding:'!'})).to.equal(Buffer.from(r7.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r8, {padding:'!'})).to.equal(Buffer.from(r8.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r9, {padding:'!'})).to.equal(Buffer.from(r9.buffer).toString("base64").replace(/=/g, "!"));

  });

  it("encode(Uint8Array, {paddingChar:'!'})", () => {
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {paddingChar:'!'})).to.equal("AwIBAP/+/fw!");

  });

  it("encode(Uint8Array, {padding:'!!'})", () => {
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {padding:'!!'})).to.equal("AwIBAP/+/fw=");

  });

  it("encode(Uint8Array, {paddingChar:'!',padding:'-'})", () => {
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {paddingChar:'!',padding:'-'})).to.equal("AwIBAP/+/fw!");

  });

  it("encode(Uint8Array, {paddingChar:'!!',padding:'-'})", () => {
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {paddingChar:'!!',padding:'-'})).to.equal("AwIBAP/+/fw=");

  });

  it("encode(Uint8Array, Rfc4648Base64UrlOptions)", () => {
    const op = {
      table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
      noPadding: true,
      paddingChar: "=",
    };

    expect(Base64.encode(Uint8Array.of(), op)).to.equal("");
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), op)).to.equal("AwIBAP_-_fw");
    expect(Base64.encode(Uint8Array.of(255), op)).to.equal("_w");
    expect(Base64.encode(Uint8Array.of(251), op)).to.equal("-w");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(Base64.encode(r1, op)).to.equal(Buffer.from(r1.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r2, op)).to.equal(Buffer.from(r2.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r3, op)).to.equal(Buffer.from(r3.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r4, op)).to.equal(Buffer.from(r4.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r5, op)).to.equal(Buffer.from(r5.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r6, op)).to.equal(Buffer.from(r6.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r7, op)).to.equal(Buffer.from(r7.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r8, op)).to.equal(Buffer.from(r8.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r9, op)).to.equal(Buffer.from(r9.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));

  });

});
