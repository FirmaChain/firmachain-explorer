import { useState } from 'react';
import { chainConfig } from '@configs';
import { ProposalDetailsDepositsQuery, useProposalDetailsDepositsQuery } from '@graphql/types';
import { formatToken } from '@utils/format_token';
import * as R from 'ramda';
import { useParams } from 'react-router';

import { DepositState } from './types';

export const useDeposits = () => {
    const { id } = useParams();

    const [state, setState] = useState<DepositState>({
        data: []
    });

    const handleSetState = (stateChange: any) => {
        setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
    };

    useProposalDetailsDepositsQuery({
        variables: {
            proposalId: Number(id)
        },
        onCompleted: (data) => {
            handleSetState(foramtProposalDeposits(data));
        }
    });

    const foramtProposalDeposits = (data: ProposalDetailsDepositsQuery) => {
        const format = data.proposalDeposit.map((x) => {
            return {
                amount: formatToken(
                    R.pathOr('0', ['amount', 0, 'amount'], x),
                    R.pathOr(chainConfig.primaryTokenUnit, ['amount', 0, 'denom'], x)
                ),
                user: R.pathOr('', ['depositorAddress'], x),
                timestamp: R.pathOr('', ['block', 'timestamp'], x)
            };
        });

        return {
            data: format
        };
    };

    return {
        state
    };
};
