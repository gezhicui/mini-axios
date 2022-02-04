import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
export default {
  input: 'lib/axios.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: "axios"
  },
  plugins: [
    resolve(),
    commonjs()
  ]
}
