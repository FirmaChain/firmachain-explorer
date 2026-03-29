import React from 'react';
import Link from '@/adapters/routing/link';
import { Avatar } from '@components';
import { Box, Typography } from '@mui/material';
import { ADDRESS_DETAILS } from '@utils/go_to_page';

const AvatarName: React.FC<AvatarName> = ({ className, address, name, imageUrl, href = ADDRESS_DETAILS }) => {
    return (
        <Link href={href(address)}>
            <a>
                <Box
                    className={className}
                    sx={(theme: any) => ({
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
            </a>
        </Link>
    );
};

export default AvatarName;
