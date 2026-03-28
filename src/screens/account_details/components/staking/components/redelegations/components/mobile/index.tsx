import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { AvatarName } from '@components';
import { Divider, Typography } from '@mui/material';
import { readDate } from '@recoil/settings';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { formatNumber } from '@utils/format_token';
import classnames from 'classnames';
import { useRecoilValue } from 'recoil';

import { ItemType } from '../../types';
import { useStyles } from './styles';

const Mobile: React.FC<{
    className?: string;
    items?: ItemType[];
}> = ({ className, items }) => {
    const classes = useStyles();
    const { t } = useTranslation('accounts');
    const dateFormat = useRecoilValue(readDate);
    const formattedItems = items.map((x) => {
        return {
            to: <AvatarName address={x.to.address} imageUrl={x.to.imageUrl} name={x.to.name} />,
            from: <AvatarName address={x.from.address} imageUrl={x.from.imageUrl} name={x.from.name} />,
            amount: `${formatNumber(x.amount.value, x.amount.exponent)} ${x.amount.displayDenom.toUpperCase()}`,
            completionTime: formatDayJs(dayjs.utc(x.completionTime), dateFormat)
        };
    });

    return (
        <div className={classnames(className)}>
            {formattedItems.map((x, i) => {
                return (
                    <React.Fragment key={`votes-mobile-${i}`}>
                        <div className={classes.list}>
                            <div className={classes.item}>
                                <Typography variant="h4" className="label">
                                    {t('from')}
                                </Typography>
                                {x.from}
                            </div>
                            <div className={classes.item}>
                                <Typography variant="h4" className="label">
                                    {t('to')}
                                </Typography>
                                {x.to}
                            </div>
                            <div className={classes.item}>
                                <Typography variant="h4" className="label">
                                    {t('completionTime')}
                                </Typography>
                                {x.completionTime}
                            </div>
                            <div className={classes.item}>
                                <Typography variant="h4" className="label">
                                    {t('amount')}
                                </Typography>
                                {x.amount}
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
