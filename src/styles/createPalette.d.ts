/* eslint-disable*/
import '@mui/material/styles';
import '@mui/material/styles/createPalette';

interface CustomPalette {
    general: {
        background: string;
        surfaceOne: string;
        surfaceTwo: string;
        icon: string;
    };
    fonts: {
        fontOne: string;
        fontTwo: string;
        fontThree: string;
        fontFour: string;
        fontFive: string;
        highlight: string;
    };
    primaryData: {
        one: string;
        two: string;
        three: string;
        four: string;
    };
    tags: {
        zero: string;
        one: string;
        two: string;
        three: string;
        four: string;
        five: string;
        six: string;
        seven: string;
        eight: string;
        nine: string;
        ten: string;
        eleven: string;
        twelve: string;
        thirteen: string;
        fourteen: string;
        fifteen: string;
        sixteen: string;
        seventeen: string;
        eighteen: string;
        nineteen: string;
        twenty: string;
    };
    charts: {
        zero: string;
        one: string;
        two: string;
        three: string;
        four: string;
        five: string;
    };
    condition: {
        zero: string;
        one: string;
        two: string;
        three: string;
    };
    tokenomics: {
        zero: string;
        one: string;
        two: string;
        three: string;
    };
    results: {
        pass: string;
        fail: string;
    };
}

declare module '@mui/material/styles' {
    interface PaletteOptions {
        custom?: CustomPalette;
    }
    interface Palette {
        custom: CustomPalette;
    }
}

declare module '@mui/material/styles/createPalette' {
    interface PaletteOptions {
        custom?: CustomPalette;
    }
    interface Palette {
        custom: CustomPalette;
    }
}
