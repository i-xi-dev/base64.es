import { Base64 } from "https://www.unpkg.com/@i-xi-dev/base64@4.1.4/esm/mod.js";
// https://cdn.skypack.dev/@i-xi-dev/base64@4.1.4

import { bytesToString, encodeUtf8 } from "./lib.mjs";

const i1 = document.getElementById("i1");
const ip11 = document.getElementById("ip11");
const ip12 = document.getElementById("ip12");
const a1 = document.getElementById("a1");
const o1 = document.getElementById("o1");
const o2 = document.getElementById("o2");

a1.addEventListener("click", async () => {
  const tableLastChars = ip12.value.split("");
  const options = {
    tableLastChars,
    noPadding: (ip11.checked !== true),
    paddingChar: "=",
  };

  let bytes = Uint8Array.of();
  if (i1.type === "file") {
    const file = i1.files[0];
    if (file) {
      bytes = new Uint8Array(await file.arrayBuffer());
    }
  }
  else {
    bytes = encodeUtf8(i1.value);
  }

  o1.value = bytesToString(bytes);
  const base64 = Base64.encode(bytes, options);
  o2.value = base64;
}, { passive: true });

document.querySelector("*.progress").hidden = true;
