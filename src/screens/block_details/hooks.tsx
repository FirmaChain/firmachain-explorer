import { useEffect, useState } from 'react';
import { BlockDetailsQuery, useBlockDetailsQuery } from '@graphql/types';
import { convertMsgsToModels } from '@msg';
import numeral from 'numeral';
import * as R from 'ramda';
import { useParams } from 'react-router';

import { BlockDetailState } from './types';

export const useBlockDetails = () => {
    const { height } = useParams();

    const [state, setState] = useState<BlockDetailState>({
        loading: true,
        exists: true,
        overview: {
            height: 0,
            hash: '',
            txs: 0,
            timestamp: '',
            proposer: ''
        },
        signatures: [],
        transactions: []
    });
    const handleSetState = (stateChange: any) => {
        setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
    };

    useEffect(() => {
        // reset every call
        handleSetState({
            loading: true,
            exists: true
        });
    }, [height]);

    // ==========================
    // Fetch Data
    // ==========================
    useBlockDetailsQuery({
        variables: {
            height: numeral(height).value(),
            signatureHeight: numeral(height).value() + 1
        },
        onCompleted: (data) => {
            handleSetState(formatRaws(data));
        }
    });

    const formatRaws = (data: BlockDetailsQuery) => {
        const stateChange: any = {
            loading: false
        };

        if (!data.block.length) {
            stateChange.exists = false;
            return stateChange;
        }

        // ==========================
        // Overview
        // ==========================
        const formatOverview = () => {
            const proposerAddress = R.pathOr('', ['block', 0, 'validator', 'validatorInfo', 'operatorAddress'], data);
            const overview = {
                height: data.block[0].height,
                hash: data.block[0].hash,
                txs: data.block[0].txs,
                timestamp: data.block[0].timestamp,
                proposer: proposerAddress
            };
            return overview;
        };

        stateChange.overview = formatOverview();

        // ==========================
        // Signatures
        // ==========================
        const formatSignatures = () => {
            const signatures = data.preCommits
                .filter((x) => x?.validator?.validatorInfo)
                .map((x) => {
                    return x.validator.validatorInfo.operatorAddress;
                });
            return signatures;
        };
        stateChange.signatures = formatSignatures();

        // ==========================
        // Transactions
        // ==========================
        const formatTransactions = () => {
            const transactions = data.transaction.map((x) => {
                const messages = convertMsgsToModels(x);
                return {
                    height: x.height,
                    hash: x.hash,
                    success: x.success,
                    timestamp: stateChange.overview.timestamp,
                    messages: {
                        count: x.messages.length,
                        items: messages
                    },
                    type: x.messages
                };
            });

            return transactions;
        };
        stateChange.transactions = formatTransactions();

        return stateChange;
    };

    return {
        state
    };
};
