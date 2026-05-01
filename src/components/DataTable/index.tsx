import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Virtualizer } from 'virtua';

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
    data?: T[];
    columns?: DataTableColumn<T>[];
    getRowId: (row: T) => React.Key;

    height?: number | string;
    headerHeight?: number;
    hideHeader?: boolean;

    /**
     * Estimated row height for virtualization.
     * Actual row height can be dynamic.
     */
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

type DensityValue = {
    paddingX: number;
    paddingY: number;
};

type DataRowItemProps<T> = {
    row: T;
    rowIndex: number;
    rowId: React.Key;
    visibleColumns: DataTableColumn<T>[];
    gridTemplateColumns: string;
    selectable: boolean;
    selectionBehavior: RowSelectionBehavior;
    isSelected: boolean;
    selectedIdSet: Set<React.Key>;
    densityValue: DensityValue;
    insetValue: number;
    rowHeight: number;
    onRowClick?: (row: T, rowIndex: number) => void;
    rowClassName?: (row: T, rowIndex: number) => string | undefined;
    onToggleRow: (row: T, checked: boolean) => void;
};

const densityMap: Record<DataTableDensity, DensityValue> = {
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

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T>) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const update = () => {
            const nextWidth = element.clientWidth;

            setWidth((prevWidth) => {
                if (prevWidth === nextWidth) return prevWidth;
                return nextWidth;
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

    return width;
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

function DataRowItemInner<T>({
    row,
    rowIndex,
    rowId,
    visibleColumns,
    gridTemplateColumns,
    selectable,
    selectionBehavior,
    isSelected,
    selectedIdSet,
    densityValue,
    insetValue,
    rowHeight,
    onRowClick,
    rowClassName,
    onToggleRow
}: DataRowItemProps<T>) {
    const rowClass = rowClassName?.(row, rowIndex);

    const handleClick = useCallback(() => {
        onRowClick?.(row, rowIndex);
    }, [onRowClick, row, rowIndex]);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (!onRowClick) return;

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onRowClick(row, rowIndex);
            }
        },
        [onRowClick, row, rowIndex]
    );

    const handleCheckboxChange = useCallback(
        (checked: boolean) => {
            onToggleRow(row, checked);
        },
        [onToggleRow, row]
    );

    return (
        <DataRow
            role="row"
            data-datatable-row="true"
            aria-selected={isSelected || undefined}
            className={rowClass}
            $minRowHeight={rowHeight}
            $selected={isSelected}
            $interactive={Boolean(onRowClick)}
            $isOddRow={rowIndex % 2 === 0}
            style={{ gridTemplateColumns }}
            onClick={onRowClick ? handleClick : undefined}
            onKeyDown={onRowClick ? handleKeyDown : undefined}
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
                    <CellInner $align="center">
                        {selectionBehavior === 'checkbox' ? (
                            <SelectionControl
                                onClick={stopRowEvent}
                                onMouseDown={stopRowEvent}
                                onDoubleClick={stopRowEvent}
                                onKeyDown={stopRowEvent}
                            >
                                <IndeterminateCheckbox
                                    checked={selectedIdSet.has(rowId)}
                                    ariaLabel={`Select row ${String(rowId)}`}
                                    onChange={handleCheckboxChange}
                                />
                            </SelectionControl>
                        ) : (
                            <SelectionPlaceholder aria-hidden="true" />
                        )}
                    </CellInner>
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
}

const DataRowItem = React.memo(DataRowItemInner) as typeof DataRowItemInner;

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
    data = [],
    columns = [],
    getRowId,
    height,
    headerHeight = 50,
    hideHeader = false,
    rowHeight = 52,
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
    const measuredWidth = useElementWidth(viewportRef);
    const containerWidth = measuredWidth > 0 ? measuredWidth : null;

    const densityValue = densityMap[density];
    const insetValue = insetMap[inset];

    const visibleColumns = useMemo(() => {
        if (columns.length === 0) return [];

        return columns.filter((column) => column.isVisible?.(containerWidth) ?? true);
    }, [columns, containerWidth]);

    const gridTemplateColumns = useMemo(() => {
        const tracks: string[] = [];

        if (selectable) {
            tracks.push(`${selectionColumnWidth}px`);
        }

        for (const column of visibleColumns) {
            tracks.push(toGridTrack(column));
        }

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
        if (!selectable || data.length === 0) return [];

        const nextIds: React.Key[] = [];

        for (const row of data) {
            if (getSelectionBehavior(row) === 'checkbox') {
                nextIds.push(getRowId(row));
            }
        }

        return nextIds;
    }, [data, getRowId, getSelectionBehavior, selectable]);

    const selectedSelectableCount = useMemo(() => {
        if (selectableRowIds.length === 0 || selectedIdSet.size === 0) return 0;

        let count = 0;

        for (const rowId of selectableRowIds) {
            if (selectedIdSet.has(rowId)) {
                count += 1;
            }
        }

        return count;
    }, [selectableRowIds, selectedIdSet]);

    const isAllSelected = selectableRowIds.length > 0 && selectedSelectableCount === selectableRowIds.length;
    const isPartiallySelected = selectedSelectableCount > 0 && selectedSelectableCount < selectableRowIds.length;

    const handleToggleAll = useCallback(
        (checked: boolean) => {
            if (!selectable || !onSelectedRowIdsChange) return;

            const next = new Set(selectedRowIds);

            for (const rowId of selectableRowIds) {
                if (checked) {
                    next.add(rowId);
                } else {
                    next.delete(rowId);
                }
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

    const reachEndLockedRef = useRef(false);
    const lastDataLengthRef = useRef(data.length);
    const lastScrollTopRef = useRef(0);

    useEffect(() => {
        if (data.length !== lastDataLengthRef.current) {
            lastDataLengthRef.current = data.length;
            reachEndLockedRef.current = false;
        }
    }, [data.length]);

    const triggerReachEnd = useCallback(() => {
        if (!onReachEnd || !hasMore || isFetchingMore || reachEndLockedRef.current) return;

        reachEndLockedRef.current = true;
        onReachEnd();
    }, [hasMore, isFetchingMore, onReachEnd]);

    const checkReachEnd = useCallback(
        (offset?: number) => {
            const viewport = viewportRef.current;
            if (!viewport) return;

            const scrollTop = offset ?? viewport.scrollTop;
            const isScrollingDown = scrollTop >= lastScrollTopRef.current;

            lastScrollTopRef.current = scrollTop;

            if (!isScrollingDown || scrollTop <= 0) return;

            const distanceFromEnd = viewport.scrollHeight - scrollTop - viewport.clientHeight;

            if (distanceFromEnd <= reachEndOffset) {
                triggerReachEnd();
            }
        },
        [reachEndOffset, triggerReachEnd]
    );

    const handleViewportScroll = useCallback(() => {
        checkReachEnd();
    }, [checkReachEnd]);

    const handleVirtualizerScroll = useCallback(
        (offset: number) => {
            checkReachEnd(offset);
        },
        [checkReachEnd]
    );

    const handleVirtualizerScrollEnd = useCallback(() => {
        checkReachEnd();
    }, [checkReachEnd]);

    const handleSort = useCallback(
        (column: DataTableColumn<T>) => {
            if (!column.sortable || !onSortStateChange) return;
            onSortStateChange(getNextSortState(sortState, column.key, sortBehavior));
        },
        [onSortStateChange, sortBehavior, sortState]
    );

    const rowItems = useMemo(() => {
        if (data.length === 0) return null;

        return data.map((row, rowIndex) => {
            const rowId = getRowId(row);
            const selectionBehavior = getSelectionBehavior(row);
            const isSelected = selectionBehavior === 'checkbox' ? selectedIdSet.has(rowId) : false;

            return (
                <DataRowItem
                    key={rowId}
                    row={row}
                    rowIndex={rowIndex}
                    rowId={rowId}
                    visibleColumns={visibleColumns}
                    gridTemplateColumns={gridTemplateColumns}
                    selectable={selectable}
                    selectionBehavior={selectionBehavior}
                    isSelected={isSelected}
                    selectedIdSet={selectedIdSet}
                    densityValue={densityValue}
                    insetValue={insetValue}
                    rowHeight={rowHeight}
                    onRowClick={onRowClick}
                    rowClassName={rowClassName}
                    onToggleRow={handleToggleRow}
                />
            );
        });
    }, [
        data,
        densityValue,
        getRowId,
        getSelectionBehavior,
        gridTemplateColumns,
        handleToggleRow,
        insetValue,
        onRowClick,
        rowClassName,
        rowHeight,
        selectable,
        selectedIdSet,
        visibleColumns
    ]);

    const rootHeight = toCssSize(height);
    const isVirtualized = Boolean(virtualization?.enabled) && data.length > 0;
    const bufferSize = (virtualization?.overscan ?? 6) * rowHeight;
    const startMargin = hideHeader ? 0 : headerHeight;

    return (
        <Root className={className} $height={rootHeight} role="grid">
            <Viewport ref={viewportRef} onScroll={handleViewportScroll}>
                {!hideHeader && (
                    <HeaderRow role="row" $headerHeight={headerHeight} style={{ gridTemplateColumns }}>
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

                            const paddingLeft =
                                !selectable && isFirstDataColumn ? insetValue || densityValue.paddingX : densityValue.paddingX;
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
                )}

                {data.length === 0 ? (
                    <EmptyState>{empty}</EmptyState>
                ) : isVirtualized ? (
                    <Virtualizer
                        scrollRef={viewportRef}
                        startMargin={startMargin}
                        itemSize={rowHeight}
                        bufferSize={bufferSize}
                        shift={false}
                        onScroll={handleVirtualizerScroll}
                        onScrollEnd={handleVirtualizerScrollEnd}
                    >
                        {rowItems}
                    </Virtualizer>
                ) : (
                    <RowsFlow>{rowItems}</RowsFlow>
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
`;

const HeaderRow = styled.div<{ $headerHeight: number }>`
    position: sticky;
    top: 0;
    z-index: 2;
    display: grid;
    min-height: ${({ $headerHeight }) => $headerHeight}px;
    height: ${({ $headerHeight }) => $headerHeight}px;
    background: ${({ theme }) => theme.palette.custom.general.surfaceOne};
`;

const RowsFlow = styled.div`
    position: relative;
`;

const DataRow = styled.div<{
    $minRowHeight: number;
    $selected: boolean;
    $interactive: boolean;
    $isOddRow: boolean;
}>`
    display: grid;
    min-height: ${({ $minRowHeight }) => $minRowHeight}px;
    height: auto;
    min-width: fit-content;

    background: ${({ $isOddRow, theme }) =>
        $isOddRow ? theme.palette.custom.general.surfaceTwo : theme.palette.custom.general.surfaceOne};

    ${({ $interactive }) =>
        $interactive &&
        css`
            cursor: pointer;
        `}
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
