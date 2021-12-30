import assert from "node:assert";
import { ReadableStream, WritableStream } from "node:stream/web";
import { Base64EncoderStream } from "../../../node/stream/index.mjs";

describe("Base64EncoderStream.prototype.writable", () => {
  it("writable", async () => {
    const td = [
      Uint8Array.of(0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC)
    ];

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

    const encoder = new Base64EncoderStream();

    let result = "";
    const ws = new WritableStream({
      write(chunk) {
        result = result + chunk;
      }
    });
    await s.pipeThrough(encoder).pipeTo(ws);

    const expected = "AwIBAP/+/fw=";

    assert.strictEqual(result, expected);

  });

  it("writable", async () => {
    const td = [
      Uint8Array.of(
        0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,
        0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,
        0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,
        0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC
      )
    ];

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

    const encoder = new Base64EncoderStream();

    let result = "";
    const ws = new WritableStream({
      write(chunk) {
        result = result + chunk;
      }
    });
    await s.pipeThrough(encoder).pipeTo(ws);

    const expected = "AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fw=";

    assert.strictEqual(result, expected);

  });

  it("writable", async () => {
    const td = [
      Uint8Array.of(0x03),
      Uint8Array.of(0x02),
      Uint8Array.of(0x01),
      Uint8Array.of(0x00),
      Uint8Array.of(0xFF),
      Uint8Array.of(0xFE),
      Uint8Array.of(0xFD),
      Uint8Array.of(0xFC),
    ];

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

    const encoder = new Base64EncoderStream();

    let result = "";
    const ws = new WritableStream({
      write(chunk) {
        result = result + chunk;
      }
    });
    await s.pipeThrough(encoder).pipeTo(ws);

    const expected = "AwIBAP/+/fw=";

    assert.strictEqual(result, expected);

  });

  it("writable", async () => {
    const td = [
      Uint8Array.of(
        0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,
        0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,
        0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC
      ),
      Uint8Array.of(),
      Uint8Array.of(
        0x03,0x02),
      Uint8Array.of(
        
        0x01,0x00,0xFF,0xFE,0xFD,0xFC,
        0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,
        0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,
        0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC,
        0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD
      ),
      Uint8Array.of(0xFC),
      Uint8Array.of(),
    ];

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

    const encoder = new Base64EncoderStream();

    let result = "";
    const ws = new WritableStream({
      write(chunk) {
        result = result + chunk;
      }
    });
    await s.pipeThrough(encoder).pipeTo(ws);

    const expected = "AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fwDAgEA//79/A==";

    assert.strictEqual(result, expected);

  });

});
