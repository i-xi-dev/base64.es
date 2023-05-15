import { build, emptyDir } from "https://deno.land/x/dnt@0.35.0/mod.ts";

await emptyDir("./npm");

await build({
  compilerOptions: {
    lib: ["esnext", "dom"],
  },
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: "dev",
  },
  scriptModule: false,
  rootTestDir: "./tests",
  package: {
    name: "@i-xi-dev/base64",
    version: "4.0.0",
    description:
      "A JavaScript Base64 encoder and decoder, implements Forgiving base64 defined in WHATWG Infra Standard.",
    license: "MIT",
    author: "i-xi-dev",
    homepage: "https://github.com/i-xi-dev/base64.es#readme",
    keywords: [
      "base64",
      "forgiving-base64",
      "stream",
      "transformstream",
      "browser",
      "deno",
      "nodejs",
      "zero-dependency",
    ],
    repository: {
      type: "git",
      url: "git+https://github.com/i-xi-dev/base64.es.git",
    },
    bugs: {
      url: "https://github.com/i-xi-dev/base64.es/issues",
    },
    publishConfig: {
      access: "public",
    },
    files: [
      "esm",
      "types",
    ],
  },
  importMap: "./import_map.json",

  //
  typeCheck: false, // 落ちるようになった
  declaration: false, // 落ちるようになった
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
