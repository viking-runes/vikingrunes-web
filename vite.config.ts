import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

import { nodePolyfills } from 'vite-plugin-node-polyfills';

import wasm from 'vite-plugin-wasm';

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd());

  const stakeUrl = env.VITE_STAKE_URL;
  console.log('🚀 ~ stakeUrl:', stakeUrl);

  return defineConfig({
    plugins: [
      wasm(),
      react(),
      svgr(),
      nodePolyfills({
        include: ['path', 'stream', 'util'],
        exclude: ['http'],
        globals: {
          Buffer: true,
          // global: true,
          // process: true,
        },
        // overrides: {
        //   fs: 'memfs',
        // },
        protocolImports: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    server: {
      port: 5173,
      // proxy: {
      //   '/api': {
      //     target: stakeUrl,
      //     secure: false,
      //     changeOrigin: true,
      //   },
      // },

      proxy: {
        '/stake': {
          target: stakeUrl,
          // secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/stake/, ''),
        },
      },
    },
  });
};
