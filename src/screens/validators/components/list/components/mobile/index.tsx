import React from 'react';
import { AvatarName } from '@components';
import { useList, useListRow } from '@hooks';
import { Divider } from '@material-ui/core';
import { getValidatorConditionClass } from '@utils/get_validator_condition';
import { getValidatorStatus } from '@utils/get_validator_status';
import classnames from 'classnames';
import numeral from 'numeral';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';

import { Condition, VotingPower } from '..';
import { ItemType } from '../../types';
import { SingleValidator } from './component';

const Mobile: React.FC<{
    className?: string;
    items: ItemType[];
}> = ({ className, items }) => {
    const { listRef, getRowHeight, setRowHeight } = useList();

    const formattedItems = items.map((x, i) => {
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

    return (
        <div className={classnames(className)}>
            <AutoSizer>
                {({ height, width }) => {
                    return (
                        <List
                            className="List"
                            height={height}
                            itemCount={formattedItems.length}
                            itemSize={getRowHeight}
                            ref={listRef}
                            width={width}
                        >
                            {({ index, style }) => {
                                const { rowRef } = useListRow(index, setRowHeight);
                                const selectedItem = formattedItems[index];
                                return (
                                    <div style={style}>
                                        <div ref={rowRef}>
                                            <SingleValidator {...selectedItem} />
                                            {index !== formattedItems.length - 1 && <Divider />}
                                        </div>
                                    </div>
                                );
                            }}
                        </List>
                    );
                }}
            </AutoSizer>
        </div>
    );
};

export default Mobile;
