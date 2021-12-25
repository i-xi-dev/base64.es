// Jestでのみ使用
// 下記が対応されたら不要
// https://kulshekhar.github.io/ts-jest/docs/next/guides/esm-support/

// 削除時修正箇所:
// - jest.configのtransformのjsの行を削除
// - jest.configのtransformIgnorePatternsをコメントアウト
// - @babel/plugin-transform-modules-commonjs削除
// - @babel/preset-env削除
// - babel-jest削除

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
  ]
}
