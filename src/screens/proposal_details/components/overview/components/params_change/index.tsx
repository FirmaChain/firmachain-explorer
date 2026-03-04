import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const ParamsChange: React.FC<{
  className?: string;
  changes: {
    subspace: string;
    key: string;
    value: string;
  }[];
}> = ({
  changes,
}) => {
  const { t } = useTranslation('proposals');
  const colWidth = { first: '20%', second: '35%', third: '45%' };
  return (
    <div style={{ overflow: 'auto' }}>
      <Table style={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: colWidth.first }}>{t('subspace')}</TableCell>
            <TableCell style={{ width: colWidth.second }}>{t('key')}</TableCell>
            <TableCell style={{ width: colWidth.third }}>{t('value')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {changes.map((row) => (
            <TableRow key={row.key}>
              <TableCell style={{ width: colWidth.first }}>{row.subspace}</TableCell>
              <TableCell style={{ width: colWidth.second }}>{row.key}</TableCell>
              <TableCell style={{ width: colWidth.third }}>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ParamsChange;
