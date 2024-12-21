// rollup.config.mjs
import svg from "rollup-plugin-svg-import";
import css from "rollup-plugin-import-css";

export default {
  input: "src/components/dist/components/library.js",
  output: {
    file: "src/components/dist/components/library-cjs.js",
    format: "cjs",
  },
  plugins: [
    svg({
      /**
       * If `true`, instructs the plugin to import an SVG as string.
       * For example, for Server Side Rendering.
       * Otherwise, the plugin imports SVG as DOM node.
       */
      stringify: true,
    }),
    css(),
  ],
};
