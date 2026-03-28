import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Avatar, Box, Markdown } from '@components';
import { Divider, Typography } from '@mui/material';
import { useProfileRecoil } from '@recoil/profiles';
import classnames from 'classnames';

import { OverviewType } from '../../types';
import { useStyles } from './styles';

const Profile: React.FC<{ profile: OverviewType } & ComponentDefault> = ({ className, profile }) => {
    const classes = useStyles();
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
        <Box className={classnames(className)}>
            <div className={classes.bio}>
                <Avatar
                    address={profile.operatorAddress}
                    imageUrl={validator.imageUrl}
                    className={classnames(classes.avatar, classes.desktopAvatar)}
                />
                <div>
                    <div className="bio__header">
                        {/* ======================== */}
                        {/* mobile header */}
                        {/* ======================== */}
                        <div className={classes.header}>
                            <Avatar
                                address={profile.operatorAddress}
                                imageUrl={validator.imageUrl}
                                className={classnames(classes.avatar, classes.mobile)}
                            />
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

            <Divider className={classes.divider} />
            <div>
                <div className={classes.item}>
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
