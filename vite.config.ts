import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const { PORT } = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [
            react(),
            svgr(),
            analyzer({
                analyzerMode: 'server',
                openAnalyzer: true
            })
        ],
        server: {
            host: true,
            port: PORT ? parseInt(PORT) : 5173
        },
        build: {
            outDir: 'build',
            sourcemap: false
        },
        resolve: {
            tsconfigPaths: true,
            alias: {
                '@mui/styled-engine': '@mui/styled-engine-sc'
            }
        }
    };
});
