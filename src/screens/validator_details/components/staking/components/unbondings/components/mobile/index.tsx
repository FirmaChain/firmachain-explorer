import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { AvatarName } from '@components';
import { Box, Divider, Typography } from '@mui/material';
import { useSettingsStore,  readDate  } from '@zustand/settings';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { formatNumber } from '@utils/format_token';
import classnames from 'classnames';

import { ItemType } from '../../types';

const Mobile: React.FC<{
    className?: string;
    items: ItemType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('accounts');
    const dateFormat = useSettingsStore(readDate);
    const formattedItems = items.map((x) => {
        return {
            address: <AvatarName address={x.address.address} imageUrl={x.address.imageUrl} name={x.address.name} />,
            amount: `${formatNumber(x.amount.value, x.amount.exponent)} ${x.amount.displayDenom.toUpperCase()}`,
            completionTime: formatDayJs(dayjs.utc(x.completionTime), dateFormat)
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
                                    {t('address')}
                                </Typography>
                                {x.address}
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
                                    {t('completionTime')}
                                </Typography>
                                {x.completionTime}
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
                                {x.amount}
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
