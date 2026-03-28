import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
    const styles = makeStyles(
        (theme) => {
            return {
                root: {
                    minHeight: '500px',
                    height: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    [theme.breakpoints.up('lg')]: {
                        height: '100%',
                        minHeight: '65vh'
                    }
                },
                list: {
                    flex: 1,
                    minHeight: 0
                },
                listScroll: {
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                },
                rowDivider: {
                    marginLeft: theme.spacing(-2),
                    marginRight: theme.spacing(-2),
                    marginTop: theme.spacing(1),
                    marginBottom: theme.spacing(1)
                },
                mobile: {
                    [theme.breakpoints.up('lg')]: {
                        display: 'none'
                    }
                },
                desktop: {
                    display: 'none',
                    [theme.breakpoints.up('lg')]: {
                        display: 'flex'
                    }
                },
                total: {
                    color: theme.palette.custom.fonts.fontThree,
                    textAlign: 'right',
                    [theme.breakpoints.up('lg')]: {
                        color: theme.palette.custom.fonts.fontTwo
                    }
                },
                search: {
                    margin: theme.spacing(2, 0),
                    '& .MuiInputBase-root': {
                        width: '100%',
                        background: theme.palette.custom.general.surfaceTwo,
                        padding: theme.spacing(0.4, 1.2),
                        borderRadius: theme.shape.borderRadius
                    },
                    '& .MuiInputBase-input': {
                        textOverflow: 'ellipsis',
                        '&::placeholder': {
                            color: theme.palette.custom.fonts.fontThree
                        }
                    },
                    [theme.breakpoints.up('lg')]: {
                        width: '300px',
                        margin: 0
                    }
                },
                topContent: {
                    [theme.breakpoints.up('lg')]: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: theme.spacing(2)
                    }
                }
            };
        },
        { index: 1 }
    )();

    return styles;
};
