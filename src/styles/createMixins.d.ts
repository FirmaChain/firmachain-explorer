/* eslint-disable*/
import * as createMixins from '@mui/material/styles/createMixins';

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
