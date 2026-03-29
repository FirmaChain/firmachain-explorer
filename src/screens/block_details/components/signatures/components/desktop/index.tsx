import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { useGrid } from '@hooks';
import { Box, Typography } from '@mui/material';
import classnames from 'classnames';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid as Grid } from 'react-window';

import { columns, formatRows } from './utils';

const Desktop: React.FC<{
    className?: string;
    signatures: AvatarName[];
}> = ({ className, signatures }) => {
    const { t } = useTranslation('blocks');
    const { gridRef, columnRef, onResize, getColumnWidth, getRowHeight } = useGrid(columns);
    const rows = formatRows(signatures);

    return (
        <Box className={classnames(className)} sx={{ height: '100%' }}>
            <AutoSizer onResize={onResize}>
                {({ height, width }) => {
                    return (
                        <>
                            {/* ======================================= */}
                            {/* Table Header */}
                            {/* ======================================= */}
                            <Grid
                                ref={columnRef}
                                columnCount={columns.length}
                                columnWidth={(index) => getColumnWidth(width, index)}
                                height={50}
                                rowCount={1}
                                rowHeight={() => 50}
                                width={width}
                            >
                                {({ columnIndex, style }) => {
                                    const { key, align } = columns[columnIndex];

                                    return (
                                        <Box style={style} sx={(theme: any) => ({ ...theme.mixins.tableCell })}>
                                            <Typography variant="h4" align={align}>
                                                {t(key)}
                                            </Typography>
                                        </Box>
                                    );
                                }}
                            </Grid>
                            {/* ======================================= */}
                            {/* Table Body */}
                            {/* ======================================= */}
                            <Grid
                                ref={gridRef}
                                columnCount={columns.length}
                                columnWidth={(index) => getColumnWidth(width, index)}
                                height={height - 50}
                                rowCount={rows.length}
                                rowHeight={getRowHeight}
                                width={width}
                            >
                                {({ columnIndex, rowIndex, style }) => {
                                    const { key, align } = columns[columnIndex];
                                    const selectedItem = rows[rowIndex][key];
                                    return (
                                        <Box
                                            style={style}
                                            sx={(theme: any) => ({
                                                ...theme.mixins.tableCell,
                                                color: theme.palette.custom.fonts.fontTwo
                                            })}
                                        >
                                            <Typography variant="body1" align={align} component="div">
                                                {selectedItem}
                                            </Typography>
                                        </Box>
                                    );
                                }}
                            </Grid>
                        </>
                    );
                }}
            </AutoSizer>
        </Box>
    );
};

export default Desktop;
