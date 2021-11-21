# @i-xi-dev/base64

A JavaScript Base64 encoder and decoder, implements [Forgiving base64](https://infra.spec.whatwg.org/#forgiving-base64) defined in WHATWG Infra Standard.

- [`Base64Decoder`, `Base64Encoder`](#base64decoder-and-base64encoder-class)
- [`Base64DecoderStream`, `Base64EncoderStream`](#base64decoderstream-and-base64encoderstream-class)


## `Base64Decoder` and `Base64Encoder` class


### Installation

#### npm

```console
$ npm i @i-xi-dev/base64
```

```javascript
import { Base64Decoder, Base64Encoder } from "@i-xi-dev/base64";
```

#### CDN

```javascript
import { Base64Decoder, Base64Encoder } from "https://cdn.skypack.dev/@i-xi-dev/base64";
```

```javascript
import { Base64Decoder, Base64Encoder } from "https://unpkg.com/@i-xi-dev/base64/dist/index.js";
```

```javascript
import { Base64Decoder, Base64Encoder } from "https://cdn.jsdelivr.net/npm/@i-xi-dev/base64/dist/index.js";
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

#### Options
TODO


## `Base64DecoderStream` and `Base64EncoderStream` class


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
