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

  return (
    <div style={{ overflow: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('subspace')}</TableCell>
            <TableCell>{t('key')}</TableCell>
            <TableCell>{t('value')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paramsEntries.map(([key, value], index) => (
            <TableRow key={key}>
              {index === 0 ? (
                <TableCell
                  rowSpan={paramsEntries.length}
                  style={{ verticalAlign: 'top' }}
                >
                  {moduleName}
                </TableCell>
              ) : null}
              <TableCell>{key}</TableCell>
              <TableCell>{safeToString(value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ParamsChangeV5;
