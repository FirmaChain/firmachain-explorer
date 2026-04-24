import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { Props } from './types';
import { socialMediaLinks } from './utils';

const SocialMedia = (props: Props) => {
    const { className = '' } = props;
    const theme = useTheme();
    const iconFill = theme.palette.mode === 'light' ? theme.palette.custom.fonts.fontTwo : theme.palette.custom.general.icon;
    return (
        <Box
            className={`${className} social-media`}
            sx={{
                '& .media': {
                    margin: '0 0.5rem',
                    '&:first-child': {
                        marginLeft: 0
                    },
                    '&:last-child': {
                        marginRight: 0
                    },
                    '& path': {
                        transition: 'all 0.3s ease',
                        fill: iconFill
                    },
                    '&:hover path': {
                        fill: alpha(iconFill, 0.6)
                    }
                }
            }}
        >
            {socialMediaLinks.map((x, i) => {
                return (
                    <a key={i} href={x.url} target="_blank" rel="noreferrer" className={`media`}>
                        {x.component}
                    </a>
                );
            })}
        </Box>
    );
};

export default SocialMedia;
