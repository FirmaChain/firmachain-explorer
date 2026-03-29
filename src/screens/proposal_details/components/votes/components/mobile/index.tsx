import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { AvatarName } from '@components';
import { Box, Divider, Typography } from '@mui/material';
import classnames from 'classnames';

import { ItemType } from '../../types';
import { getVoteKey } from '../../utils';

const Mobile: React.FC<{
    className?: string;
    items?: ItemType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('proposals');

    const formattedItems = items.map((x) => {
        return {
            voter: <AvatarName address={x.user.address} imageUrl={x.user.imageUrl} name={x.user.name} />,
            vote: t(getVoteKey(x.vote))
        };
    });

    return (
        <Box className={classnames(className)}>
            {formattedItems.map((x, i) => {
                return (
                    <React.Fragment key={`votes-mobile-${i}`}>
                        <Box sx={{ my: 2 }}>
                            <Box
                                sx={(theme) => ({
                                    mb: 2,
                                    '& .label': { mb: 1, color: theme.palette.custom.fonts.fontThree },
                                    '& p.value': { color: theme.palette.custom.fonts.fontTwo },
                                    '& a': { color: theme.palette.custom.fonts.highlight }
                                })}
                            >
                                <Typography variant="h4" className="label">
                                    {t('voter')}
                                </Typography>
                                {x.voter}
                            </Box>
                            {/* <div className={classes.item}>
                <Typography variant="h4" className="label">
                  {t('votingPower')}
                </Typography>
                <Typography variant="body1" className="value">
                  {x.votingPower}
                </Typography>
              </div> */}
                            <Box
                                sx={(theme) => ({
                                    mb: 2,
                                    '& .label': { mb: 1, color: theme.palette.custom.fonts.fontThree },
                                    '& p.value': { color: theme.palette.custom.fonts.fontTwo },
                                    '& a': { color: theme.palette.custom.fonts.highlight }
                                })}
                            >
                                <Typography variant="h4" className="label">
                                    {t('vote')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {x.vote}
                                </Typography>
                            </Box>
                        </Box>
                        {i !== formattedItems.length - 1 && <Divider />}
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export default Mobile;
