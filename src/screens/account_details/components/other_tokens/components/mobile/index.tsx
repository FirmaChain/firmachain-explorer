import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { ibcConfig, tokenConfig } from '@/configs';
import { OtherTokenType } from '@/screens/account_details/types';
import { Divider, Typography } from '@material-ui/core';
import { formatNumber } from '@utils/format_token';
import Big from 'big.js';
import classnames from 'classnames';

import { useStyles } from './styles';

const Mobile: React.FC<{
    className?: string;
    items?: OtherTokenType[];
}> = ({ className, items }) => {
    const classes = useStyles();
    const { t } = useTranslation('accounts');
    return (
        <div className={classnames(className)}>
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
                        <div className={classes.list}>
                            <div className={classes.item}>
                                <Typography variant="h4" className="label">
                                    {t('token')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {x.denom.toUpperCase()}
                                </Typography>
                            </div>
                            <div className={classes.item}>
                                <Typography variant="h4" className="label">
                                    {t('available')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {available}
                                </Typography>
                            </div>
                            <div className={classes.item}>
                                <Typography variant="h4" className="label">
                                    {t('reward')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {reward}
                                </Typography>
                            </div>
                            <div className={classes.item}>
                                <Typography variant="h4" className="label">
                                    {t('commission')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {commission}
                                </Typography>
                            </div>
                        </div>
                        {i !== items.length - 1 && <Divider />}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Mobile;
