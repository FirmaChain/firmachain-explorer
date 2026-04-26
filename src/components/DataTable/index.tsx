import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import InfoPopover from '../info_popover';
import SortArrows from '../sort_arrows';

export type DataTableDensity = 'compact' | 'default' | 'comfortable';
export type DataTableInset = 'none' | 'sm' | 'md' | 'lg';
export type RowSelectionBehavior = 'checkbox' | 'empty';
export type SortDirection = 'asc' | 'desc';
export type SortBehavior = 'tri-state' | 'toggle';
export type CellAlign = 'left' | 'center' | 'right';

export type SortState = {
    columnKey: string;
    direction: SortDirection;
} | null;

export type CellRenderContext = {
    rowId: React.Key;
    rowIndex: number;
    isSelected: boolean;
    selectionBehavior: RowSelectionBehavior;
};

export type DataTableColumn<T> = {
    key: string;
    header: React.ReactNode;
    tooltip?: React.ReactNode;
    render: (row: T, context: CellRenderContext) => React.ReactNode;
    width?: number | string;
    minWidth?: number;
    grow?: number;
    align?: CellAlign;
    isVisible?: (containerWidth: number | null) => boolean;
    sortable?: boolean;
    headerClassName?: string;
    cellClassName?: string;
};

export type DataTableProps<T> = {
    data: T[];
    columns: DataTableColumn<T>[];
    getRowId: (row: T) => React.Key;

    height?: number | string;
    rowHeight?: number;
    density?: DataTableDensity;
    inset?: DataTableInset;

    selectable?: boolean;
    selectedRowIds?: React.Key[];
    onSelectedRowIdsChange?: (nextIds: React.Key[]) => void;
    getRowSelectionBehavior?: (row: T) => RowSelectionBehavior;
    selectionColumnWidth?: number;

    sortState?: SortState;
    onSortStateChange?: (next: SortState) => void;
    sortBehavior?: SortBehavior;

    virtualization?: {
        enabled: boolean;
        overscan?: number;
    };

    hasMore?: boolean;
    isFetchingMore?: boolean;
    onReachEnd?: () => void;
    reachEndOffset?: number;
    fetchMoreIndicator?: React.ReactNode;

    onRowClick?: (row: T, rowIndex: number) => void;
    rowClassName?: (row: T, rowIndex: number) => string | undefined;

    empty?: React.ReactNode;
    className?: string;
};

const densityMap: Record<DataTableDensity, { paddingX: number; paddingY: number }> = {
    compact: { paddingX: 8, paddingY: 6 },
    default: { paddingX: 12, paddingY: 10 },
    comfortable: { paddingX: 16, paddingY: 14 }
};

const insetMap: Record<DataTableInset, number> = {
    none: 0,
    sm: 8,
    md: 12,
    lg: 16
};

const justifyMap: Record<CellAlign, string> = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
};

function toCssSize(value?: number | string): string | undefined {
    if (value == null) return undefined;
    return typeof value === 'number' ? `${value}px` : value;
}

function toGridTrack<T>(column: DataTableColumn<T>): string {
    if (column.width != null) {
        return typeof column.width === 'number' ? `${column.width}px` : column.width;
    }

    const minWidth = column.minWidth ?? 160;
    const grow = column.grow ?? 1;

    return `minmax(${minWidth}px, ${grow}fr)`;
}

function getNextSortState(current: SortState, columnKey: string, sortBehavior: SortBehavior): SortState {
    if (!current || current.columnKey !== columnKey) {
        return { columnKey, direction: 'asc' };
    }

    if (current.direction === 'asc') {
        return { columnKey, direction: 'desc' };
    }

    if (sortBehavior === 'toggle') {
        return { columnKey, direction: 'asc' };
    }

    return null;
}

function useElementSize<T extends HTMLElement>(ref: React.RefObject<T>) {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const update = () => {
            setSize({
                width: element.clientWidth,
                height: element.clientHeight
            });
        };

        update();

        if (typeof ResizeObserver === 'undefined') {
            window.addEventListener('resize', update);
            return () => window.removeEventListener('resize', update);
        }

        const observer = new ResizeObserver(update);
        observer.observe(element);

        return () => observer.disconnect();
    }, [ref]);

    return size;
}

function stopRowEvent(event: React.SyntheticEvent) {
    event.stopPropagation();
}

type IndeterminateCheckboxProps = {
    checked: boolean;
    indeterminate?: boolean;
    ariaLabel: string;
    onChange?: (checked: boolean) => void;
};

