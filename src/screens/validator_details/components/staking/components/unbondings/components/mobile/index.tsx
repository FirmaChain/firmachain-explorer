import { Fragment } from 'react';
import { AvatarName } from '@components';
import { Box, Divider, Typography } from '@mui/material';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { formatNumber } from '@utils/format_token';
import { readDate, useSettingsStore } from '@zustand/settings';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ItemType } from '../../types';

const Mobile = ({ className, items }: { className?: string; items: ItemType[] }) => {
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
        <Box className={clsx(className)}>
            {formattedItems.map((x, i) => {
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
                    </Fragment>
                );
            })}
        </Box>
    );
};

export default Mobile;
