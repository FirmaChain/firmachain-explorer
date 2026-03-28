import { makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
    const styles = makeStyles((theme) => {
        return {
            root: {
                '& .label': {
                    color: theme.palette.custom.fonts.fontThree
                }
            },
            content: {
                marginTop: theme.spacing(2),
                display: 'grid',
                '& > *': {
                    marginBottom: theme.spacing(1),
                    [theme.breakpoints.up('lg')]: {
                        marginBottom: theme.spacing(2)
                    }
                },
                [theme.breakpoints.up('lg')]: {
                    gridTemplateColumns: '200px auto'
                }
            },
            messageList: {
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(2)
            },
            messageSection: {
                border: `2px solid ${theme.palette.divider}`,
                borderRadius: '12px',
                overflow: 'hidden'
            },
            messageHeader: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: theme.spacing(2),
                cursor: 'pointer',
                backgroundColor: theme.palette.custom?.general?.surfaceTwo
                    ? theme.palette.custom.general.surfaceTwo
                    : theme.palette.background.paper,
                '&:hover': {
                    backgroundColor: theme.palette.action.hover
                }
            },
            messagePillTag: {
                flexShrink: 0,
                borderRadius: '9999px !important'
            },
            messagePill: {
                display: 'inline-block',
                padding: theme.spacing(0.75, 1.5),
                borderRadius: '9999px !important',
                overflow: 'hidden',
                fontSize: '0.875rem',
                color: theme.palette.custom?.fonts?.fontTwo,
                background: theme.palette.custom?.tags?.zero ? `${theme.palette.custom.tags.zero}33` : 'rgba(103, 126, 166, 0.25)'
            },
            messageChevron: {
                color: theme.palette.custom.fonts.fontThree,
                transition: 'transform 0.2s'
            },
            messageChevronOpen: {
                transform: 'rotate(-90deg)'
            },
            labelValueRow: {
                display: 'grid',
                gridTemplateColumns: '200px 1fr',
                gap: theme.spacing(1, 2),
                alignItems: 'start',
                marginBottom: theme.spacing(2),
                // Left label fits text width only (label hugs text, does not fill cell)
                '& > *:first-of-type': {
                    width: 'fit-content'
                },
                [theme.breakpoints.down('lg')]: {
                    gridTemplateColumns: '1fr'
                }
            },
            labelValueRowLabel: {
                transform: `translateX(${theme.spacing(2)}px) translateY(${theme.spacing(1.5)}px)`
            },
            messageBodyTableWrap: {
                width: '100%',
                minWidth: 0,
                overflowX: 'auto'
            },
            messageBodyContentCell: {
                width: '100%',
                minWidth: 0,
                minHeight: 100
            },
            messageBodyBlock: {
                width: '100%',
                minWidth: 0,
                minHeight: 100
            },
            messageBodyBlockCompact: {
                width: '100%',
                minWidth: 0
            }
        };
    })();

    return styles;
};
