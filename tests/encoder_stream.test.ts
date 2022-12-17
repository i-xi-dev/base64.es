import { assertStrictEquals } from "std/testing/asserts";
import { Base64 } from "../mod.ts";
import {
  _ReadableStream as ReadableStream,
} from "i-xi-dev/compat.es";

Deno.test("Base64.EncoderStream.prototype.writable - 1", async () => {
  const td = [
    Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC),
  ];

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream<Uint8Array>({
    start(controller: ReadableStreamDefaultController<Uint8Array>) {
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

  const encoder = new Base64.EncoderStream();

  let result = "";
  const ws = new WritableStream<string>({
    write(chunk: string) {
      result = result + chunk;
    },
  });
  const readable: ReadableStream<string> = encoder.readable as ReadableStream<
    string
  >;
  const writable: WritableStream<Uint8Array> = encoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "AwIBAP/+/fw=";

  assertStrictEquals(result, expected);
});

Deno.test("Base64.EncoderStream.prototype.writable - 2", async () => {
  const td = [
    Uint8Array.of(
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
    ),
  ];

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream<Uint8Array>({
    start(controller: ReadableStreamDefaultController<Uint8Array>) {
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

  const encoder = new Base64.EncoderStream();

  let result = "";
  const ws = new WritableStream<string>({
    write(chunk: string) {
      result = result + chunk;
    },
  });
  const readable: ReadableStream<string> = encoder.readable as ReadableStream<
    string
  >;
  const writable: WritableStream<Uint8Array> = encoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fw=";

  assertStrictEquals(result, expected);
});

Deno.test("Base64.EncoderStream.prototype.writable - 3", async () => {
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

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream<Uint8Array>({
    start(controller: ReadableStreamDefaultController<Uint8Array>) {
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

  const encoder = new Base64.EncoderStream();

  let result = "";
  const ws = new WritableStream<string>({
    write(chunk: string) {
      result = result + chunk;
    },
  });
  const readable: ReadableStream<string> = encoder.readable as ReadableStream<
    string
  >;
  const writable: WritableStream<Uint8Array> = encoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected = "AwIBAP/+/fw=";

  assertStrictEquals(result, expected);
});

Deno.test("Base64.EncoderStream.prototype.writable - 4", async () => {
  const td = [
    Uint8Array.of(
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
    ),
    Uint8Array.of(),
    Uint8Array.of(
      0x03,
      0x02,
    ),
    Uint8Array.of(
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
      0xFC,
      0x03,
      0x02,
      0x01,
      0x00,
      0xFF,
      0xFE,
      0xFD,
    ),
    Uint8Array.of(0xFC),
    Uint8Array.of(),
  ];

  // deno-lint-ignore no-explicit-any
  let ti: any;
  const s = new ReadableStream<Uint8Array>({
    start(controller: ReadableStreamDefaultController<Uint8Array>) {
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

  const encoder = new Base64.EncoderStream();

  let result = "";
  const ws = new WritableStream<string>({
    write(chunk: string) {
      result = result + chunk;
    },
  });
  const readable: ReadableStream<string> = encoder.readable as ReadableStream<
    string
  >;
  const writable: WritableStream<Uint8Array> = encoder.writable;
  await s.pipeThrough({
    readable,
    writable,
  }).pipeTo(ws);

  const expected =
    "AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fwDAgEA//79/AMCAQD//v38AwIBAP/+/fwDAgEA//79/A==";

  assertStrictEquals(result, expected);
});
