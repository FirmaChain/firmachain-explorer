import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface Props {
    className?: string;
    value: string;
    theme?: TagTheme;
}

const Tag = ({ className, value, theme }: Props) => {
    const tagTheme = theme || 'zero';

    return (
        <Box
            className={className}
            sx={(muiTheme) => {
                const tagColor = muiTheme.palette.custom.tags[tagTheme] || muiTheme.palette.custom.tags.zero;
                return {
                    borderRadius: `${muiTheme.shape.borderRadius}px`,
                    padding: muiTheme.spacing(0.5, 1),
                    display: 'inline-block',
                    color: tagColor,
                    background: alpha(tagColor, 0.2),
                    '&:not(:last-child)': {
                        marginRight: muiTheme.spacing(1)
                    },
                    '& .MuiTypography-body1': {
                        whiteSpace: 'nowrap'
                    }
                };
            }}
        >
            <Typography variant="body1">{value}</Typography>
        </Box>
    );
};

export default Tag;
