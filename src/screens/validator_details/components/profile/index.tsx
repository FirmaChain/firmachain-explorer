import { Avatar, Box, Markdown } from '@components';
import { Divider, Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { OverviewType } from '../../types';

interface Props extends ComponentDefault {
    profile: OverviewType;
}

const Profile = ({ className, profile }: Props) => {
    const { t } = useTranslation('validators');
    const validator = useProfileRecoil(profile.validator);

    const pattern = /^((http|https|ftp):\/\/)/;
    let { website } = profile;

    if (!pattern.test(profile.website)) {
        website = `//${profile.website}`;
    }

    const formattedItem = {
        website: (
            <Typography variant="body1" className="value" component="a" href={website} target="_blank" rel="noreferrer">
                {profile.website}
            </Typography>
        )
    };

    return (
        <Box
            className={clsx(className)}
            sx={(theme) => ({
                '& .bio': {
                    display: 'flex',
                    '& .bio__header': {
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        flexDirection: 'column'
                    },
                    '& .bio__content': {
                        marginTop: theme.spacing(2),
                        color: theme.palette.custom.fonts.fontTwo,
                        [theme.breakpoints.up('lg')]: { marginTop: theme.spacing(1) }
                    }
                },
                '& .avatar': {
                    width: '60px',
                    height: '60px',
                    minHeight: '60px',
                    minWidth: '60px'
                },
                '& .header': {
                    display: 'flex',
                    alignItems: 'center',
                    '& .header__content': { marginLeft: theme.spacing(1) },
                    '& .MuiTypography-h2': { marginBottom: theme.spacing(1) },
                    [theme.breakpoints.up('lg')]: {
                        '& .header__content': {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            marginLeft: 0,
                            '& .MuiTypography-h2': { marginRight: theme.spacing(2), marginBottom: 0 }
                        }
                    }
                },
                '& .desktopAvatar': {
                    display: 'none',
                    [theme.breakpoints.up('lg')]: { display: 'block', marginRight: theme.spacing(2) }
                },
                '& .mobile': { [theme.breakpoints.up('lg')]: { display: 'none' } },
                '& .divider': { margin: theme.spacing(2, 0), [theme.breakpoints.up('lg')]: { margin: theme.spacing(4, 0) } },
                '& .item': {
                    '&:not(:last-child)': { marginBottom: theme.spacing(2) },
                    '& .label': {
                        marginBottom: theme.spacing(1),
                        color: theme.palette.custom.fonts.fontThree,
                        [theme.breakpoints.up('lg')]: { marginBottom: 0 }
                    },
                    '& p.value': { color: theme.palette.custom.fonts.fontTwo },
                    '& a': { color: theme.palette.custom.fonts.highlight },
                    [theme.breakpoints.up('lg')]: {
                        display: 'grid',
                        gridTemplateColumns: '200px auto',
                        gap: theme.spacing(2),
                        alignItems: 'center'
                    }
                }
            })}
        >
            <div className="bio">
                <Avatar address={profile.operatorAddress} imageUrl={validator.imageUrl} className={clsx('avatar', 'desktopAvatar')} />
                <div>
                    <div className="bio__header">
                        {/* ======================== */}
                        {/* mobile header */}
                        {/* ======================== */}
                        <div className="header">
                            <Avatar address={profile.operatorAddress} imageUrl={validator.imageUrl} className={clsx('avatar', 'mobile')} />
                            <div className="header__content">
                                <Typography variant="h2">{validator.name}</Typography>
                            </div>
                        </div>
                    </div>
                    {/* ======================== */}
                    {/* bio */}
                    {/* ======================== */}
                    {profile.description && (
                        <div className="bio__content">
                            <Markdown markdown={profile.description} />
                        </div>
                    )}
                </div>
            </div>

            <Divider className="divider" />
            <div>
                <div className="item">
                    <Typography variant="h4" className="label">
                        {t('website')}
                    </Typography>
                    {formattedItem.website}
                </div>
            </div>
        </Box>
    );
};

export default Profile;
