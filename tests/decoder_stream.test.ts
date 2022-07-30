import { assertStrictEquals } from "std/testing/asserts";
import { Base64 } from "../mod.ts";
import {
  _ReadableStream as ReadableStream,
} from "https://raw.githubusercontent.com/i-xi-dev/compat.es/1.0.1/mod.ts";

Deno.test("Base64.DecoderStream.prototype.writable - 1", async () => {
  const td = ["AwIBAP/+/fw="];

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream<string>({
    start(controller: ReadableStreamDefaultController<string>) {
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

  const decoder = new Base64.DecoderStream();

  const result = new Uint8Array(10);
  let written = 0;
  const ws = new WritableStream<Uint8Array>({
    write(chunk: Uint8Array) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  const readable: ReadableStream<Uint8Array> = decoder
    .readable as ReadableStream<Uint8Array>;
  const writable: WritableStream<string> = decoder.writable;
  await s.pipeThrough<Uint8Array>({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "0x03,0x02,0x01,0x00,0xFF," +
    "0xFE,0xFD,0xFC,0x00,0x00";

  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Base64.DecoderStream.prototype.writable - 2", async () => {
  const td = ["AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fw="];

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream<string>({
    start(controller: ReadableStreamDefaultController<string>) {
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

  const decoder = new Base64.DecoderStream();

  const result = new Uint8Array(40);
  let written = 0;
  const ws = new WritableStream<Uint8Array>({
    write(chunk: Uint8Array) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  const readable: ReadableStream<Uint8Array> = decoder
    .readable as ReadableStream<Uint8Array>;
  const writable: WritableStream<string> = decoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00";

  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Base64.DecoderStream.prototype.writable - 3", async () => {
  const td = ["A", "w", "I", "B", "A", "P", "/", "+", "/", "f", "w", "="];

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream<string>({
    start(controller: ReadableStreamDefaultController<string>) {
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

  const decoder = new Base64.DecoderStream();

  const result = new Uint8Array(10);
  let written = 0;
  const ws = new WritableStream<Uint8Array>({
    write(chunk: Uint8Array) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  const readable: ReadableStream<Uint8Array> = decoder
    .readable as ReadableStream<Uint8Array>;
  const writable: WritableStream<string> = decoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "0x03,0x02,0x01,0x00,0xFF," +
    "0xFE,0xFD,0xFC,0x00,0x00";

  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Base64.DecoderStream.prototype.writable - 4", async () => {
  const td = [
    "AwIBAP/+/fwDAgEA//79/AMC",
    "AQD//v38AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIB",
    "AP/+/fwDAgEA//79/A=",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "=",
  ];

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream<string>({
    start(controller: ReadableStreamDefaultController<string>) {
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

  const decoder = new Base64.DecoderStream();

  const result = new Uint8Array(70);
  let written = 0;
  const ws = new WritableStream<Uint8Array>({
    write(chunk: Uint8Array) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  const readable: ReadableStream<Uint8Array> = decoder
    .readable as ReadableStream<Uint8Array>;
  const writable: WritableStream<string> = decoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x03,0x02,0x01,0x00,0xFF,0xFE,0xFD,0xFC," +
    "0x00,0x00,0x00,0x00,0x00,0x00";

  assertStrictEquals(
    [...result].map((e) => "0x" + e.toString(16).toUpperCase().padStart(2, "0"))
      .join(","),
    expected,
  );
});

Deno.test("Base64.DecoderStream.prototype.writable - error", async () => {
  const td = ["A", "w", "あ", "B", "A", "P", "/", "+", "/", "f", "w", "="];

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream<string>({
    start(controller: ReadableStreamDefaultController<string>) {
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

  const decoder = new Base64.DecoderStream();

  const result = new Uint8Array(10);
  let written = 0;
  const ws = new WritableStream<Uint8Array>({
    write(chunk: Uint8Array) {
      result.set(chunk, written);
      written = written + chunk.byteLength;
    },
  });
  const readable: ReadableStream<Uint8Array> = decoder
    .readable as ReadableStream<Uint8Array>;
  const writable: WritableStream<string> = decoder.writable;
  try {
    await s.pipeThrough({
      readable,
      writable,
    }).pipeTo(ws);
    throw new Error("x");
  } catch (e) {
    const err = e as Error;
    //assertStrictEquals(err.name, "TypeError");
    assertStrictEquals(err.message, "decode error (1)");
  }
});
