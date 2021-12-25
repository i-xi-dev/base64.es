# @i-xi-dev/base64

A JavaScript Base64 encoder and decoder, implements [Forgiving base64](https://infra.spec.whatwg.org/#forgiving-base64) defined in WHATWG Infra Standard.

- [`Base64Decoder`, `Base64Encoder`](#base64decoder-and-base64encoder-class)
- [`Base64DecoderStream`, `Base64EncoderStream`](#base64decoderstream-and-base64encoderstream-class)


## `Base64Decoder` and `Base64Encoder` classes, and `Base64` static class


### Installation

#### npm

```console
$ npm i @i-xi-dev/base64
```

```javascript
import { Base64Decoder, Base64Encoder, Base64 } from "@i-xi-dev/base64";
```

#### CDN

```javascript
import { Base64Decoder, Base64Encoder, Base64 } from "https://cdn.skypack.dev/@i-xi-dev/base64";
```

```javascript
import { Base64Decoder, Base64Encoder, Base64 } from "https://unpkg.com/@i-xi-dev/base64/dist/index.js";
```

```javascript
import { Base64Decoder, Base64Encoder, Base64 } from "https://cdn.jsdelivr.net/npm/@i-xi-dev/base64/dist/index.js";
```


### Usage

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


## `Base64DecoderStream` and `Base64EncoderStream` classes


### Requirement
`Base64DecoderStream` and `Base64EncoderStream` requires [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream).

- Chrome
- Edge
- Safari 14.1+
- Deno
- Node.js 16.5.0+


### Installation

#### npm

```console
$ npm i @i-xi-dev/base64
```

```javascript
import { Base64DecoderStream, Base64EncoderStream } from "@i-xi-dev/base64/stream";
```

#### CDN

```javascript
import { Base64DecoderStream, Base64EncoderStream } from "https://cdn.skypack.dev/@i-xi-dev/base64/stream";
```

```javascript
import { Base64DecoderStream, Base64EncoderStream } from "https://unpkg.com/@i-xi-dev/base64/dist/stream/index.js";
```

```javascript
import { Base64DecoderStream, Base64EncoderStream } from "https://cdn.jsdelivr.net/npm/@i-xi-dev/base64/dist/stream/index.js";
```


### Usage

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


## Encoding options

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `table` | string[] | `[ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/" ]` | The 64 characters index table, the default is the table defined in RFC 4648 |
| `padEnd` | boolean | `true` | Whether to output the padding |
| `padding` | string | `"="` | The padding character, the default is the padding defined in RFC 4648 |

- The `length` of the `table` must be 64.
- The `length` of all elements contained in the `table` must be 1.
- The `table` must not contain duplicate characters.
- The `length` of the `padding` must be 1.
- The `padding` must not be a character contained in the `table`.

### Example

The options for [Base 64 Encoding with URL and Filename Safe Alphabet, defined in RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648#section-5)
```javascript
const options = {
  table: [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_" ],
  padEnd: false,
};

const decoder = new Base64Decoder(options);
const encoder = new Base64Encoder(options);
const decoderStream = new Base64DecoderStream(options);
const encoderStream = new Base64EncoderStream(options);
const decoded = Base64.decode(str, options);
const encoded = Base64.encode(uint8Array, options);
```
