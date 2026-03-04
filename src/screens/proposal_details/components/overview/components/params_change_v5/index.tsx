import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {
  extractModuleName, safeToString,
} from './utlities';

const ParamsChangeV5: React.FC<{
  className?: string;
  content: {
    '@type': string;
    authority: string;
    params: Record<string, any>;
  };
}> = ({ content }) => {
  const { t } = useTranslation('proposals');

  const moduleName = extractModuleName(content['@type']);
  const paramsEntries = Object.entries(content.params);

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
          {paramsEntries.map(([key, value], index) => (
            <TableRow key={key}>
              {index === 0 ? (
                <TableCell
                  rowSpan={paramsEntries.length}
                  style={{ verticalAlign: 'top', width: colWidth.first }}
                >
                  {moduleName}
                </TableCell>
              ) : null}
              <TableCell style={{ width: colWidth.second }}>{key}</TableCell>
              <TableCell style={{ width: colWidth.third }}>{safeToString(value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ParamsChangeV5;
