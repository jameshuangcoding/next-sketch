import { defineConfig } from 'vite';
import path from 'node:path';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
    }),
  ],
});
