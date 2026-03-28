import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import AppShell from '@/AppShell';

import '@/i18n';

ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <AppShell />
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
