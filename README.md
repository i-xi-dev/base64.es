# @i-xi-dev/base64

A JavaScript Base64 encoder and decoder, implements [Forgiving base64](https://infra.spec.whatwg.org/#forgiving-base64) defined in WHATWG Infra Standard.

- [`Base64Decoder`, `Base64Encoder`](#base64decoder-and-base64encoder-class)


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


