import React from 'react';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { Divider, Typography } from '@material-ui/core';
import { OtherTokenType } from '@src/screens/account_details/types';
import { formatNumber } from '@utils/format_token';
import { useStyles } from './styles';
import { ibcConfig, tokenConfig } from '@src/configs';
import Big from 'big.js';

const Mobile: React.FC<{
  className?: string;
  items?: OtherTokenType[];
}> = ({ className, items }) => {
  const classes = useStyles();
  const { t } = useTranslation('accounts');
  return (
    <div className={classnames(className)}>
      {items.map((x, i) => {
        let availables = { value: x.available.value, exponent: x.available.exponent };
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
                <Typography variant='h4' className='label'>
                  {t('token')}
                </Typography>
                <Typography variant='body1' className='value'>
                  {x.denom.toUpperCase()}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography variant='h4' className='label'>
                  {t('available')}
                </Typography>
                <Typography variant='body1' className='value'>
                  {available}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography variant='h4' className='label'>
                  {t('reward')}
                </Typography>
                <Typography variant='body1' className='value'>
                  {reward}
                </Typography>
              </div>
              <div className={classes.item}>
                <Typography variant='h4' className='label'>
                  {t('commission')}
                </Typography>
                <Typography variant='body1' className='value'>
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
