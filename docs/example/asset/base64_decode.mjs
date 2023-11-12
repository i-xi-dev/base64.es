import { Base64 } from "https://www.unpkg.com/@i-xi-dev/base64@4.1.4/esm/mod.js";
// https://cdn.skypack.dev/@i-xi-dev/base64@4.1.4

import { bytesToString, decodeUtf8 } from "./lib.mjs";

const i1 = document.getElementById("i1");
const ip11 = document.getElementById("ip11");
const ip12 = document.getElementById("ip12");
const a1 = document.getElementById("a1");
const o1 = document.getElementById("o1");
const o2 = document.getElementById("o2");

a1.addEventListener("click", () => {
  const i = i1.value;
  const tableLastChars = ip12.value.split("");
  const options = {
    tableLastChars,
    noPadding: (ip11.checked !== true),
    paddingChar: "=",
  };

  const bytes = Base64.decode(i, options);
  o1.value = bytesToString(bytes);
  const decoded = decodeUtf8(bytes);
  o2.value = decoded;
}, { passive: true });

document.querySelector("*.progress").hidden = true;
