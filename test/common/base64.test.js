import { expect } from '@esm-bundle/chai';
import { Base64 } from "../../dist/index.js";

describe("Base64.decode", () => {
  it("decode(string)", () => {
    const decoded11 = Base64.decode("");
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    const decoded12 = Base64.decode("AwIBAP/+/fw=");
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    const decoded12b = Base64.decode("AwIBAP/+/fw");
    expect(JSON.stringify([...decoded12b])).to.equal("[3,2,1,0,255,254,253,252]");

    // const r1 = crypto.getRandomValues(new Uint8Array(256));
    // const dr1 = Base64.decode(Buffer.from(r1.buffer).toString("base64"));
    // expect(JSON.stringify([...dr1])).to.equal(JSON.stringify([...r1]));

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

  it("decode(string, {noPadding:true})", () => {
    const decoded11 = Base64.decode("", {noPadding:true});
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    const decoded12z = Base64.decode("AwIBAP/+/fw=", {noPadding:true});
    expect(JSON.stringify([...decoded12z])).to.equal("[3,2,1,0,255,254,253,252]");

    const decoded12 = Base64.decode("AwIBAP/+/fw", {noPadding:true});
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    expect(() => {
      Base64.decode("あ", {noPadding:true});
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("AwIBAP_-_fw=", {noPadding:true});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("=AwIBAP/+/fw", {noPadding:true});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("=", {noPadding:true});
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("AwIBAP/+/fw,", {noPadding:true});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

  });

  it("decode(string, {noPadding:true})", () => {
    const decoded12z = Base64.decode("AwIBAP/+/fw=", {noPadding:true});
    expect(JSON.stringify([...decoded12z])).to.equal("[3,2,1,0,255,254,253,252]");

  });

  it("decode(string, {paddingChar:'!'})", () => {
    const decoded11 = Base64.decode("", {paddingChar:'!'});
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    const decoded12 = Base64.decode("AwIBAP/+/fw!", {paddingChar:'!'});
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    expect(() => {
      Base64.decode("AwIBAP/+/fw=", {paddingChar:'!'});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    const decoded12z = Base64.decode("AwIBAP/+/fw", {paddingChar:'!'});
    expect(JSON.stringify([...decoded12z])).to.equal("[3,2,1,0,255,254,253,252]");

    expect(() => {
      Base64.decode("あ", {paddingChar:'!'});
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("AwIBAP_-_fw!", {paddingChar:'!'});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("=AwIBAP/+/fw", {paddingChar:'!'});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("!", {paddingChar:'!'});
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      Base64.decode("AwIBAP/+/fw,", {paddingChar:'!'});
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

  });

  it("decode(string, {paddingChar:'!'})", () => {
    const decoded12 = Base64.decode("AwIBAP/+/fw!", {paddingChar:'!'});
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

  });

  it("encode(Uint8Array, {noPadding:true})", () => {
    expect(Base64.encode(Uint8Array.of(), {noPadding:true})).to.equal("");
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {noPadding:true})).to.equal("AwIBAP/+/fw");
    expect(Base64.encode(Uint8Array.of(255), {noPadding:true})).to.equal("/w");
    expect(Base64.encode(Uint8Array.of(251), {noPadding:true})).to.equal("+w");

  });

  it("encode(Uint8Array, {noPadding:true})", () => {
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {noPadding:true})).to.equal("AwIBAP/+/fw");

  });

  it("encode(Uint8Array, {noPadding:1})", () => {
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {noPadding:1})).to.equal("AwIBAP/+/fw=");

  });

  it("encode(Uint8Array, {paddingChar:'!'})", () => {
    expect(Base64.encode(Uint8Array.of(), {paddingChar:'!'})).to.equal("");
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {paddingChar:'!'})).to.equal("AwIBAP/+/fw!");
    expect(Base64.encode(Uint8Array.of(255), {paddingChar:'!'})).to.equal("/w!!");
    expect(Base64.encode(Uint8Array.of(251), {paddingChar:'!'})).to.equal("+w!!");

  });

  it("encode(Uint8Array, {paddingChar:'!'})", () => {
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {paddingChar:'!'})).to.equal("AwIBAP/+/fw!");

  });

  it("encode(Uint8Array, {paddingChar:'!!'})", () => {
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {paddingChar:'!!'})).to.equal("AwIBAP/+/fw=");

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

  });

});

describe("Base64.Options", () => {
  it("Options[string]", () => {
    const op1 = Base64.Options["rfc4648"];
    const decoded1 = Base64.decode("AwIBAP/+/fw=");
    expect(JSON.stringify([...decoded1])).to.equal("[3,2,1,0,255,254,253,252]");
    const decoded1b = Base64.decode("AwIBAP/+/fw=", op1);
    expect(JSON.stringify([...decoded1b])).to.equal("[3,2,1,0,255,254,253,252]");

    const op2 = Base64.Options["rfc4648url"];
    const decoded2 = Base64.decode("AwIBAP_-_fw", op2);
    expect(JSON.stringify([...decoded2])).to.equal("[3,2,1,0,255,254,253,252]");

    expect(() => {
      Base64.Options = {};
    }).to.throw(TypeError).with.property("name", "TypeError");

    expect(() => {
      Base64.Options["x"] = {};
    }).to.throw(TypeError).with.property("name", "TypeError");

    const opx = Base64.Options["rfc4648"];
    expect(() => {
      opx.table = [];
    }).to.throw(TypeError).with.property("name", "TypeError");
    expect(() => {
      opx.table[0] = "1";
    }).to.throw(TypeError).with.property("name", "TypeError");
    expect(() => {
      opx.noPadding = true;
    }).to.throw(TypeError).with.property("name", "TypeError");
    expect(() => {
      opx.paddingChar = "!";
    }).to.throw(TypeError).with.property("name", "TypeError");

  });

});
