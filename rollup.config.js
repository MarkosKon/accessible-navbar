import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss'

import pkg from './package.json';

const bundles = [
  {
    output: {
      file: pkg.module,
      format: 'es',
    },
    plugins: [terser()],
  },
  {
    output: {
      name: 'accessibleNavbar',
      file: 'dist/accessible-navbar.umd.js',
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'reactDom',
        'styled-components': 'styled',
        'focus-trap-react': 'FocusTrap',
      },
    },
    plugins: [uglify()],
  },
  {
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    plugins: [uglify()],
  },
];

const common = {
  input: 'src/index.js',
  external: ['react', 'react-dom', 'styled-components', 'focus-trap-react'],
  plugins: [
    postcss({
      plugins: []
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    nodeResolve({
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};

export default bundles.map(({ output, plugins }) => ({
  ...common,
  output,
  plugins: common.plugins.concat(plugins),
}));
