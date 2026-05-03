import { Fragment } from 'react';
import { AvatarName } from '@components';
import { Box, Divider, Typography } from '@mui/material';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ItemType } from '../../types';
import { getVoteKey } from '../../utils';

interface Props {
    className?: string;
    items?: ItemType[];
}

const Mobile = ({ className, items }: Props) => {
    const { t } = useTranslation('proposals');

    const formattedItems = items?.map((x) => {
        return {
            voter: <AvatarName address={x.user.address} imageUrl={x.user.imageUrl} name={x.user.name} />,
            vote: t(getVoteKey(x.vote))
        };
    });

    return (
        <Box className={clsx(className)}>
            {formattedItems?.map((x, i, arr) => {
                return (
                    <Fragment key={`votes-mobile-${i}`}>
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
                        {i !== arr.length - 1 && <Divider />}
                    </Fragment>
                );
            })}
        </Box>
    );
};

export default Mobile;