function IndeterminateCheckbox({ checked, indeterminate = false, ariaLabel, onChange }: IndeterminateCheckboxProps) {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
        <CheckboxInput
            ref={ref}
            type="checkbox"
            checked={checked}
            aria-label={ariaLabel}
            onChange={(event) => onChange?.(event.target.checked)}
        />
    );
}

export const rowHoverVisible = css`
    opacity: 0;
    pointer-events: none;
    transition: opacity 160ms ease;

    [data-datatable-row='true']:hover &,
    [data-datatable-row='true']:focus-within & {
        opacity: 1;
        pointer-events: auto;
    }
`;

export function DataTable<T>({
    data,
    columns,
    getRowId,
    height,
    rowHeight = 44,
    density = 'default',
    inset = 'md',
    selectable = false,
    selectedRowIds = [],
    onSelectedRowIdsChange,
    getRowSelectionBehavior,
    selectionColumnWidth = 48,
    sortState = null,
    onSortStateChange,
    sortBehavior = 'tri-state',
    virtualization,
    hasMore = false,
    isFetchingMore = false,
    onReachEnd,
    reachEndOffset = 300,
    fetchMoreIndicator = null,
    onRowClick,
    rowClassName,
    empty = null,
    className
}: DataTableProps<T>) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const { width: measuredWidth, height: viewportHeight } = useElementSize(viewportRef);
    const containerWidth = measuredWidth > 0 ? measuredWidth : null;

    const densityValue = densityMap[density];
    const insetValue = insetMap[inset];

    const visibleColumns = useMemo(() => {
        return columns.filter((column) => column.isVisible?.(containerWidth) ?? true);
    }, [columns, containerWidth]);

    const gridTemplateColumns = useMemo(() => {
        const tracks: string[] = [];

        if (selectable) {
            tracks.push(`${selectionColumnWidth}px`);
        }

        tracks.push(...visibleColumns.map((column) => toGridTrack(column)));

        return tracks.join(' ');
    }, [selectable, selectionColumnWidth, visibleColumns]);

    const selectedIdSet = useMemo(() => new Set(selectedRowIds), [selectedRowIds]);

    const getSelectionBehavior = useCallback(
        (row: T): RowSelectionBehavior => {
            if (!selectable) return 'empty';
            return getRowSelectionBehavior?.(row) ?? 'checkbox';
        },
        [getRowSelectionBehavior, selectable]
    );

    const selectableRowIds = useMemo(() => {
        if (!selectable) return [];

        return data.flatMap((row) => {
            if (getSelectionBehavior(row) !== 'checkbox') return [];
            return [getRowId(row)];
        });
    }, [data, getRowId, getSelectionBehavior, selectable]);

    const selectedSelectableCount = useMemo(() => {
        return selectableRowIds.reduce((count, rowId) => {
            return +count + (selectedIdSet.has(rowId) ? 1 : 0);
        }, 0);
    }, [selectableRowIds, selectedIdSet]);

    const isAllSelected = selectableRowIds.length > 0 && selectedSelectableCount === selectableRowIds.length;
    const isPartiallySelected = +selectedSelectableCount > 0 && +selectedSelectableCount < selectableRowIds.length;

    const handleToggleAll = useCallback(
        (checked: boolean) => {
            if (!selectable || !onSelectedRowIdsChange) return;

            const next = new Set(selectedRowIds);

            if (checked) {
                selectableRowIds.forEach((rowId) => next.add(rowId));
            } else {
                selectableRowIds.forEach((rowId) => next.delete(rowId));
            }

            onSelectedRowIdsChange(Array.from(next));
        },
        [onSelectedRowIdsChange, selectable, selectableRowIds, selectedRowIds]
    );

    const handleToggleRow = useCallback(
        (row: T, checked: boolean) => {
            if (!selectable || !onSelectedRowIdsChange) return;
            if (getSelectionBehavior(row) !== 'checkbox') return;

            const rowId = getRowId(row);
            const next = new Set(selectedRowIds);

            if (checked) {
                next.add(rowId);
            } else {
                next.delete(rowId);
            }

            onSelectedRowIdsChange(Array.from(next));
        },
        [getRowId, getSelectionBehavior, onSelectedRowIdsChange, selectable, selectedRowIds]
    );

    const [scrollTop, setScrollTop] = useState(0);
    const reachEndLockedRef = useRef(false);
    const lastDataLengthRef = useRef(data.length);

    useEffect(() => {
        if (data.length !== lastDataLengthRef.current) {
            lastDataLengthRef.current = data.length;
            reachEndLockedRef.current = false;
        }
    }, [data.length]);

    const maybeTriggerReachEnd = useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport || !onReachEnd || !hasMore || isFetchingMore || reachEndLockedRef.current) {
            return;
        }

        const distanceFromEnd = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;

        if (distanceFromEnd <= reachEndOffset) {
            reachEndLockedRef.current = true;
            onReachEnd();
        }
    }, [hasMore, isFetchingMore, onReachEnd, reachEndOffset]);

    useEffect(() => {
        maybeTriggerReachEnd();
    }, [data.length, maybeTriggerReachEnd, viewportHeight]);

    const handleScroll = useCallback(
        (event: React.UIEvent<HTMLDivElement>) => {
            const nextScrollTop = event.currentTarget.scrollTop;
            setScrollTop(nextScrollTop);

            const distanceFromEnd = event.currentTarget.scrollHeight - event.currentTarget.scrollTop - event.currentTarget.clientHeight;

            if (distanceFromEnd > reachEndOffset) {
                reachEndLockedRef.current = false;
                return;
            }

            maybeTriggerReachEnd();
        },
        [maybeTriggerReachEnd, reachEndOffset]
    );

    const isVirtualized = Boolean(virtualization?.enabled) && data.length > 0;
    const overscan = virtualization?.overscan ?? 6;
    const bodyViewportHeight = Math.max(0, viewportHeight - rowHeight);
    const estimatedBodyViewportHeight = bodyViewportHeight > 0 ? bodyViewportHeight : rowHeight * 8;
    const bodyScrollTop = Math.max(0, scrollTop - rowHeight);

    const startIndex = isVirtualized ? Math.max(0, Math.floor(bodyScrollTop / rowHeight) - overscan) : 0;

    const endIndex = isVirtualized
        ? Math.min(data.length - 1, Math.ceil((bodyScrollTop + estimatedBodyViewportHeight) / rowHeight) + overscan)
        : data.length - 1;

    const virtualItems = useMemo(() => {
        if (!isVirtualized) return [];

        return data.slice(startIndex, endIndex + 1).map((row, offset) => ({
            row,
            rowIndex: startIndex + offset
        }));
    }, [data, endIndex, isVirtualized, startIndex]);

    const totalBodyHeight = data.length * rowHeight;

    const handleSort = useCallback(
        (column: DataTableColumn<T>) => {
            if (!column.sortable || !onSortStateChange) return;
            onSortStateChange(getNextSortState(sortState, column.key, sortBehavior));
        },
        [onSortStateChange, sortBehavior, sortState]
    );

    const renderSelectionCell = useCallback(
        (row: T, rowIndex: number) => {
            const behavior = getSelectionBehavior(row);

            if (behavior === 'empty') {
                return <SelectionPlaceholder aria-hidden="true" />;
            }

            const rowId = getRowId(row);

            return (
                <SelectionControl onClick={stopRowEvent} onMouseDown={stopRowEvent} onDoubleClick={stopRowEvent} onKeyDown={stopRowEvent}>
                    <IndeterminateCheckbox
                        checked={selectedIdSet.has(rowId)}
                        ariaLabel={`Select row ${String(rowId)}`}
                        onChange={(checked) => handleToggleRow(row, checked)}
                    />
                </SelectionControl>
            );
        },
        [getRowId, getSelectionBehavior, handleToggleRow, selectedIdSet]
    );

    const renderRow = useCallback(
        (row: T, rowIndex: number, style?: React.CSSProperties) => {
            const rowId = getRowId(row);
            const selectionBehavior = getSelectionBehavior(row);
            const isSelected = selectionBehavior === 'checkbox' ? selectedIdSet.has(rowId) : false;
            const rowClass = rowClassName?.(row, rowIndex);

            return (
                <DataRow
                    key={rowId}
                    role="row"
                    data-datatable-row="true"
                    aria-selected={isSelected || undefined}
                    className={rowClass}
                    $rowHeight={rowHeight}
                    $selected={isSelected}
                    $interactive={Boolean(onRowClick)}
                    $isOddRow={rowIndex % 2 === 0}
                    style={{ ...style, gridTemplateColumns }}
                    onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                    onKeyDown={
                        onRowClick
                            ? (event) => {
                                  if (event.key === 'Enter' || event.key === ' ') {
                                      event.preventDefault();
                                      onRowClick(row, rowIndex);
                                  }
                              }
                            : undefined
                    }
                    tabIndex={onRowClick ? 0 : undefined}
                >
                    {selectable && (
                        <BodyCell
                            role="gridcell"
                            $align="center"
                            $paddingY={densityValue.paddingY}
                            $paddingLeft={insetValue || densityValue.paddingX}
                            $paddingRight={densityValue.paddingX}
                        >
                            <CellInner $align="center">{renderSelectionCell(row, rowIndex)}</CellInner>
                        </BodyCell>
                    )}

                    {visibleColumns.map((column, columnIndex) => {
                        const align = column.align ?? 'left';
                        const isFirstDataColumn = columnIndex === 0;
                        const isLastDataColumn = columnIndex === visibleColumns.length - 1;

                        const paddingLeft = !selectable && isFirstDataColumn ? insetValue || densityValue.paddingX : densityValue.paddingX;

                        const paddingRight = isLastDataColumn ? insetValue || densityValue.paddingX : densityValue.paddingX;

                        return (
                            <BodyCell
                                key={column.key}
                                role="gridcell"
                                className={column.cellClassName}
                                $align={align}
                                $paddingY={densityValue.paddingY}
                                $paddingLeft={paddingLeft}
                                $paddingRight={paddingRight}
                            >
                                <CellInner $align={align}>
                                    {column.render(row, {
                                        rowId,
                                        rowIndex,
                                        isSelected,
                                        selectionBehavior
                                    })}
                                </CellInner>
                            </BodyCell>
                        );
                    })}
                </DataRow>
            );
        },
        [
            densityValue.paddingX,
            densityValue.paddingY,
            getRowId,
            getSelectionBehavior,
            gridTemplateColumns,
            insetValue,
            onRowClick,
            renderSelectionCell,
            rowClassName,
            rowHeight,
            selectable,
            selectedIdSet,
            visibleColumns
        ]
    );

    const rootHeight = toCssSize(height);

    return (
        <Root className={className} $height={rootHeight} role="grid">
            <Viewport ref={viewportRef} onScroll={handleScroll}>
                <HeaderRow role="row" $rowHeight={rowHeight} style={{ gridTemplateColumns }}>
                    {selectable && (
                        <HeaderCell
                            role="columnheader"
                            $align="center"
                            $paddingY={densityValue.paddingY}
                            $paddingLeft={insetValue || densityValue.paddingX}
                            $paddingRight={densityValue.paddingX}
                        >
                            <CellInner $align="center">
                                {selectableRowIds.length > 0 ? (
                                    <SelectionControl
                                        onClick={stopRowEvent}
                                        onMouseDown={stopRowEvent}
                                        onDoubleClick={stopRowEvent}
                                        onKeyDown={stopRowEvent}
                                    >
                                        <IndeterminateCheckbox
                                            checked={isAllSelected}
                                            indeterminate={isPartiallySelected}
                                            ariaLabel="Select all loaded rows"
                                            onChange={handleToggleAll}
                                        />
                                    </SelectionControl>
                                ) : (
                                    <SelectionPlaceholder aria-hidden="true" />
                                )}
                            </CellInner>
                        </HeaderCell>
                    )}

                    {visibleColumns.map((column, columnIndex) => {
                        const align = column.align ?? 'left';
                        const isActiveSort = sortState?.columnKey === column.key;
                        const sortDirection = isActiveSort ? sortState?.direction : null;
                        const isSortable = Boolean(column.sortable && onSortStateChange);
                        const isFirstDataColumn = columnIndex === 0;
                        const isLastDataColumn = columnIndex === visibleColumns.length - 1;

                        const paddingLeft = !selectable && isFirstDataColumn ? insetValue || densityValue.paddingX : densityValue.paddingX;

                        const paddingRight = isLastDataColumn ? insetValue || densityValue.paddingX : densityValue.paddingX;

                        return (
                            <HeaderCell
                                key={column.key}
                                role="columnheader"
                                aria-sort={isActiveSort ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                                className={column.headerClassName}
                                $align={align}
                                $paddingY={densityValue.paddingY}
                                $paddingLeft={paddingLeft}
                                $paddingRight={paddingRight}
                            >
                                <CellInner $align={align}>
                                    {isSortable ? (
                                        <SortButton type="button" onClick={() => handleSort(column)}>
                                            <HeaderContent>
                                                <HeaderText>{column.header}</HeaderText>
                                                {column.tooltip ? <InfoPopover content={column.tooltip} /> : null}
                                            </HeaderContent>
                                            <SortMark aria-hidden="true">
                                                <SortArrows sort={sortDirection ?? undefined} />
                                            </SortMark>
                                        </SortButton>
                                    ) : (
                                        <HeaderContent>
                                            <HeaderText>{column.header}</HeaderText>
                                            {column.tooltip ? <InfoPopover content={column.tooltip} /> : null}
                                        </HeaderContent>
                                    )}
                                </CellInner>
                            </HeaderCell>
                        );
                    })}
                </HeaderRow>

                {data.length === 0 ? (
                    <EmptyState>{empty}</EmptyState>
                ) : isVirtualized ? (
                    <VirtualRowsLayer style={{ height: totalBodyHeight }}>
                        {virtualItems.map(({ row, rowIndex }) =>
                            renderRow(row, rowIndex, {
                                position: 'absolute',
                                top: rowIndex * rowHeight,
                                left: 0,
                                right: 0
                            })
                        )}
                    </VirtualRowsLayer>
                ) : (
                    <RowsFlow>{data.map((row, rowIndex) => renderRow(row, rowIndex))}</RowsFlow>
                )}

                {isFetchingMore && fetchMoreIndicator ? <FetchMoreIndicator>{fetchMoreIndicator}</FetchMoreIndicator> : null}
            </Viewport>
        </Root>
    );
}

