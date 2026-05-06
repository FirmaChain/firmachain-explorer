import { ChangeEvent, useEffect, useState } from 'react';
import { TransactionDetailsQuery, useTransactionDetailsQuery } from '@graphql/types';
import { formatToken } from '@utils/format_token';
import * as R from 'ramda';
import { useParams } from 'react-router';

import { convertDefaultRaw, convertMsgsToModels } from '@/components/msg/utils';

import { TransactionState } from './types';

export const useTransactionDetails = () => {
    const { tx } = useParams();

    const [state, setState] = useState<TransactionState>({
        exists: true,
        loading: true,
        overview: {
            hash: '',
            height: 0,
            timestamp: '',
            fee: {
                value: '0',
                displayDenom: '',
                baseDenom: '',
                exponent: 0
            },
            feeGrant: '',
            gasUsed: 0,
            gasWanted: 0,
            success: false,
            memo: '',
            error: ''
        },
        logs: null,
        events: null,
        messages: {
            filterBy: 'none',
            viewRaw: false,
            items: []
        }
    });

    const handleSetState = (stateChange: any) => {
        setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
    };

    useEffect(() => {
        handleSetState({
            loading: true,
            exists: true
        });
    }, [tx]);

    // ===============================
    // Fetch data
    // ===============================
    useTransactionDetailsQuery({
        variables: {
            hash: (tx as string).toUpperCase()
        },
        onCompleted: (data) => {
            console.log('data', data);
            handleSetState(formatTransactionDetails(data));
        }
    });

    // ===============================
    // Parse data
    // ===============================
    const formatTransactionDetails = (data: TransactionDetailsQuery) => {
        const stateChange: any = {
            loading: false
        };

        if (!data.transaction.length) {
            stateChange.exists = false;
            return stateChange;
        }

        // =============================
        // overview
        // =============================
        const formatOverview = () => {
            const { fee } = data.transaction[0];
            const feeAmount = R.pathOr(
                {
                    denom: '',
                    amount: 0
                },
                ['amount', 0],
                fee
            );
            const { success } = data.transaction[0];
            const overview = {
                hash: data.transaction[0].hash,
                height: data.transaction[0].height,
                timestamp: data.transaction[0].block.timestamp,
                fee: formatToken(feeAmount.amount, feeAmount.denom),
                feeGrant: fee.granter,
                gasUsed: data.transaction[0].gasUsed,
                gasWanted: data.transaction[0].gasWanted,
                success,
                memo: data.transaction[0].memo,
                error: success ? '' : data.transaction[0].rawLog
            };
            return overview;
        };

        stateChange.overview = formatOverview();

        // =============================
        // Events
        // =============================
        const formatEvents = () => {
            const { events } = data.transaction[0];
            return events;
        };
        stateChange.events = formatEvents();

        const formatLogs = () => {
            const { logs } = data.transaction[0];
            return logs;
        };
        stateChange.logs = formatLogs();

        // =============================
        // messages
        // =============================
        const formatMessages = () => {
            const messages = convertMsgsToModels(data.transaction[0]);
            return {
                items: messages
            };
        };

        const formatViewRaw = () => {
            return convertDefaultRaw(data.transaction[0]);
        };

        stateChange.messages = formatMessages();
        stateChange.messages.viewRaw = formatViewRaw();

        return stateChange;
    };

    const onMessageFilterCallback = (value: string) => {
        handleSetState({
            messages: {
                filterBy: value
            }
        });
    };

    const toggleMessageDisplay = (event: ChangeEvent<HTMLInputElement>) => {
        handleSetState({
            messages: {
                viewRaw: event.target.checked
            }
        });
    };

    const filterMessages = (messages: any[]) => {
        return messages.filter((x) => {
            if (state.messages.filterBy !== 'none') {
                return x.category === state.messages.filterBy;
            }
            return true;
        });
    };

    return {
        state,
        onMessageFilterCallback,
        toggleMessageDisplay,
        filterMessages
    };
};
