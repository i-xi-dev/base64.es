# @i-xi-dev/base64

A JavaScript Base64 encoder and decoder, implements [Forgiving base64](https://infra.spec.whatwg.org/#forgiving-base64) defined in WHATWG Infra Standard.


## Documentation

[https://i-xi-dev.github.io/base64.es/](https://i-xi-dev.github.io/base64.es/)


## Requirement

### `Base64Decoder` and `Base64Encoder` classes, and `Base64` static class

- Chrome
- Edge
- Firefox
- Safari
- Deno
- Node.js

### `Base64DecoderStream` and `Base64EncoderStream` classes

These require [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream).

- Chrome
- Edge
- Safari 14.1+
- Deno
- Node.js 16.5.0+


## Installation

### npm

```console
$ npm i @i-xi-dev/base64
```

```javascript
import { Base64Decoder, Base64Encoder, Base64 } from "@i-xi-dev/base64";
import { Base64DecoderStream, Base64EncoderStream } from "@i-xi-dev/base64/stream";
```

### CDN

Example for Skypack
```javascript
import { Base64Decoder, Base64Encoder, Base64 } from "https://cdn.skypack.dev/@i-xi-dev/base64";
import { Base64DecoderStream, Base64EncoderStream } from "https://cdn.skypack.dev/@i-xi-dev/base64/stream";
```


## Usage

### `Base64Decoder` and `Base64Encoder` classes, and `Base64` static class

```javascript
const decoder = new Base64Decoder();

decoder.decode("AwIBAP/+/fw=");
// → Uint8Array[ 0x03, 0x02, 0x01, 0x00, 0xFF, 0xFE, 0xFD, 0xFC ]
```

```javascript
const encoder = new Base64Encoder();

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

### `Base64DecoderStream` and `Base64EncoderStream` classes

```javascript
const decoderStream = new Base64DecoderStream();

// readableStream: ReadableStream<string>
// writableStream: WritableStream<Uint8Array>
readableStream.pipeThrough(decoderStream).pipeTo(writableStream);
```

```javascript
const encoderStream = new Base64EncoderStream();

// readableStream: ReadableStream<Uint8Array>
// writableStream: WritableStream<string>
readableStream.pipeThrough(encoderStream).pipeTo(writableStream);
```

### Encoding options

[See the documentation](https://i-xi-dev.github.io/base64.es/modules/index.html#Base64Options)

#### Example

The options for [Base 64 Encoding with URL and Filename Safe Alphabet, defined in RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-5)
```javascript
// use the predefined Base64Options
const rfc4648urlOptions = Base64.Options["rfc4648url"];

const decoder = new Base64Decoder(rfc4648urlOptions);
const encoder = new Base64Encoder(rfc4648urlOptions);
const decoderStream = new Base64DecoderStream(rfc4648urlOptions);
const encoderStream = new Base64EncoderStream(rfc4648urlOptions);
const decoded = Base64.decode(str, rfc4648urlOptions);
const encoded = Base64.encode(uint8Array, rfc4648urlOptions);
```

```javascript
// create Base64Options
const rfc4648urlOptions = {
  table: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_" ],
  noPadding: true,
};

const decoder = new Base64Decoder(rfc4648urlOptions);
const encoder = new Base64Encoder(rfc4648urlOptions);
const decoderStream = new Base64DecoderStream(rfc4648urlOptions);
const encoderStream = new Base64EncoderStream(rfc4648urlOptions);
const decoded = Base64.decode(str, rfc4648urlOptions);
const encoded = Base64.encode(uint8Array, rfc4648urlOptions);
```
