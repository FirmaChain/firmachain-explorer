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
