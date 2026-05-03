import { Fragment } from 'react';
import { AvatarName } from '@components';
import { Box, Divider, Typography } from '@mui/material';
import { formatNumber } from '@utils/format_token';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { ItemType } from '../../types';

interface Props {
    className?: string;
    items?: ItemType[];
}

const Mobile = ({ className, items }: Props) => {
    const { t } = useTranslation('accounts');

    return (
        <Box className={clsx(className)}>
            {items?.map((x, i, arr) => {
                return (
                    <Fragment key={`votes-mobile-${i}`}>
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
                                    {t('address')}
                                </Typography>
                                <AvatarName name={x.address.name} address={x.address.address} imageUrl={x.address.imageUrl} />
                            </Box>
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
                                    {t('amount')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {formatNumber(x.amount.value, x.amount.exponent)} {x.amount.displayDenom.toUpperCase()}
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
