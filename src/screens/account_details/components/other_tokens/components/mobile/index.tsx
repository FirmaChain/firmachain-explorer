import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { ibcConfig, tokenConfig } from '@/configs';
import { OtherTokenType } from '@/screens/account_details/types';
import { Box, Divider, Typography } from '@mui/material';
import { formatNumber } from '@utils/format_token';
import Big from 'big.js';
import classnames from 'classnames';

const Mobile: React.FC<{
    className?: string;
    items?: OtherTokenType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('accounts');
    return (
        <Box className={classnames(className)}>
            {items.map((x, i) => {
                let availables = {
                    value: x.available.value,
                    exponent: x.available.exponent
                };
                let token = x.denom.toUpperCase();

                console.log(token);
                console.log(x);

                if (tokenConfig[x.denom]) {
                    token = tokenConfig[x.denom].display.toUpperCase();
                    availables.value = Big(x.available.value).toFixed(tokenConfig[x.denom].exponent);
                    availables.exponent = tokenConfig[x.denom].exponent;

                    x.denom = tokenConfig[x.denom].display.toUpperCase();
                } else if (ibcConfig[x.denom]) {
                    token = ibcConfig[x.denom].display.toUpperCase();
                    availables.value = Big(x.available.value).toFixed(ibcConfig[x.denom].exponent);
                    availables.exponent = ibcConfig[x.denom].exponent;

                    x.denom = ibcConfig[x.denom].display.toUpperCase();
                }

                const available = formatNumber(availables.value, availables.exponent);
                const reward = formatNumber(x.reward.value, x.reward.exponent);
                const commission = formatNumber(x.commission.value, x.commission.exponent);
                return (
                    <React.Fragment key={`votes-mobile-${i}`}>
                        <Box sx={{ my: 2, width: '100%' }}>
                            <Box
                                sx={(theme) => ({
                                    mb: 2,
                                    '& .label': { mb: 1, color: theme.palette.custom.fonts.fontThree },
                                    '& p.value': { color: theme.palette.custom.fonts.fontTwo, wordBreak: 'break-all' },
                                    '& a': { color: theme.palette.custom.fonts.highlight }
                                })}
                            >
                                <Typography variant="h4" className="label">
                                    {t('token')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {x.denom.toUpperCase()}
                                </Typography>
                            </Box>
                            <Box
                                sx={(theme) => ({
                                    mb: 2,
                                    '& .label': { mb: 1, color: theme.palette.custom.fonts.fontThree },
                                    '& p.value': { color: theme.palette.custom.fonts.fontTwo, wordBreak: 'break-all' },
                                    '& a': { color: theme.palette.custom.fonts.highlight }
                                })}
                            >
                                <Typography variant="h4" className="label">
                                    {t('available')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {available}
                                </Typography>
                            </Box>
                            <Box
                                sx={(theme) => ({
                                    mb: 2,
                                    '& .label': { mb: 1, color: theme.palette.custom.fonts.fontThree },
                                    '& p.value': { color: theme.palette.custom.fonts.fontTwo, wordBreak: 'break-all' },
                                    '& a': { color: theme.palette.custom.fonts.highlight }
                                })}
                            >
                                <Typography variant="h4" className="label">
                                    {t('reward')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {reward}
                                </Typography>
                            </Box>
                            <Box
                                sx={(theme) => ({
                                    mb: 2,
                                    '& .label': { mb: 1, color: theme.palette.custom.fonts.fontThree },
                                    '& p.value': { color: theme.palette.custom.fonts.fontTwo, wordBreak: 'break-all' },
                                    '& a': { color: theme.palette.custom.fonts.highlight }
                                })}
                            >
                                <Typography variant="h4" className="label">
                                    {t('commission')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {commission}
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
