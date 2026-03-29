import { alpha, Theme } from '@mui/material/styles';

export const tabsHeaderSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
} as const;

export const desktopSearchBarSx = (theme: Theme) => ({
    display: 'none',
    [theme.breakpoints.up('lg')]: {
        display: 'block',
        width: '300px',
        '& .MuiInputBase-root': {
            width: '100%',
            background: theme.palette.custom.general.surfaceTwo,
            padding: theme.spacing(0.4, 1.2),
            borderRadius: `${theme.shape.borderRadius}px`
        },
        '& .MuiInputBase-input': {
            textOverflow: 'ellipsis',
            '&::placeholder': {
                color: theme.palette.custom.fonts.fontThree
            }
        }
    }
});

export const defaultTooltipSx = (theme: Theme) => ({
    p: 2,
    background: alpha(theme.palette.background.paper, 0.9)
});

export const firmachainTitleLogoSx = {
    lineHeight: 0,
    '& svg': {
        width: '100%',
        height: 'auto',
        display: 'block'
    },
    '& svg .st0': {
        fill: '#E6E6E6'
    },
    '& svg .st1': {
        fill: '#E81F1F'
    },
    '& svg .st2': {
        fill: '#FFFFFF'
    }
} as const;
