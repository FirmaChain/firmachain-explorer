import { useState } from 'react';
import { ProposalDetailsVotesQuery, useProposalDetailsVotesQuery } from '@graphql/types';
import { toValidatorAddress } from '@utils/prefix_convert';
import * as R from 'ramda';
import { useParams } from 'react-router';

import { VoteState } from './types';

export const useVotes = (resetPagination: any) => {
    const { id } = useParams();

    const [state, setState] = useState<VoteState>({
        data: [],
        validatorsNotVoted: [],
        voteCount: {
            yes: 0,
            no: 0,
            abstain: 0,
            veto: 0,
            didNotVote: 0
        },
        tab: 0
    });

    const handleSetState = (stateChange: any) => {
        setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
    };

    const handleTabChange = (_event: any, newValue: number) => {
        if (resetPagination) {
            resetPagination();
        }
        handleSetState({
            tab: newValue
        });
    };

    useProposalDetailsVotesQuery({
        variables: {
            proposalId: Number(id)
        },
        onCompleted: (data) => {
            handleSetState(formatVotes(data));
        }
    });

    const formatVotes = (data: ProposalDetailsVotesQuery) => {
        const validatorDict = {};
        const validators = data.validatorStatuses.map((x) => {
            const selfDelegateAddress = R.pathOr('', ['validator', 'validatorInfo', 'selfDelegateAddress'], x);
            validatorDict[selfDelegateAddress] = false;
            return selfDelegateAddress;
        });
        const latestVotesByVoter = Array.from(
            data.proposalVote
                .reduce((acc, vote) => {
                    // keep first occurrence only
                    if (!acc.has(vote.voterAddress)) {
                        acc.set(vote.voterAddress, vote);
                    }
                    return acc;
                }, new Map<string, any>())
                .values()
        );
        // const latestVotesByVoter = lodash
        //     .chain(data.proposalVote)
        //     .groupBy('voterAddress')
        //     .values()
        //     .map((votes: any[]) => votes[0])
        //     .value();

        let yes = 0;
        let no = 0;
        let abstain = 0;
        let veto = 0;

        const votes = latestVotesByVoter.map((x) => {
            if (x.option === 'VOTE_OPTION_YES') {
                yes += 1;
            }
            if (x.option === 'VOTE_OPTION_ABSTAIN') {
                abstain += 1;
            }
            if (x.option === 'VOTE_OPTION_NO') {
                no += 1;
            }
            if (x.option === 'VOTE_OPTION_NO_WITH_VETO') {
                veto += 1;
            }
            if (validatorDict[x.voterAddress] === false) {
                validatorDict[x.voterAddress] = true;
            }

            return {
                user: x.voterAddress,
                vote: x.option
            };
        });

        // =====================================
        // Get data for active validators that did not vote
        // =====================================
        const validatorsNotVoted = validators
            .filter((x) => {
                return validatorDict[x] === false;
            })
            .map((address) => {
                return {
                    user: toValidatorAddress(address),
                    vote: 'NOT_VOTED'
                };
            });

        return {
            data: votes,
            validatorsNotVoted,
            voteCount: {
                yes,
                no,
                veto,
                abstain,
                didNotVote: validatorsNotVoted.length
            }
        };
    };

    return {
        state,
        handleTabChange
    };
};
