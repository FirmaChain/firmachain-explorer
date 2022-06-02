import React from 'react';
import classnames from 'classnames';
import numeral from 'numeral';
import useTranslation from 'next-translate/useTranslation';
import { SingleBlock } from './components';
import { useStyles } from './styles';
import { useDataBlocks } from './hooks';
import { useRecoilValue } from 'recoil';
import { readMarket } from '@recoil/market';

const DataBlocks: React.FC<{
  className?: string;
}> = ({
  className,
}) => {
  const { t } = useTranslation('home');
  const classes = useStyles();
  const { state } = useDataBlocks();
  const marketState = useRecoilValue(readMarket);
  
  const data = [
    {
      key: t('latestBlock'),
      value: numeral(state.blockHeight).format('0,0'),
      className: classes.blockHeight,
    },
    {
      key: t('averageBlockTime'),
      value: `${numeral(state.blockTime).format('0.00')} s`,
      className: classes.blockTime,
    },
    // {
    //   key: t('price'),
    //   value: state.price !== null ? `$${numeral(state.price).format('0.00')}` : 'N/A',
    //   className: classes.price,
    // },
    {
      key: t('inflationRate'),
      value: `${numeral(Number(marketState.inflation) * 100).format('0.00')} %`,
      className: classes.price,
    },
    {
      key: t('activeValidators'),
      value: numeral(state.validators.active).format('0,0'),
      description: t('outOfValidators', {
        count: numeral(state.validators.total).format('0,0'),
      }),
      className: classes.validators,
    },
  ];

  return (
    <div className={classnames(classes.root, className)}>
      {data.map((x) => (
        <SingleBlock
          key={x.key}
          label={x.key}
          value={x.value}
          description={x.description}
          className={x.className}
        />
      ))}
    </div>
  );
};

export default DataBlocks;
