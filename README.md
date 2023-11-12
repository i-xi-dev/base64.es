# @i-xi-dev/base64

A JavaScript Base64 encoder and decoder, implements [Forgiving base64](https://infra.spec.whatwg.org/#forgiving-base64) defined in WHATWG Infra Standard.


## Requirement

### `Base64.Decoder` and `Base64.Encoder` classes, and `Base64` static class

| Chrome | Edge | Firefox | Safari | Deno | Node.js |
| :---: | :---: | :---: | :---: | :---: | :---: |
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |


### `Base64.DecoderStream` and `Base64.EncoderStream` classes

These require [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream).

| Chrome | Edge | Firefox | Safari | Deno | Node.js |
| :---: | :---: | :---: | :---: | :---: | :---: |
| ✅ | ✅ | ✅<br />102+ | ✅<br />14.1+ | ✅ | ✅<br />16.5+ |


## Installation

### npm

```console
$ npm i @i-xi-dev/base64@4.1.4
```

```javascript
import { Base64 } from "@i-xi-dev/base64";
```

### CDN

Example for UNPKG
```javascript
import { Base64 } from "https://www.unpkg.com/@i-xi-dev/base64@4.1.4/esm/mod.js";
```

## Usage

### [`Base64.Decoder`](https://doc.deno.land/https://raw.githubusercontent.com/i-xi-dev/base64.es/4.1.4/mod.ts/~/Base64.Decoder) and [`Base64.Encoder`](https://doc.deno.land/https://raw.githubusercontent.com/i-xi-dev/base64.es/4.1.4/mod.ts/~/Base64.Encoder) classes, and [`Base64`](https://doc.deno.land/https://raw.githubusercontent.com/i-xi-dev/base64.es/4.1.4/mod.ts/~/Base64) static class

```javascript
const decoder = new Base64.Decoder();

decoder.decode("AwIBAP/+/fw=");
// → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
```

```javascript
const encoder = new Base64.Encoder();

encoder.encode(Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC));
// → "AwIBAP/+/fw="
```

```javascript
Base64.decode("AwIBAP/+/fw=");
// → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
```

```javascript
Base64.encode(Uint8Array.of(0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC));
// → "AwIBAP/+/fw="
```

### [`Base64.DecoderStream`](https://doc.deno.land/https://raw.githubusercontent.com/i-xi-dev/base64.es/4.1.4/mod.ts/~/Base64.DecoderStream) and [`Base64.EncoderStream`](https://doc.deno.land/https://raw.githubusercontent.com/i-xi-dev/base64.es/4.1.4/mod.ts/~/Base64.EncoderStream) classes

```javascript
const decoderStream = new Base64.DecoderStream();

// readableStream: ReadableStream<string>
// writableStream: WritableStream<Uint8Array>
readableStream.pipeThrough(decoderStream).pipeTo(writableStream);
```

```javascript
const encoderStream = new Base64.EncoderStream();

// readableStream: ReadableStream<Uint8Array>
// writableStream: WritableStream<string>
readableStream.pipeThrough(encoderStream).pipeTo(writableStream);
```

### Encoding options

[See the documentation](https://doc.deno.land/https://raw.githubusercontent.com/i-xi-dev/base64.es/4.1.4/mod.ts/~/Base64.Options)

#### Example

The options for [Base 64 Encoding with URL and Filename Safe Alphabet, defined in RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-5)
```javascript
// use the predefined Base64.Options
const rfc4648urlOptions = Base64.Options.RFC4648URL;

const decoder = new Base64.Decoder(rfc4648urlOptions);
const encoder = new Base64.Encoder(rfc4648urlOptions);
const decoderStream = new Base64.DecoderStream(rfc4648urlOptions);
const encoderStream = new Base64.EncoderStream(rfc4648urlOptions);
const decoded = Base64.decode(str, rfc4648urlOptions);
const encoded = Base64.encode(uint8Array, rfc4648urlOptions);
```

```javascript
// create Base64.Options
const rfc4648urlOptions = {
  /*
  rawTable: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_" ],
  */
  tableLastChars: ["-", "_"],
  noPadding: true,
};

const decoder = new Base64.Decoder(rfc4648urlOptions);
const encoder = new Base64.Encoder(rfc4648urlOptions);
const decoderStream = new Base64.DecoderStream(rfc4648urlOptions);
const encoderStream = new Base64.EncoderStream(rfc4648urlOptions);
const decoded = Base64.decode(str, rfc4648urlOptions);
const encoded = Base64.encode(uint8Array, rfc4648urlOptions);
```

## Examples

- [Base64 encode from string](https://i-xi-dev.github.io/base64.es/example/base64_from_string.html)
- [Base64 encode from file](https://i-xi-dev.github.io/base64.es/example/base64_from_file.html)
- [Base64 decode to string](https://i-xi-dev.github.io/base64.es/example/string_from_base64.html)
