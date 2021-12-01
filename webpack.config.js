import path from "node:path";

export default {
  mode: "development",
  entry: {
    "/": "./src/index.ts",
    "/stream/": "./src/stream/index.ts",
  },
  output: {
    filename: "[name]index.js",
    path: path.join(process.cwd(), "dist"),
    library: {
      type: "module",
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      }
    ],
  },
  resolve: {
    extensions: [
      ".ts",
      ".js",
    ],
  },
  experiments: {
    outputModule: true,
  },
};
