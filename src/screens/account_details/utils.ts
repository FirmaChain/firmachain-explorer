import {
    AccountBalancesDocument,
    AccountCommissionDocument,
    AccountDelegationBalanceDocument,
    AccountDelegationRewardsDocument,
    AccountUnbondingBalanceDocument,
    AccountWithdrawalAddressDocument
} from '@/graphql/account_details_documents';
import { ENV } from '@configs/env';
import { toValidatorAddress } from '@utils/prefix_convert';
import * as R from 'ramda';

export const fetchCommission = async (address: string) => {
    const defaultReturnValue = {
        commission: {
            coins: null
        }
    };
    try {
        const response = await fetch(ENV.GRAPHQL_URL, {
            method: 'POST',
            body: JSON.stringify({
                variables: {
                    validatorAddress: toValidatorAddress(address)
                },
                query: AccountCommissionDocument
            })
        });
        const data = await response.json();

        return R.pathOr(defaultReturnValue, ['data'], data);
    } catch (error) {
        return defaultReturnValue;
    }
};

export const fetchAccountWithdrawalAddress = async (address: string) => {
    const defaultReturnValue = {
        withdrawalAddress: {
            address
        }
    };
    try {
        const response = await fetch(ENV.GRAPHQL_URL, {
            method: 'POST',
            body: JSON.stringify({
                variables: {
                    address
                },
                query: AccountWithdrawalAddressDocument
            })
        });
        const data = await response.json();

        return R.pathOr(defaultReturnValue, ['data'], data);
    } catch (error) {
        return defaultReturnValue;
    }
};

export const fetchAvailableBalances = async (address: string) => {
    const defaultReturnValue = {
        accountBalances: {
            coins: []
        }
    };
    try {
        const response = await fetch(ENV.GRAPHQL_URL, {
            method: 'POST',
            body: JSON.stringify({
                variables: {
                    address
                },
                query: AccountBalancesDocument
            })
        });
        const data = await response.json();

        return R.pathOr(defaultReturnValue, ['data'], data);
    } catch (error) {
        return defaultReturnValue;
    }
};

export const fetchDelegationBalance = async (address: string) => {
    const defaultReturnValue = {
        delegationBalance: {
            coins: []
        }
    };
    try {
        const response = await fetch(ENV.GRAPHQL_URL, {
            method: 'POST',
            body: JSON.stringify({
                variables: {
                    address
                },
                query: AccountDelegationBalanceDocument
            })
        });
        const data = await response.json();

        return R.pathOr(defaultReturnValue, ['data'], data);
    } catch (error) {
        return defaultReturnValue;
    }
};

export const fetchUnbondingBalance = async (address: string) => {
    const defaultReturnValue = {
        unbondingBalance: {
            coins: []
        }
    };
    try {
        const response = await fetch(ENV.GRAPHQL_URL, {
            method: 'POST',
            body: JSON.stringify({
                variables: {
                    address
                },
                query: AccountUnbondingBalanceDocument
            })
        });
        const data = await response.json();

        return R.pathOr(defaultReturnValue, ['data'], data);
    } catch (error) {
        return defaultReturnValue;
    }
};

export const fetchRewards = async (address: string) => {
    const defaultReturnValue = {
        delegationRewards: []
    };
    try {
        const response = await fetch(ENV.GRAPHQL_URL, {
            method: 'POST',
            body: JSON.stringify({
                variables: {
                    address
                },
                query: AccountDelegationRewardsDocument
            })
        });
        const data = await response.json();

        return R.pathOr(defaultReturnValue, ['data'], data);
    } catch (error) {
        return defaultReturnValue;
    }
};
