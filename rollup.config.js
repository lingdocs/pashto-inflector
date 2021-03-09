import image from '@rollup/plugin-image';
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
  input: 'dist/library.js',
  external: ["react", "react-dom", "react-bootstrap"],
  output: [{
    file: pkg.main,
    format: 'cjs',
    sourcemap: true,
    banner,
  }],
  plugins: [
    // peerDepsExternal(),
    commonjs(),
    nodeResolve({
      resolveOnly: ['classnames'],
    }),
    // use base64 image inlining for the cjs version so that the .svg s can get cosumed by node 12 etc. 
    image(),
  ]
}
