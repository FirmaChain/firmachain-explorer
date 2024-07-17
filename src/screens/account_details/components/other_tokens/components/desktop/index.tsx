import React from 'react';
import classnames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { OtherTokenType } from '@src/screens/account_details/types';
import { formatNumber } from '@utils/format_token';
import { columns } from './utils';
import { ibcConfig, tokenConfig } from '@configs';
import Big from 'big.js';

const Desktop: React.FC<{
  className?: string;
  items?: OtherTokenType[];
}> = ({ className, items }) => {
  const { t } = useTranslation('accounts');

  const formattedItems = items.map((x) => {
    let available = { value: x.available.value, exponent: x.available.exponent };
    let token = x.denom.toUpperCase();

    if (tokenConfig[x.denom]) {
      token = tokenConfig[x.denom].display.toUpperCase();
      available.value = Big(x.available.value)
        .div(10 ** tokenConfig[x.denom].exponent)
        .toFixed(tokenConfig[x.denom].exponent);
      available.exponent = tokenConfig[x.denom].exponent;
    } else if (ibcConfig[x.denom]) {
      token = ibcConfig[x.denom].display.toUpperCase();
      available.value = Big(x.available.value)
        .div(10 ** ibcConfig[x.denom].exponent)
        .toFixed(ibcConfig[x.denom].exponent);
      available.exponent = ibcConfig[x.denom].exponent;
    }
    return {
      token,
      commission: formatNumber(x.commission.value, x.commission.exponent),
      available: formatNumber(available.value, available.exponent),
      reward: formatNumber(x.reward.value, x.reward.exponent),
    };
  });

  return (
    <div className={classnames(className)}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableCell key={column.key} align={column.align} style={{ width: `${column.width}%` }}>
                  {t(column.key)}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedItems.map((row, i) => (
            <TableRow key={`holders-row-${i}`}>
              {columns.map((column) => {
                return (
                  <TableCell
                    key={`holders-row-${i}-${column.key}`}
                    align={column.align}
                    style={{ width: `${column.width}%` }}
                  >
                    {row[column.key]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Desktop;
