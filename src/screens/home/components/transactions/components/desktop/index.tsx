import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import Link from '@/adapters/routing/link';
import { Result } from '@components';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS, TRANSACTION_DETAILS } from '@utils/go_to_page';
import classnames from 'classnames';
import numeral from 'numeral';

import { getMessageByType } from '@/components/msg';

import { TransactionType } from '../../types';
import { useStyles } from './styles';
import { columns } from './utils';

const Desktop: React.FC<{
    className?: string;
    items: TransactionType[];
}> = ({ className, items }) => {
    const classes = useStyles();
    const { t } = useTranslation('transactions');

    const formattedData = items.map((x) => {
        x.type[0].type = x.type[0]['@type'];
        const tag = getMessageByType(x.type[0], true, t);

        return {
            block: (
                <Link href={BLOCK_DETAILS(x.height)} passHref>
                    <Typography variant="body1" component="a">
                        {numeral(x.height).format('0,0')}
                    </Typography>
                </Link>
            ),
            hash: (
                <Link href={TRANSACTION_DETAILS(x.hash)} passHref>
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
        <div className={classnames(className, classes.root)}>
            <Table className={classes.table}>
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
        </div>
    );
};

export default Desktop;
