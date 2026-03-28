import { chainConfig } from '@configs';
import * as R from 'ramda';

/**
 * Helper Function to get Denom from a list
 * @param denom The denom you wish to convert to
 * @param value The value in base denom value
 */
export const getDenom = (
    list: any = [],
    denom = chainConfig.primaryTokenUnit
): {
    denom: string;
    amount: string | number;
} => {
    // If list is an object with a `coins` array, extract it
    const actualList = Array.isArray(list) ? list : Array.isArray(list?.coins) ? list.coins : [];

    const [selectedDenom] = actualList.filter((x) => x.denom === denom);

    let results: {
        denom: string;
        amount: string | number;
    } = {
        denom,
        amount: '0'
    };

    if (selectedDenom) {
        results = {
            denom: R.pathOr('', ['denom'], selectedDenom),
            amount: R.pathOr('0', ['amount'], selectedDenom)
        };
    }

    return results;
};
