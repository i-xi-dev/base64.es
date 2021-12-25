import { Base64 } from "./base64";

describe("Base64.decode", () => {
  it("decode(string)", () => {
    const decoded11 = Base64.decode("");
    expect(JSON.stringify([...decoded11])).toBe("[]");

    const decoded12 = Base64.decode("AwIBAP/+/fw=");
    expect(JSON.stringify([...decoded12])).toBe("[3,2,1,0,255,254,253,252]");

    const decoded12b = Base64.decode("AwIBAP/+/fw");
    expect(JSON.stringify([...decoded12b])).toBe("[3,2,1,0,255,254,253,252]");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const dr1 = Base64.decode(Buffer.from(r1.buffer).toString("base64"));
    expect(JSON.stringify([...dr1])).toBe(JSON.stringify([...r1]));

    expect(() => {
      Base64.decode("あ");
    }).toThrowError({
      name: "TypeError",
      message: "forgiving decode error",
    });

    expect(() => {
      Base64.decode("AwIBAP_-_fw=");
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

    expect(() => {
      Base64.decode("=AwIBAP/+/fw");
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

    expect(() => {
      Base64.decode("=");
    }).toThrowError({
      name: "TypeError",
      message: "forgiving decode error",
    });

    expect(() => {
      Base64.decode("AwIBAP/+/fw,");
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

  });

  it("decode(string, {padEnd:false})", () => {
    const decoded11 = Base64.decode("", {padEnd:false});
    expect(JSON.stringify([...decoded11])).toBe("[]");

    const decoded12z = Base64.decode("AwIBAP/+/fw=", {padEnd:false});
    expect(JSON.stringify([...decoded12z])).toBe("[3,2,1,0,255,254,253,252]");

    const decoded12 = Base64.decode("AwIBAP/+/fw", {padEnd:false});
    expect(JSON.stringify([...decoded12])).toBe("[3,2,1,0,255,254,253,252]");

    expect(() => {
      Base64.decode("あ", {padEnd:false});
    }).toThrowError({
      name: "TypeError",
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    expect(() => {
      Base64.decode("AwIBAP_-_fw=", {padEnd:false});
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

    expect(() => {
      Base64.decode("=AwIBAP/+/fw", {padEnd:false});
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

    expect(() => {
      Base64.decode("=", {padEnd:false});
    }).toThrowError({
      name: "TypeError",
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    expect(() => {
      Base64.decode("AwIBAP/+/fw,", {padEnd:false});
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

  });

  it("decode(string, {padding:'!'})", () => {
    const decoded11 = Base64.decode("", {padding:'!'});
    expect(JSON.stringify([...decoded11])).toBe("[]");

    const decoded12 = Base64.decode("AwIBAP/+/fw!", {padding:'!'});
    expect(JSON.stringify([...decoded12])).toBe("[3,2,1,0,255,254,253,252]");

    expect(() => {
      Base64.decode("AwIBAP/+/fw=", {padding:'!'});
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

    const decoded12z = Base64.decode("AwIBAP/+/fw", {padding:'!'});
    expect(JSON.stringify([...decoded12z])).toBe("[3,2,1,0,255,254,253,252]");

    expect(() => {
      Base64.decode("あ", {padding:'!'});
    }).toThrowError({
      name: "TypeError",
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    expect(() => {
      Base64.decode("AwIBAP_-_fw!", {padding:'!'});
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

    expect(() => {
      Base64.decode("=AwIBAP/+/fw", {padding:'!'});
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

    expect(() => {
      Base64.decode("!", {padding:'!'});
    }).toThrowError({
      name: "TypeError",
      //message: "decode error (1)",
      message: "forgiving decode error",
    });

    expect(() => {
      Base64.decode("AwIBAP/+/fw,", {padding:'!'});
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

  });

  it("decode(string, Rfc4648Base64UrlOptions)", () => {
    const op = {
      table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
      padEnd: false,
      padding: "=",
    };

    const decoded11 = Base64.decode("", op);
    expect(JSON.stringify([...decoded11])).toBe("[]");

    expect(() => {
      const opx = {
        table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
        padEnd: false,
        padding: "A",
      };
      Base64.decode("AwIBAP/+/fw=", opx);
    }).toThrowError({
      name: "RangeError",
      message: "options error: character duplicated",
    });

    expect(() => {
      Base64.decode("AwIBAP/+/fw=", op);
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

    expect(() => {
      Base64.decode("AwIBAP/+/fw", op);
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

    expect(() => {
      Base64.decode("あ", op);
    }).toThrowError({
      name: "TypeError",
      message: "forgiving decode error",
    });

    const decoded12 = Base64.decode("AwIBAP_-_fw=", op);
    expect(JSON.stringify([...decoded12])).toBe("[3,2,1,0,255,254,253,252]");

    const decoded12b = Base64.decode("AwIBAP_-_fw", op);
    expect(JSON.stringify([...decoded12b])).toBe("[3,2,1,0,255,254,253,252]");

    expect(() => {
      Base64.decode("=AwIBAP_-_fw", op);
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

    expect(() => {
      Base64.decode("=", op);
    }).toThrowError({
      name: "TypeError",
      message: "forgiving decode error",
    });

    expect(() => {
      Base64.decode("AwIBAP_-_fw,", op);
    }).toThrowError({
      name: "TypeError",
      message: "decode error (1)",
    });

  });

});

describe("Base64.encode", () => {
  it("encode(Uint8Array)", () => {
    expect(Base64.encode(Uint8Array.of())).toBe("");
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252))).toBe("AwIBAP/+/fw=");
    expect(Base64.encode(Uint8Array.of(255))).toBe("/w==");
    expect(Base64.encode(Uint8Array.of(251))).toBe("+w==");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(Base64.encode(r1)).toBe(Buffer.from(r1.buffer).toString("base64"));
    expect(Base64.encode(r2)).toBe(Buffer.from(r2.buffer).toString("base64"));
    expect(Base64.encode(r3)).toBe(Buffer.from(r3.buffer).toString("base64"));
    expect(Base64.encode(r4)).toBe(Buffer.from(r4.buffer).toString("base64"));
    expect(Base64.encode(r5)).toBe(Buffer.from(r5.buffer).toString("base64"));
    expect(Base64.encode(r6)).toBe(Buffer.from(r6.buffer).toString("base64"));
    expect(Base64.encode(r7)).toBe(Buffer.from(r7.buffer).toString("base64"));
    expect(Base64.encode(r8)).toBe(Buffer.from(r8.buffer).toString("base64"));
    expect(Base64.encode(r9)).toBe(Buffer.from(r9.buffer).toString("base64"));

  });

  it("encode(Uint8Array, {padEnd:false})", () => {
    expect(Base64.encode(Uint8Array.of(), {padEnd:false})).toBe("");
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {padEnd:false})).toBe("AwIBAP/+/fw");
    expect(Base64.encode(Uint8Array.of(255), {padEnd:false})).toBe("/w");
    expect(Base64.encode(Uint8Array.of(251), {padEnd:false})).toBe("+w");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(Base64.encode(r1, {padEnd:false})).toBe(Buffer.from(r1.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r2, {padEnd:false})).toBe(Buffer.from(r2.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r3, {padEnd:false})).toBe(Buffer.from(r3.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r4, {padEnd:false})).toBe(Buffer.from(r4.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r5, {padEnd:false})).toBe(Buffer.from(r5.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r6, {padEnd:false})).toBe(Buffer.from(r6.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r7, {padEnd:false})).toBe(Buffer.from(r7.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r8, {padEnd:false})).toBe(Buffer.from(r8.buffer).toString("base64").replace(/=*$/, ""));
    expect(Base64.encode(r9, {padEnd:false})).toBe(Buffer.from(r9.buffer).toString("base64").replace(/=*$/, ""));

  });

  it("encode(Uint8Array, {padding:'!'})", () => {
    expect(Base64.encode(Uint8Array.of(), {padding:'!'})).toBe("");
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), {padding:'!'})).toBe("AwIBAP/+/fw!");
    expect(Base64.encode(Uint8Array.of(255), {padding:'!'})).toBe("/w!!");
    expect(Base64.encode(Uint8Array.of(251), {padding:'!'})).toBe("+w!!");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(Base64.encode(r1, {padding:'!'})).toBe(Buffer.from(r1.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r2, {padding:'!'})).toBe(Buffer.from(r2.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r3, {padding:'!'})).toBe(Buffer.from(r3.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r4, {padding:'!'})).toBe(Buffer.from(r4.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r5, {padding:'!'})).toBe(Buffer.from(r5.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r6, {padding:'!'})).toBe(Buffer.from(r6.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r7, {padding:'!'})).toBe(Buffer.from(r7.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r8, {padding:'!'})).toBe(Buffer.from(r8.buffer).toString("base64").replace(/=/g, "!"));
    expect(Base64.encode(r9, {padding:'!'})).toBe(Buffer.from(r9.buffer).toString("base64").replace(/=/g, "!"));

  });

  it("encode(Uint8Array, Rfc4648Base64UrlOptions)", () => {
    const op = {
      table: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"],
      padEnd: false,
      padding: "=",
    };

    expect(Base64.encode(Uint8Array.of(), op)).toBe("");
    expect(Base64.encode(Uint8Array.of(3,2,1,0,255,254,253,252), op)).toBe("AwIBAP_-_fw");
    expect(Base64.encode(Uint8Array.of(255), op)).toBe("_w");
    expect(Base64.encode(Uint8Array.of(251), op)).toBe("-w");

    const r1 = crypto.getRandomValues(new Uint8Array(256));
    const r2 = crypto.getRandomValues(new Uint8Array(255));
    const r3 = crypto.getRandomValues(new Uint8Array(254));
    const r4 = crypto.getRandomValues(new Uint8Array(253));
    const r5 = crypto.getRandomValues(new Uint8Array(252));
    const r6 = crypto.getRandomValues(new Uint8Array(251));
    const r7 = crypto.getRandomValues(new Uint8Array(250));
    const r8 = crypto.getRandomValues(new Uint8Array(249));
    const r9 = crypto.getRandomValues(new Uint8Array(248));

    expect(Base64.encode(r1, op)).toBe(Buffer.from(r1.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r2, op)).toBe(Buffer.from(r2.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r3, op)).toBe(Buffer.from(r3.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r4, op)).toBe(Buffer.from(r4.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r5, op)).toBe(Buffer.from(r5.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r6, op)).toBe(Buffer.from(r6.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r7, op)).toBe(Buffer.from(r7.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r8, op)).toBe(Buffer.from(r8.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));
    expect(Base64.encode(r9, op)).toBe(Buffer.from(r9.buffer).toString("base64").replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_"));

  });

});
