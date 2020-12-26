// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';

export default [
  // browser-friendly UMD build
  {
    input: 'src/main.ts',
    output: {
      name: 'TicTacToe',
      file: pkg.browser,
      format: 'es'
    },
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
      // resolve(), // so Rollup can find `ms`
      // commonjs() // so Rollup can convert `ms` to an ES module
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify 
  // `file` and `format` for each target)
  {
    input: 'src/main.ts',
    //external: ['ms'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
    ],
    external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ],
  }
];

