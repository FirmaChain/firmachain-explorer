import { useState } from 'react';
import { LastHundredBlocksSubscription, useLastHundredBlocksSubscription } from '@graphql/types';
import { useParams } from 'react-router';

export const useBlocks = () => {
    const [state, setState] = useState<
        {
            height: number;
            txs: number;
            proposer: string;
            signed: boolean;
        }[]
    >([]);

    const { address } = useParams();

    useLastHundredBlocksSubscription({
        variables: { address },
        onSubscriptionData: (data) => {
            setState(formatLastHundredBlocks(data.subscriptionData.data));
        }
    });

    const formatLastHundredBlocks = (data: LastHundredBlocksSubscription) => {
        return data.block.map((x) => {
            return {
                height: x.height,
                txs: x.transactions.length,
                proposer: x.validator.validatorInfo.operatorAddress,
                signed: x.precommits.length === 1
            };
        });
    };

    return {
        state
    };
};
