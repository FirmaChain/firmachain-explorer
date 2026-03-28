import { useState } from 'react';
import { useRouter } from '@/adapters/routing/router';
import { LastHundredBlocksSubscription, useLastHundredBlocksSubscription } from '@graphql/types';
import * as R from 'ramda';

export const useBlocks = () => {
    const [state, setState] = useState<
        {
            height: number;
            txs: number;
            proposer: string;
            signed: boolean;
        }[]
    >([]);

    const router = useRouter();

    useLastHundredBlocksSubscription({
        variables: {
            address: R.pathOr('', ['query', 'address'], router)
        },
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
