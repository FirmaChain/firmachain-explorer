import { chainConfig } from '@configs';
import { ACCOUNT_DETAILS, BLOCK_DETAILS, PROFILE_DETAILS, TRANSACTION_DETAILS, VALIDATOR_DETAILS } from '@utils/go_to_page';
import { readValidator, useValidatorsStore } from '@zustand/validators';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export const useSearchBar = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('common');

    const handleOnSubmit = async (value: string, clear?: () => void) => {
        const consensusRegex = `^(${chainConfig.prefix.consensus})`;
        const validatorRegex = `^(${chainConfig.prefix.validator})`;
        const userRegex = `^(${chainConfig.prefix.account})`;
        const parsedValue = value.replace(/\s+/g, '');

        if (new RegExp(consensusRegex).test(parsedValue)) {
            const validatorAddress = readValidator(parsedValue)(useValidatorsStore.getState());
            if (validatorAddress) {
                navigate(VALIDATOR_DETAILS(validatorAddress.validator));
            } else {
                toast(t('common:useValidatorAddress'));
            }
        } else if (new RegExp(validatorRegex).test(parsedValue)) {
            navigate(VALIDATOR_DETAILS(parsedValue));
        } else if (new RegExp(userRegex).test(parsedValue)) {
            navigate(ACCOUNT_DETAILS(parsedValue));
        } else if (/^@/.test(parsedValue)) {
            const configProfile = chainConfig.extra.profile;
            if (!configProfile) {
                toast(t('common:profilesNotEnabled'));
            } else if (parsedValue === '@') {
                toast(t('common:insertValidDtag'));
            } else {
                navigate(PROFILE_DETAILS(parsedValue));
            }
        } else if (/^-?\d+$/.test(numeral(parsedValue).value())) {
            navigate(BLOCK_DETAILS(numeral(parsedValue).value()));
        } else {
            navigate(TRANSACTION_DETAILS(parsedValue));
        }

        if (clear) {
            clear();
        }
    };

    return {
        handleOnSubmit
    };
};
