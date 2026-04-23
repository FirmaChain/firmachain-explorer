import React from 'react';
import { Avatar } from '@components';
import { Box, Typography } from '@mui/material';
import { ADDRESS_DETAILS } from '@utils/go_to_page';
import { Link } from 'react-router';

const AvatarName: React.FC<AvatarName> = ({ className, address, name, imageUrl, href = ADDRESS_DETAILS }) => {
    return (
        <Link to={href(address)}>
            <Box
                className={className}
                sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    '& p': {
                        color: theme.palette.custom.fonts.highlight,
                        marginLeft: theme.spacing(1),
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    },
                    '&:hover': {
                        cursor: 'pointer'
                    }
                })}
            >
                <Avatar address={address} imageUrl={imageUrl ?? undefined} />
                <Typography variant="body1">{name}</Typography>
            </Box>
        </Link>
    );
};

export default AvatarName;
