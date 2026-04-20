import React from 'react';
import { Avatar, Box, Markdown } from '@components';
import { Typography } from '@mui/material';
import classnames from 'classnames';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

import { Connections } from './components';
import { useDesmosProfile } from './hooks';

const DesmosProfile: React.FC<
    {
        className?: string;
    } & DesmosProfile
> = (props) => {
    const { t } = useTranslation('accounts');
    const { connectionsOpen, handleConnectionsClose, handleConnectionsOpen } = useDesmosProfile();

    return (
        <>
            <Box
                className={classnames(props.className)}
                sx={(theme) => ({
                    overflow: 'hidden',
                    '& .cover-wrapper': {
                        height: '150px',
                        background: theme.palette.custom.fonts.fontFour,
                        backgroundImage: 'url("/images/default_cover_pattern.png")',
                        backgroundRepeat: 'repeat',
                        backgroundPosition: 'center center',
                        margin: theme.spacing(-2, -2, 0, -2),
                        overflow: 'hidden',
                        backgroundSize: 'contain',
                        [theme.breakpoints.up('sm')]: {
                            height: '200px'
                        },
                        [theme.breakpoints.up('md')]: {
                            height: '300px'
                        },
                        [theme.breakpoints.up('lg')]: {
                            height: '360px'
                        }
                    },
                    '& .cover': {
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${props.coverUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center'
                    },
                    '& .avatar-container': {
                        position: 'relative',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        padding: theme.spacing(1, 0),
                        [theme.breakpoints.up('md')]: {
                            paddingBottom: theme.spacing(2)
                        },
                        [theme.breakpoints.up('lg')]: {
                            paddingBottom: theme.spacing(3.5)
                        }
                    },
                    '& .profile-avatar': {
                        position: 'absolute',
                        width: '75px',
                        height: '75px',
                        minHeight: '75px',
                        minWidth: '75px',
                        border: `solid 3px ${theme.palette.background.paper}`,
                        top: theme.spacing(-4),
                        left: 0,
                        [theme.breakpoints.up('md')]: {
                            width: '115px',
                            height: '115px',
                            minHeight: '115px',
                            minWidth: '115px',
                            top: theme.spacing(-8),
                            borderWidth: '4px'
                        },
                        [theme.breakpoints.up('lg')]: {
                            width: '150px',
                            height: '150px',
                            minHeight: '150px',
                            minWidth: '150px',
                            top: theme.spacing(-11),
                            borderWidth: '5px'
                        }
                    },
                    '& .profile-link': {
                        color: theme.palette.custom.fonts.highlight,
                        '&:hover': {
                            cursor: 'pointer'
                        },
                        visibility: props.connections.length ? 'visible' : 'hidden'
                    },
                    '& .nickname-wrapper': {
                        margin: theme.spacing(1, 0)
                    },
                    '& .tag': {
                        color: theme.palette.custom.fonts.fontFour
                    }
                })}
            >
                <div className="cover-wrapper">
                    <div className="cover" />
                </div>

                <div className="avatar-container">
                    <Avatar address={props.dtag} imageUrl={props.imageUrl} className="profile-avatar" />
                    <Typography variant="body1" className="profile-link" onClick={handleConnectionsOpen} role="button">
                        {t('connections', {
                            connections: numeral(props.connections.length).format('0,0')
                        })}
                    </Typography>
                </div>
                <div className="nickname-wrapper">
                    <Typography variant="h2">{props.nickname}</Typography>
                    <Typography variant="body2" className="tag">
                        @{props.dtag}
                    </Typography>
                </div>
                {props.bio && (
                    <div>
                        <Markdown markdown={props.bio} />
                    </div>
                )}
            </Box>
            <Connections open={connectionsOpen} handleClose={handleConnectionsClose} data={props.connections} />
        </>
    );
};

export default DesmosProfile;
