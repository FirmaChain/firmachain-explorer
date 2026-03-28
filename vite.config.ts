import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [react(), svgr(), tsconfigPaths()],
    resolve: {
        alias: [
            {
                find: '@mui/styled-engine',
                replacement: '@mui/styled-engine-sc'
            }
        ]
    }
});
