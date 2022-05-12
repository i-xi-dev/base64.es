import { expect } from '@esm-bundle/chai';
import { Base64 } from "../../dist/index.js";

describe("Base64.Decoder.prototype.decode", () => {
  it("Base64.Decoder()/decode", () => {
    const decoder = new Base64.Decoder();

    const decoded11 = decoder.decode("");
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    const decoded12 = decoder.decode("AwIBAP/+/fw=");
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    const decoded12b = decoder.decode("AwIBAP/+/fw");
    expect(JSON.stringify([...decoded12b])).to.equal("[3,2,1,0,255,254,253,252]");

    expect(() => {
      decoder.decode("あ");
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("AwIBAP_-_fw=");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("=AwIBAP/+/fw");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("=");
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("AwIBAP/+/fw,");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

  });

  it("Base64.Decoder({noPadding:true})/decode", () => {
    const decoder = new Base64.Decoder({noPadding:true});

    const decoded11 = decoder.decode("");
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    const decoded12z = decoder.decode("AwIBAP/+/fw=");
    expect(JSON.stringify([...decoded12z])).to.equal("[3,2,1,0,255,254,253,252]");

    const decoded12 = decoder.decode("AwIBAP/+/fw");
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    expect(() => {
      decoder.decode("あ");
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("AwIBAP_-_fw=");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("=AwIBAP/+/fw");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("=");
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("AwIBAP/+/fw,");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

  });

  it("Base64.Decoder({paddingChar:'!'})/decode", () => {
    const decoder = new Base64.Decoder({paddingChar:'!'});

    const decoded11 = decoder.decode("");
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    const decoded12 = decoder.decode("AwIBAP/+/fw!");
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    expect(() => {
      decoder.decode("AwIBAP/+/fw=");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    const decoded12z = decoder.decode("AwIBAP/+/fw");
    expect(JSON.stringify([...decoded12z])).to.equal("[3,2,1,0,255,254,253,252]");

    expect(() => {
      decoder.decode("あ");
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("AwIBAP_-_fw!");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("=AwIBAP/+/fw");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("!");
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("AwIBAP/+/fw,");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

  });

  it("Base64.Decoder(Rfc4648Base64UrlOptions)/decode", () => {
    const decoder = new Base64.Decoder({
      table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
      noPadding: true,
      paddingChar: "=",
    });

    const decoded11 = decoder.decode("");
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    expect(() => {
      decoder.decode("AwIBAP/+/fw=");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("AwIBAP/+/fw");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("あ");
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    const decoded12 = decoder.decode("AwIBAP_-_fw=");
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    const decoded12b = decoder.decode("AwIBAP_-_fw");
    expect(JSON.stringify([...decoded12b])).to.equal("[3,2,1,0,255,254,253,252]");

    expect(() => {
      decoder.decode("=AwIBAP_-_fw");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("=");
    }).to.throw(TypeError, "forgiving decode error").with.property("name", "TypeError");

    expect(() => {
      decoder.decode("AwIBAP_-_fw,");
    }).to.throw(TypeError, "decode error (1)").with.property("name", "TypeError");

  });

});

describe("Base64.Decoder.get", () => {
  it("get()", () => {
    const decoder = Base64.Decoder.get();

    const decoded11 = decoder.decode("");
    expect(JSON.stringify([...decoded11])).to.equal("[]");

    const decoded12 = decoder.decode("AwIBAP/+/fw=");
    expect(JSON.stringify([...decoded12])).to.equal("[3,2,1,0,255,254,253,252]");

    const decoded12b = decoder.decode("AwIBAP/+/fw");
    expect(JSON.stringify([...decoded12b])).to.equal("[3,2,1,0,255,254,253,252]");

  });

  // it("get(Object)", () => {
  //   const decoder1 = Base64.Decoder.get({noPadding:false});
  //   const decoder2 = Base64.Decoder.get({noPadding:true});
  //   expect(decoder1).to.not.equal(decoder2);

  //   const decoder21 = Base64.Decoder.get({noPadding:true});
  //   const decoder22 = Base64.Decoder.get({noPadding:true});
  //   expect(decoder21).to.equal(decoder22);

  // });

});
