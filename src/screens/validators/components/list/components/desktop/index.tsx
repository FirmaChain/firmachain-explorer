import React from 'react';
import { AvatarName, InfoPopover, SortArrows } from '@components';
import { useGrid, useList, useListRow } from '@hooks';
import { Box, Typography } from '@mui/material';
import { getValidatorConditionClass } from '@utils/get_validator_condition';
import { getValidatorStatus } from '@utils/get_validator_status';
import classnames from 'classnames';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { List, type RowComponentProps } from 'react-window';

import { Condition, VotingPower, VotingPowerExplanation } from '..';
import { ItemType } from '../../types';
import { fetchColumns } from './utils';

type DesktopProps = {
    className?: string;
    sortDirection: 'desc' | 'asc';
    sortKey: string;
    handleSort: (key: string) => void;
    items: ItemType[];
};

type FormattedItem = {
    idx: string;
    validator: React.ReactNode;
    commission: string;
    condition: React.ReactNode;
    votingPower: React.ReactNode;
    status: React.ReactNode;
};

type RowProps = {
    items: FormattedItem[];
    columns: ReturnType<typeof fetchColumns>;
    templateColumns: string;
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

const ValidatorRow = ({ index, style, items, columns, templateColumns, setRowHeight }: RowComponentProps<RowProps>) => {
    const { rowRef } = useListRow(index, setRowHeight);
    const item = items[index];

    return (
        <div style={style}>
            <div ref={rowRef}>
                <Box
                    className={classnames('cell', 'body', {
                        odd: !(index % 2)
                    })}
                    sx={{ py: 2 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: templateColumns
                    }}
                >
                    {columns.map(({ key, align }) => (
                        <Typography key={key} variant="body1" align={align} component="div">
                            {item[key as keyof FormattedItem]}
                        </Typography>
                    ))}
                </Box>
            </div>
        </div>
    );
};

const DEFAULT_ROW_HEIGHT = 50;

const Desktop: React.FC<DesktopProps> = (props) => {
    const { t } = useTranslation('validators');
    const columns = React.useMemo(() => fetchColumns(t), [t]);
    const { getColumnWidth } = useGrid(columns);
    const { listRef, setRowHeight } = useList();
    const { ref, size } = useElementSize<HTMLDivElement>();

    const formattedItems = React.useMemo<FormattedItem[]>(() => {
        return props.items.map((x, i) => {
            const status = getValidatorStatus(x.status, x.jailed, x.tombstoned);
            const condition = x.status === 3 ? getValidatorConditionClass(x.condition) : undefined;
            const percentDisplay = x.status === 3 ? `${numeral(x.votingPowerPercent).format('0.[00]')}%` : '0%';
            const votingPower = numeral(x.votingPower).format('0,0');

            return {
                idx: `#${i + 1}`,
                validator: <AvatarName address={x.validator.address} imageUrl={x.validator.imageUrl} name={x.validator.name} />,
                commission: x.commission === null ? 'N/A' : `${numeral(x.commission).format('0.[00]')}%`,
                condition: <Condition className={condition} />,
                votingPower: (
                    <VotingPower
                        percentDisplay={percentDisplay}
                        percentage={x.votingPowerPercent}
                        content={votingPower}
                        topVotingPower={x.topVotingPower}
                    />
                ),
                status: (
                    <Typography variant="body1" className={classnames('status', status.theme)}>
                        {t(status.status)}
                    </Typography>
                )
            };
        });
    }, [props.items, t]);

    const templateColumns = React.useMemo(() => {
        if (size.width === 0) return '';

        return columns.map((_, index) => `${Math.floor(getColumnWidth(size.width, index))}px`).join(' ');
    }, [columns, getColumnWidth, size.width]);

    return (
        <Box
            ref={ref}
            className={classnames(props.className)}
            sx={(theme) => ({
                height: '100%',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                '& .status.one': { color: theme.palette.custom.tags.one },
                '& .status.two': { color: theme.palette.custom.tags.two },
                '& .status.three': { color: theme.palette.custom.tags.three },
                '& .status.zero': { color: theme.palette.custom.tags.zero },
                '& .cell': {
                    ...theme.mixins.tableCell,
                    '&.sort:hover': {
                        cursor: 'pointer'
                    }
                },
                '& .flexCells > *': {
                    display: 'flex',
                    alignItems: 'center'
                },
                '& .flexCells.right > *': {
                    justifyContent: 'flex-end'
                },
                '& .flexCells.center > *': {
                    justifyContent: 'center'
                },
                '& .body': {
                    color: theme.palette.custom.fonts.fontTwo
                }
            })}
        >
            {size.width > 0 && size.height > 0 ? (
                <>
                    <Box
                        sx={{
                            height: 50,
                            flex: '0 0 auto',
                            display: 'grid',
                            gridTemplateColumns: templateColumns
                        }}
                    >
                        {columns.map(({ key, align, component, sort, sortKey: sortingKey }) => {
                            let formattedComponent = component;

                            if (key === 'votingPower') {
                                formattedComponent = (
                                    <Typography variant="h4" className="label popover">
                                        {t('votingPower')}
                                        <InfoPopover content={<VotingPowerExplanation />} />
                                        {!!sort && <SortArrows sort={props.sortKey === sortingKey ? props.sortDirection : undefined} />}
                                    </Typography>
                                );
                            }

                            return (
                                <div
                                    key={key}
                                    className={classnames('cell', {
                                        flexCells: component || sort,
                                        [align]: sort || component,
                                        sort
                                    })}
                                    onClick={() => {
                                        if (sort && sortingKey) {
                                            props.handleSort(sortingKey);
                                        }
                                    }}
                                    role={sort ? 'button' : undefined}
                                >
                                    {formattedComponent || (
                                        <Typography variant="h4" align={align}>
                                            {t(key)}
                                            {!!sort && <SortArrows sort={props.sortKey === sortingKey ? props.sortDirection : undefined} />}
                                        </Typography>
                                    )}
                                </div>
                            );
                        })}
                    </Box>

                    <Box sx={{ flex: '1 1 auto', minHeight: 0 }}>
                        <List<RowProps>
                            className="scrollbar"
                            listRef={listRef}
                            rowComponent={ValidatorRow}
                            rowCount={formattedItems.length}
                            rowHeight={DEFAULT_ROW_HEIGHT}
                            rowProps={{
                                items: formattedItems,
                                columns,
                                templateColumns,
                                setRowHeight
                            }}
                            style={{
                                width: size.width,
                                height: size.height - 50
                            }}
                        />
                    </Box>
                </>
            ) : null}
        </Box>
    );
};

export default Desktop;
