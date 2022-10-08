import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const banner = `
/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
`;

export default {
  input: 'dist/lib/library.js',
  output: [{
    file: "dist/index.js",
    format: 'cjs',
    sourcemap: true,
    banner,
  }],
  plugins: [
    // peerDepsExternal(),
    commonjs(),
    nodeResolve({
      resolveOnly: Object.keys(pkg.dependencies),
    }),
  ]
}