import React from 'react';
import { AvatarName } from '@components';
import { useList, useListRow } from '@hooks';
import { Box, Divider, Typography } from '@mui/material';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { List, type RowComponentProps } from 'react-window';

type SignatureItem = AvatarName;

type MobileProps = {
    className?: string;
    signatures?: SignatureItem[];
};

type RowProps = {
    items: SignatureItem[];
    setRowHeight: (index: number, size: number) => void;
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

const SignatureRow = ({ index, style, items, setRowHeight }: RowComponentProps<RowProps>) => {
    const { t } = useTranslation('blocks');
    const { rowRef } = useListRow(index, setRowHeight);
    const selectedItem = items[index];

    return (
        <div style={style}>
            <div ref={rowRef}>
                <Box sx={{ py: 2 }}>
                    <Box
                        sx={(theme) => ({
                            '& .label': {
                                mb: 1,
                                color: theme.palette.custom.fonts.fontThree
                            },
                            '& p.value': {
                                color: theme.palette.custom.fonts.fontTwo
                            },
                            '& a': {
                                color: theme.palette.custom.fonts.highlight
                            }
                        })}
                    >
                        <Typography variant="h4" className="label">
                            {t('validator')}
                        </Typography>
                        <AvatarName address={selectedItem.address} imageUrl={selectedItem.imageUrl} name={selectedItem.name} />
                    </Box>
                </Box>
                {index !== items.length - 1 && <Divider />}
            </div>
        </div>
    );
};

const Mobile: React.FC<MobileProps> = ({ className, signatures }) => {
    const { listRef, getRowHeight, setRowHeight } = useList();
    const { ref, size } = useElementSize<HTMLDivElement>();

    const items = React.useMemo(() => signatures ?? [], [signatures]);

    return (
        <Box ref={ref} className={classnames(className)} sx={{ height: '100%', minHeight: 0 }}>
            {size.width > 0 && size.height > 0 ? (
                <List<RowProps>
                    className="List"
                    listRef={listRef}
                    rowComponent={SignatureRow}
                    rowCount={items.length}
                    rowHeight={getRowHeight}
                    rowProps={{
                        items,
                        setRowHeight
                    }}
                    style={{
                        width: size.width,
                        height: size.height
                    }}
                />
            ) : null}
        </Box>
    );
};

export default Mobile;
