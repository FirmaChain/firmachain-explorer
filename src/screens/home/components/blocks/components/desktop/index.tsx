import React from 'react';
import { AvatarName } from '@components';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import dayjs from '@utils/dayjs';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { BLOCK_DETAILS } from '@utils/go_to_page';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { ItemType } from '../../types';
import { columns } from './utils';

const Desktop: React.FC<{
    className?: string;
    items: ItemType[];
}> = ({ className, items }) => {
    const { t } = useTranslation('blocks');

    const formattedData = items.map((x) => {
        return {
            height: (
                <Link to={BLOCK_DETAILS(x.height)}>
                    <Typography variant="body1" className="value" component="a">
                        {numeral(x.height).format('0,0')}
                    </Typography>
                </Link>
            ),
            txs: numeral(x.txs).format('0,0'),
            time: dayjs.utc(x.timestamp).fromNow(),
            proposer: <AvatarName address={x.proposer.address} imageUrl={x.proposer.imageUrl} name={x.proposer.name} />,
            hash: getMiddleEllipsis(x.hash, {
                beginning: 6,
                ending: 5
            })
        };
    });

    return (
        <Box
            className={clsx(className)}
            sx={(theme) => ({
                overflow: 'auto',
                '& a': {
                    color: theme.palette.custom.fonts.highlight
                },
                '& .MuiTableBody-root .MuiTableCell-root': {
                    whiteSpace: 'nowrap'
                }
            })}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.key} align={column.align}>
                                {t(column.key)}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {formattedData.map((row, i) => (
                        <TableRow key={`${items[i].height}`}>
                            {columns.map((column, index) => {
                                const { key, align } = column;
                                const item = row[key];
                                return (
                                    <TableCell align={align} key={`${key}-${index}`}>
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
