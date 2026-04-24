import React from 'react';
import { useGrid } from '@hooks';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Grid, useGridRef, type CellComponentProps } from 'react-window';

import { columns, formatRows } from './utils';

type DesktopProps = {
    className?: string;
    signatures: AvatarName[];
};

type HeaderCellProps = {
    t: ReturnType<typeof useTranslation<'blocks'>>['t'];
};

type BodyCellProps = {
    rows: ReturnType<typeof formatRows>;
};

function useElementSize<T extends HTMLElement>() {
    const ref = React.useRef<T | null>(null);
    const [size, setSize] = React.useState({ width: 0, height: 0 });

    React.useLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        const updateSize = () => {
            const rect = element.getBoundingClientRect();

            setSize((prev) => {
                const next = {
                    width: Math.ceil(rect.width),
                    height: Math.ceil(rect.height)
                };

                if (prev.width === next.width && prev.height === next.height) {
                    return prev;
                }

                return next;
            });
        };

        updateSize();

        const observer = new ResizeObserver(() => {
            updateSize();
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return { ref, size };
}

const HeaderCell = ({ columnIndex, style, t }: CellComponentProps<HeaderCellProps>) => {
    const { key, align } = columns[columnIndex];

    return (
        <Box style={style} sx={(theme) => ({ ...theme.mixins.tableCell })}>
            <Typography variant="h4" align={align}>
                {t(key)}
            </Typography>
        </Box>
    );
};

const BodyCell = ({ columnIndex, rowIndex, style, rows }: CellComponentProps<BodyCellProps>) => {
    const { key, align } = columns[columnIndex];
    const selectedItem = rows[rowIndex][key];

    return (
        <Box
            style={style}
            sx={(theme) => ({
                ...theme.mixins.tableCell,
                color: theme.palette.custom.fonts.fontTwo,
                py: 2
            })}
        >
            <Typography variant="body1" align={align} component="div">
                {selectedItem}
            </Typography>
        </Box>
    );
};

const Desktop: React.FC<DesktopProps> = ({ className, signatures }) => {
    const { t } = useTranslation('blocks');
    const { gridRef, columnRef, getColumnWidth, getRowHeight } = useGrid(columns);
    const { ref, size } = useElementSize<HTMLDivElement>();
    const headerGridRef = useGridRef();

    const rows = React.useMemo(() => formatRows(signatures), [signatures]);

    const handleBodyScroll = ({ scrollLeft }: { scrollLeft: number; scrollTop: number }) => {
        const headerElement = (headerGridRef.current as any)?.element;
        if (headerElement) {
            headerElement.scrollLeft = scrollLeft;
        }
    };

    if (size.width === 0 || size.height === 0) {
        return <Box ref={ref} className={clsx(className)} sx={{ height: '100%' }} />;
    }

    return (
        <Box
            ref={ref}
            className={clsx(className)}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0
            }}
        >
            <Box sx={{ height: 50, flex: '0 0 auto', overflow: 'hidden' }}>
                <Grid
                    ref={(instance) => {
                        headerGridRef.current = instance;
                        if (typeof columnRef === 'function') {
                            columnRef(instance);
                        } else if (columnRef) {
                            (columnRef as React.MutableRefObject<any>).current = instance;
                        }
                    }}
                    cellComponent={HeaderCell}
                    cellProps={{ t }}
                    columnCount={columns.length}
                    columnWidth={(index) => getColumnWidth(size.width, index)}
                    rowCount={1}
                    rowHeight={50}
                    style={{ width: size.width, height: 50, overflow: 'hidden' }}
                />
            </Box>

            <Box sx={{ flex: '1 1 auto', minHeight: 0 }}>
                <Grid
                    ref={(instance) => {
                        if (typeof gridRef === 'function') {
                            gridRef(instance);
                        } else if (gridRef) {
                            (gridRef as React.MutableRefObject<any>).current = instance;
                        }
                    }}
                    cellComponent={BodyCell}
                    cellProps={{ rows }}
                    columnCount={columns.length}
                    columnWidth={(index) => getColumnWidth(size.width, index)}
                    onScroll={handleBodyScroll}
                    rowCount={rows.length}
                    rowHeight={getRowHeight}
                    style={{ width: size.width, height: size.height - 50 }}
                />
            </Box>
        </Box>
    );
};

export default Desktop;
