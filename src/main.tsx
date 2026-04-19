import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import Router from '@/router';

import '@/i18n';

const root = createRoot(document.getElementById('root')!);

root.render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>
);
