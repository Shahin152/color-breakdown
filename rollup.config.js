import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

const paths = {
    'node-vibrant': '../lib/node-vibrant/vibrant.js',
};

/** @type {import('rollup').RollupFileOptions} */
const pageConfig = {
    input: 'src/page/index.ts',
    output: {
        dir: 'public/js/',
        format: 'esm',
        paths,
        sourcemap: true,
    },
    plugins: [typescript(), replace(paths)],
    experimentalCodeSplitting: true,
};

/** @type {import('rollup').RollupFileOptions} */
const workerConfig = {
    input: 'src/db-worker/index.ts',
    output: { file: 'public/js/db-worker.js', format: 'iife', sourcemap: true },
    plugins: [typescript(), resolve(), commonjs()],
};

/** @type {import('rollup').RollupFileOptions} */
const serviceWorkerConfig = {
    input: 'src/service-worker/index.ts',
    output: { file: 'public/sw.js', format: 'iife', sourcemap: true },
    plugins: [typescript()],
};

export default [pageConfig, workerConfig, serviceWorkerConfig];