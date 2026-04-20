import React from 'react';
import { Result } from '@components';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS, TRANSACTION_DETAILS } from '@utils/go_to_page';
import classnames from 'classnames';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { getMessageByType } from '@/components/msg';

import { TransactionType } from '../../types';
import { columns } from './utils';

const Desktop: React.FC<{
    className?: string;
    items: TransactionType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('transactions');

    const formattedData = items.map((x) => {
        x.type[0].type = x.type[0]['@type'];
        const tag = getMessageByType(x.type[0], true, t);

        return {
            block: (
                <Link to={BLOCK_DETAILS(x.height)}>
                    <Typography variant="body1" component="a">
                        {numeral(x.height).format('0,0')}
                    </Typography>
                </Link>
            ),
            hash: (
                <Link to={TRANSACTION_DETAILS(x.hash)}>
                    <Typography variant="body1" component="a">
                        {getMiddleEllipsis(x.hash, {
                            beginning: 15,
                            ending: 5
                        })}
                    </Typography>
                </Link>
            ),
            result: <Result success={x.success} />,
            time: dayjs.utc(x.timestamp).fromNow(),
            messages: numeral(x.messages).format('0,0'),
            type: (
                <Typography variant="body1" component="a">
                    {tag.type}
                </Typography>
            )
        };
    });

    return (
        <Box
            className={classnames(className)}
            sx={{
                overflow: 'auto',
                '& .MuiTableBody-root .MuiTableCell-root': {
                    whiteSpace: 'nowrap'
                }
            }}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.key} align={column.align} style={{ width: `${column.width}%` }}>
                                {t(column.key)}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {formattedData.map((row, i) => (
                        <TableRow key={`row-${i}`}>
                            {columns.map((column, index) => {
                                const { key, align } = column;
                                const item = row[key];
                                return (
                                    <TableCell style={{ width: `${column.width}%` }} align={align} key={`${key}-${index}`}>
                                        {item}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default Desktop;
