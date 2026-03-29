import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { AvatarName } from '@components';
import { Box, Divider, Typography } from '@mui/material';
import { formatNumber } from '@utils/format_token';
import classnames from 'classnames';

import { ItemType } from '../../types';

const Mobile: React.FC<{
    className?: string;
    items?: ItemType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('accounts');

    return (
        <Box className={classnames(className)}>
            {items.map((x, i) => {
                return (
                    <React.Fragment key={`votes-mobile-${i}`}>
                        <Box sx={{ my: 2 }}>
                            <Box
                                sx={(theme) => ({
                                    mb: 2,
                                    '& .label': { mb: 1, color: theme.palette.custom.fonts.fontThree },
                                    '& p.value': {
                                        color: theme.palette.custom.fonts.fontTwo,
                                        '&.unknown': { color: theme.palette.custom.condition.zero },
                                        '&.unbonded': { color: theme.palette.custom.condition.zero },
                                        '&.active': { color: theme.palette.custom.condition.one },
                                        '&.jailed': { color: theme.palette.custom.condition.two },
                                        '&.unbonding': { color: theme.palette.custom.condition.three }
                                    },
                                    '& a': { color: theme.palette.custom.fonts.highlight }
                                })}
                            >
                                <Typography variant="h4" className="label">
                                    {t('validator')}
                                </Typography>
                                <AvatarName name={x.validator.name} address={x.validator.address} imageUrl={x.validator.imageUrl} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', '& > div': { width: '50%' } }}>
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
                                        {formatNumber(x.amount.value, x.amount.exponent)} {x.amount.displayDenom.toUpperCase()}
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
                                        {t('reward')}
                                    </Typography>
                                    <Typography variant="body1" className="value">
                                        {formatNumber(x.reward.value, x.reward.exponent)} {x.reward.displayDenom.toUpperCase()}
                                    </Typography>
                                </Box>
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
