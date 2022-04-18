import path from "node:path";

export default {
  mode: "production",
  entry: {
    "/": "./src/index.ts",
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
