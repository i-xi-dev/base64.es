import assert from "node:assert";
import { ReadableStream, WritableStream } from "node:stream/web";
import { Base64DecoderStream } from "../../../node/stream/index.mjs";

describe("Base64DecoderStream.prototype.writable", () => {
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

    const decoder = new Base64DecoderStream();

    const result = new Uint8Array(10);
    let written = 0;
    const ws = new WritableStream({
      write(chunk) {
        result.set(chunk, written);
        written = written + chunk.byteLength;
      }
    });
    await s.pipeThrough(decoder).pipeTo(ws);
    await s.pipeTo(ws);

    const expected = "0x03,0x02,0x01,0x00,0xFF,"
      + "0xFE,0xFD,0xFC,0x00,0x00";

    assert.strictEqual([...result].map(e => "0x" + e.toString(16).toUpperCase().padStart(2, "0")).join(","), expected);
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

    const decoder = new Base64DecoderStream();

    const result = new Uint8Array(40);
    let written = 0;
    const ws = new WritableStream({
      write(chunk) {
        result.set(chunk, written);
        written = written + chunk.byteLength;
      }
    });
    await s.pipeThrough(decoder).pipeTo(ws);
    await s.pipeTo(ws);

    const expected = "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00";

    assert.strictEqual([...result].map(e => "0x" + e.toString(16).toUpperCase().padStart(2, "0")).join(","), expected);
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

    const decoder = new Base64DecoderStream();

    const result = new Uint8Array(10);
    let written = 0;
    const ws = new WritableStream({
      write(chunk) {
        result.set(chunk, written);
        written = written + chunk.byteLength;
      }
    });
    await s.pipeThrough(decoder).pipeTo(ws);
    await s.pipeTo(ws);

    const expected = "0x03,0x02,0x01,0x00,0xFF,"
      + "0xFE,0xFD,0xFC,0x00,0x00";

    assert.strictEqual([...result].map(e => "0x" + e.toString(16).toUpperCase().padStart(2, "0")).join(","), expected);

  });

  it("writable", async () => {
    const td = ["AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fwDAgEA//79/AMCAQD//v38","AwIB","AP/+/fwDAgEA//79/A=","","","","","","","","","="];

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

    const decoder = new Base64DecoderStream();

    const result = new Uint8Array(70);
    let written = 0;
    const ws = new WritableStream({
      write(chunk) {
        result.set(chunk, written);
        written = written + chunk.byteLength;
      }
    });
    await s.pipeThrough(decoder).pipeTo(ws);
    await s.pipeTo(ws);

    const expected = "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,"
      + "0x00,0x00,0x00,0x00,0x00,0x00";

    assert.strictEqual([...result].map(e => "0x" + e.toString(16).toUpperCase().padStart(2, "0")).join(","), expected);

  });

});
