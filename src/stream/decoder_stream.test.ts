import { Base64DecoderStream } from "./decoder_stream";

describe("Base64DecoderStream.prototype.writable", () => {
  it("writable", async () => {
    const td = ["AwIBAP/+/fw="];

    let ti: NodeJS.Timer;
    const s = new ReadableStream<string>({
      start(controller: ReadableStreamDefaultController) {
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
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 20);
      });
    })();

    const decoder = new Base64DecoderStream();

    const result = new Uint8Array(10);
    let written = 0;
    const ws = new WritableStream<Uint8Array>({
      write(chunk: Uint8Array) {
        result.set(chunk, written);
        written = written + chunk.byteLength;
      }
    });
    await s.pipeThrough<Uint8Array>(decoder as unknown as ReadableWritablePair<Uint8Array, string>).pipeTo(ws); 

    const expected = "0x03,0x02,0x01,0x00,0xFF,"
      + "0xFE,0xFD,0xFC,0x00,0x00";

    expect([...result].map(e => "0x" + e.toString(16).toUpperCase().padStart(2, "0")).join(",")).toBe(expected);
  });

  it("writable", async () => {
    const td = ["AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fw="];

    let ti: NodeJS.Timer;
    const s = new ReadableStream({
      start(controller: ReadableStreamDefaultController) {
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
      return new Promise<void>((resolve) => {
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

    expect([...result].map(e => "0x" + e.toString(16).toUpperCase().padStart(2, "0")).join(",")).toBe(expected);
  });

  it("writable", async () => {
    const td = ["A","w","I","B","A","P","/","+","/","f","w","="];

    let ti: NodeJS.Timer;
    const s = new ReadableStream({
      start(controller: ReadableStreamDefaultController) {
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
      return new Promise<void>((resolve) => {
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

    expect([...result].map(e => "0x" + e.toString(16).toUpperCase().padStart(2, "0")).join(",")).toBe(expected);

  });

  it("writable", async () => {
    const td = ["AwIBAP/+/fwDAgEA//79/AMC","AQD//v38AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIB","AP/+/fwDAgEA//79/A=","","","","","","","","","="];

    let ti: NodeJS.Timer;
    const s = new ReadableStream({
      start(controller: ReadableStreamDefaultController) {
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
      return new Promise<void>((resolve) => {
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

    expect([...result].map(e => "0x" + e.toString(16).toUpperCase().padStart(2, "0")).join(",")).toBe(expected);

  });

});
