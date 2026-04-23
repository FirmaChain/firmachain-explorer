import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
    const { PORT } = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react(), svgr(), tsconfigPaths()],
        server: {
            host: true,
            port: PORT ? parseInt(PORT) : 5173
        },
        build: {
            outDir: 'build',
            sourcemap: false
        },
        resolve: {
            alias: [
                {
                    find: '@mui/styled-engine',
                    replacement: '@mui/styled-engine-sc'
                }
            ]
        }
    };
});
