/* eslint-disable*/
import type { CSSProperties } from 'react';
import '@mui/material/styles';
import '@mui/material/styles/createMixins';

declare module '@mui/material/styles' {
    interface MixinsOptions {
        layout?: CSSProperties;
        tableCell?: CSSProperties;
    }

    interface Mixins {
        layout: CSSProperties;
        tableCell: CSSProperties;
    }
}

declare module '@mui/material/styles/createMixins' {
    interface MixinsOptions {
        layout?: CSSProperties;
        tableCell?: CSSProperties;
    }

    interface Mixins {
        layout: CSSProperties;
        tableCell: CSSProperties;
    }
}
