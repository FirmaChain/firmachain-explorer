import React from 'react';
// import * as R from 'ramda';
import classnames from 'classnames';
import {
  useChainContext,
} from '@contexts';
import useTranslation from 'next-translate/useTranslation';
import { Typography } from '@material-ui/core';
import getFirmaTitle from '@src/utils/get_firma_title';
// import { chainConfig } from '@configs';
import { useStyles } from './styles';
import { formatMarket } from './utils';

const TitleBar:React.FC<{
  className?: string;
  title: string;
}> = ({
  className, title,
}) => {
  // const { theme } = useSettingsContext();
  const { t } = useTranslation('common');
  const classes = useStyles();
  const { market: marketContext } = useChainContext();

  const market = formatMarket(marketContext);

  // const logoUrl = R.pathOr(chainConfig.logo.default, ['logo', theme], chainConfig);

  return (
    <div className={classnames(className, classes.root)}>
      {
      title
        ? <Typography variant="h1">{title}</Typography>
        : getFirmaTitle('title')
      }
      <div className={classes.content}>
        {market.map((x) => (
          <div key={x.key} className={classes.item}>
            <Typography variant="body1" className="label">
              {t(x.key)}
            </Typography>
            <Typography variant="body1">
              {x.data}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleBar;
