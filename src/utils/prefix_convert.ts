import { chainConfig } from '@configs';
import { bech32 } from 'bech32';

export const toValidatorAddress = (address: string) => {
    if (!address) {
        return '';
    }
    const decode = bech32.decode(address).words;
    return bech32.encode(chainConfig.prefix.validator, decode);
};
