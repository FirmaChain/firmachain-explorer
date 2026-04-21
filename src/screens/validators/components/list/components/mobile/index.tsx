import React from 'react';
import { AvatarName } from '@components';
import { useList, useListRow } from '@hooks';
import { Box, Divider } from '@mui/material';
import { getValidatorConditionClass } from '@utils/get_validator_condition';
import { getValidatorStatus } from '@utils/get_validator_status';
import classnames from 'classnames';
import numeral from 'numeral';
import { List, type RowComponentProps } from 'react-window';

import { Condition, VotingPower } from '..';
import { ItemType } from '../../types';
import { SingleValidator } from './component';

type MobileProps = {
    className?: string;
    items: ItemType[];
};

type FormattedItem = {
    idx: string;
    validator: React.ReactNode;
    commission: string;
    condition: React.ReactNode;
    votingPower: React.ReactNode;
    status: ReturnType<typeof getValidatorStatus>;
};

type RowProps = {
    items: FormattedItem[];
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

const ValidatorRow = ({ index, style, items, setRowHeight }: RowComponentProps<RowProps>) => {
    const { rowRef } = useListRow(index, setRowHeight);
    const selectedItem = items[index];

    return (
        <div style={style}>
            <div ref={rowRef}>
                <Box sx={{ py: 2 }}>
                    <SingleValidator {...selectedItem} />
                </Box>
                {index !== items.length - 1 && <Divider />}
            </div>
        </div>
    );
};

const DEFAULT_ROW_HEIGHT = 235;

const Mobile: React.FC<MobileProps> = ({ className, items }) => {
    const { listRef, setRowHeight } = useList();
    const { ref, size } = useElementSize<HTMLDivElement>();

    const formattedItems = React.useMemo<FormattedItem[]>(() => {
        return items.map((x, i) => {
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
                status
            };
        });
    }, [items]);

    return (
        <Box ref={ref} className={classnames(className)} sx={{ height: '100%', minHeight: 0 }}>
            {size.width > 0 && size.height > 0 ? (
                <List<RowProps>
                    className="List"
                    listRef={listRef}
                    rowComponent={ValidatorRow}
                    rowCount={formattedItems.length}
                    rowHeight={DEFAULT_ROW_HEIGHT}
                    rowProps={{
                        items: formattedItems,
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