const Root = styled.div<{ $height?: string }>`
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    overflow: hidden;

    ${({ $height }) =>
        $height &&
        css`
            height: ${$height};
        `}
`;

const Viewport = styled.div`
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    // scrollbar-gutter: stable both-edges;
`;

const HeaderRow = styled.div<{ $rowHeight: number }>`
    position: sticky;
    top: 0;
    z-index: 2;
    display: grid;
    min-height: ${({ $rowHeight }) => $rowHeight}px;
    height: ${({ $rowHeight }) => $rowHeight}px;
    background: ${({ theme }) => theme.palette.custom.general.surfaceOne};
`;

const RowsFlow = styled.div`
    position: relative;
`;

const VirtualRowsLayer = styled.div`
    position: relative;

    color: ${({ theme }) => theme.palette.custom.fonts.fontTwo};
`;

const DataRow = styled.div<{
    $rowHeight: number;
    $selected: boolean;
    $interactive: boolean;
    $isOddRow: boolean;
}>`
    display: grid;
    min-height: ${({ $rowHeight }) => $rowHeight}px;
    height: ${({ $rowHeight }) => $rowHeight}px;

    min-width: fit-content;

    background: ${({ $isOddRow, theme }) =>
        $isOddRow ? theme.palette.custom.general.surfaceTwo : theme.palette.custom.general.surfaceOne};
`;

