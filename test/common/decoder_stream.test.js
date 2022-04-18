import { expect } from '@esm-bundle/chai';
//import { ReadableStream, WritableStream } from "node:stream/web";
import { Base64 } from "../../dist/index.js";

if (globalThis.process) {
  const webStream = await import("node:stream/web");
  globalThis.ReadableStream = webStream.ReadableStream;
  globalThis.WritableStream = webStream.WritableStream;
  globalThis.TransformStream = webStream.TransformStream;
}

describe("Base64.DecoderStream.prototype.writable", () => {
  it("writable", async () => {
    const td = ["AwIBAP/+/fw="];

    let ti;
    const s = new ReadableStream({
      start(controller) {
        let c = 0;
        ti = setInterval(() => {
          if (c >= td.length) {
            clearInterval(ti);
            controller.close();
            return;
          }
          controller.enqueue(td[c]);
          c = c + 1;

        }, 10);
      },
    });

    await (() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 20);
      });
    })();

    const decoder = new Base64.DecoderStream();

    const result = new Uint8Array(10);
    let written = 0;
    const ws = new WritableStream({
      write(chunk) {
        result.set(chunk, written);
        written = written + chunk.byteLength;
      }
    });
    const readable = decoder.readable;
    const writable = decoder.writable;
    await s.pipeThrough({
      readable,
      writable,
    }).pipeTo(ws); 

    const expected = "0x03,0x02,0x01,0x00,0xFF,"
      + "0xFE,0xFD,0xFC,0x00,0x00";

    expect([...result].map(e => "0x" + e.toString(16).toUpperCase().padStart(2, "0")).join(",")).to.equal(expected);

  });

  it("writable", async () => {
    const td = ["AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fw="];

    let ti;
    const s = new ReadableStream({
      start(controller) {
        let c = 0;
        ti = setInterval(() => {
          if (c >= td.length) {
            clearInterval(ti);
            controller.close();
            return;
          }
          controller.enqueue(td[c]);
          c = c + 1;

        }, 10);
      },
    });

    await (() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 20);
      });
    })();

    const decoder = new Base64.DecoderStream();

    const result = new Uint8Array(40);
    let written = 0;
    const ws = new WritableStream({
      write(chunk) {
        result.set(chunk, written);
        written = written + chunk.byteLength;
      }
    });
    const readable = decoder.readable;
    const writable = decoder.writable;
    await s.pipeThrough({
      readable,
      writable,
    }).pipeTo(ws);

    const expected = "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00";

    expect([...result].map(e => "0x" + e.toString(16).toUpperCase().padStart(2, "0")).join(",")).to.equal(expected);

  });

  it("writable", async () => {
    const td = ["A","w","I","B","A","P","/","+","/","f","w","="];

    let ti;
    const s = new ReadableStream({
      start(controller) {
        let c = 0;
        ti = setInterval(() => {
          if (c >= td.length) {
            clearInterval(ti);
            controller.close();
            return;
          }
          controller.enqueue(td[c]);
          c = c + 1;

        }, 10);
      },
    });

    await (() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 300);
      });
    })();

    const decoder = new Base64.DecoderStream();

    const result = new Uint8Array(10);
    let written = 0;
    const ws = new WritableStream({
      write(chunk) {
        result.set(chunk, written);
        written = written + chunk.byteLength;
      }
    });
    const readable = decoder.readable;
    const writable = decoder.writable;
    await s.pipeThrough({
      readable,
      writable,
    }).pipeTo(ws);

    const expected = "0x03,0x02,0x01,0x00,0xFF,"
      + "0xFE,0xFD,0xFC,0x00,0x00";

    expect([...result].map(e => "0x" + e.toString(16).toUpperCase().padStart(2, "0")).join(",")).to.equal(expected);

  });

  it("writable", async () => {
    const td = ["AwIBAP/+/fwDAgEA//79/AMC","AQD//v38AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIB","AP/+/fwDAgEA//79/A=","","","","","","","","","="];

    let ti;
    const s = new ReadableStream({
      start(controller) {
        let c = 0;
        ti = setInterval(() => {
          if (c >= td.length) {
            clearInterval(ti);
            controller.close();
            return;
          }
          controller.enqueue(td[c]);
          c = c + 1;

        }, 10);
      },
    });

    await (() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 300);
      });
    })();

    const decoder = new Base64.DecoderStream();

    const result = new Uint8Array(70);
    let written = 0;
    const ws = new WritableStream({
      write(chunk) {
        result.set(chunk, written);
        written = written + chunk.byteLength;
      }
    });
    const readable = decoder.readable;
    const writable = decoder.writable;
    await s.pipeThrough({
      readable,
      writable,
    }).pipeTo(ws);

    const expected = "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x00,0x00,0x00,0x00,0x00,0x00";

    expect([...result].map(e => "0x" + e.toString(16).toUpperCase().padStart(2, "0")).join(",")).to.equal(expected);

  });

  it("writable - error", async () => {
    const td = ["A","w","あ","B","A","P","/","+","/","f","w","="];

    let ti;
    const s = new ReadableStream({
      start(controller) {
        let c = 0;
        ti = setInterval(() => {
          if (c >= td.length) {
            clearInterval(ti);
            controller.close();
            return;
          }
          controller.enqueue(td[c]);
          c = c + 1;

        }, 10);
      },
    });

    await (() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 300);
      });
    })();

    const decoder = new Base64.DecoderStream();

    const result = new Uint8Array(10);
    let written = 0;
    const ws = new WritableStream({
      write(chunk) {
        result.set(chunk, written);
        written = written + chunk.byteLength;
      }
    });
    const readable = decoder.readable;
    const writable = decoder.writable;
    try{
      await s.pipeThrough({
        readable,
        writable,
      }).pipeTo(ws); //TODO WebKitで警告される
      throw new Error("x");
    }catch(e){
      const err = e;
      expect(err.name).to.equal("TypeError");
      expect(err.message).to.equal("decode error (1)");
    }

  });

});
