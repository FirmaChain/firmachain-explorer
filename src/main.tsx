import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router';

import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import AppShell from '@/AppShell';

import '@/i18n';

const root = createRoot(document.getElementById('root')!);

root.render(
    <HelmetProvider>
        <BrowserRouter>
            <AppShell />
        </BrowserRouter>
    </HelmetProvider>
);