const HeaderCell = styled.div<{
    $align: CellAlign;
    $paddingY: number;
    $paddingLeft: number;
    $paddingRight: number;
}>`
    min-width: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: ${({ $paddingY, $paddingRight, $paddingLeft }) => `${$paddingY}px ${$paddingRight}px ${$paddingY}px ${$paddingLeft}px`};
`;

const BodyCell = styled.div<{
    $align: CellAlign;
    $paddingY: number;
    $paddingLeft: number;
    $paddingRight: number;
}>`
    min-width: 0;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: ${({ $paddingY, $paddingRight, $paddingLeft }) => `${$paddingY}px ${$paddingRight}px ${$paddingY}px ${$paddingLeft}px`};
`;

const CellInner = styled.div<{ $align: CellAlign }>`
    display: flex;
    align-items: center;
    justify-content: ${({ $align }) => justifyMap[$align]};
    width: 100%;
    min-width: 0;
    overflow: hidden;
    text-align: ${({ $align }) => $align};
`;

const HeaderText = styled.span`
    display: inline-flex;
    align-items: center;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    color: ${({ theme }) => theme.palette.text.primary};
`;

const HeaderContent = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
`;

const SortButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    width: 100%;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    color: inherit;
    font: inherit;
`;

const SortMark = styled.span`
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
`;

const SelectionControl = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const SelectionPlaceholder = styled.span`
    display: inline-block;
    width: 16px;
    height: 16px;
`;

const CheckboxInput = styled.input`
    width: 16px;
    height: 16px;
    margin: 0;
    accent-color: var(--datatable-accent, #2563eb);
`;

const EmptyState = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 160px;
    padding: 24px;
    color: var(--datatable-empty-fg, #64748b);
    font-size: 14px;
`;

const FetchMoreIndicator = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 24px;
`;
