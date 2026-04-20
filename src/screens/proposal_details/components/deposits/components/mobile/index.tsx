import React from 'react';
import { AvatarName } from '@components';
import { Box, Divider, Typography } from '@mui/material';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { formatNumber } from '@utils/format_token';
import { readDate, useSettingsStore } from '@zustand/settings';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import { ItemType } from '../../types';

const Mobile: React.FC<{
    className?: string;
    items?: ItemType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('proposals');
    const dateFormat = useSettingsStore(readDate);

    const formattedItems = items.map((x) => {
        return {
            depositor: (
                <>{x.user.address ? <AvatarName address={x.user.address} imageUrl={x.user.imageUrl} name={x.user.name} /> : <>-</>}</>
            ),
            amount: `${formatNumber(x.amount.value, x.amount.exponent)} ${x.amount.displayDenom.toUpperCase()}`,
            time: formatDayJs(dayjs.utc(x.timestamp), dateFormat)
        };
    });

    return (
        <Box className={classnames(className)}>
            {formattedItems.map((x, i) => {
                return (
                    <React.Fragment key={`depositors-mobile-${i}`}>
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
                                    {t('depositor')}
                                </Typography>
                                {x.depositor}
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
                                    {t('amount')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {x.amount}
                                </Typography>
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
                                    {t('time')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {x.time}
                                </Typography>
                            </Box>
                        </Box>
                        {i !== items.length - 1 && <Divider />}
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export default Mobile;
