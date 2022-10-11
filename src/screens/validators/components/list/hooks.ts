import { useState } from 'react';
import * as R from 'ramda';
import numeral from 'numeral';
import { useValidatorsQuery, ValidatorsQuery } from '@graphql/types';
import { formatDenom } from '@utils/format_denom';
import { useChainContext } from '@contexts';
import { getValidatorCondition } from '@utils/get_validator_condition';
import { StakingParams, SlashingParams } from '@models';
import { ValidatorsState, ValidatorType } from './types';

export const useValidators = () => {
  const { findAddress } = useChainContext();
  const [search, setSearch] = useState('');
  const [state, setState] = useState<ValidatorsState>({
    loading: true,
    exists: true,
    items: [],
    votingPowerOverall: 0,
    tab: 0,
    sortKey: 'votingPower',
    sortDirection: 'desc',
  });

  const handleSetState = (stateChange: any) => {
    setState((prevState) => R.mergeDeepLeft(stateChange, prevState));
  };

  // ==========================
  // Fetch Data
  // ==========================
  useValidatorsQuery({
    onCompleted: (data) => {
      handleSetState({
        loading: false,
        ...formatValidators(data),
      });
    },
  });

  // ==========================
  // Parse data
  // ==========================
  const formatValidators = (data: ValidatorsQuery) => {
    const stakingParams = StakingParams.fromJson(R.pathOr({}, ['stakingParams', 0, 'params'], data));
    const slashingParams = SlashingParams.fromJson(R.pathOr({}, ['slashingParams', 0, 'params'], data));
    const votingPowerOverall = formatDenom(
      R.pathOr(0, ['stakingPool', 0, 'bondedTokens'], data),
      stakingParams.bondDenom
    ).value;

    const { signedBlockWindow } = slashingParams;

    const formattedItems = data.validator
      .filter((x) => x.validatorInfo)
      .map((x) => {
        const validator = findAddress(x.validatorInfo.operatorAddress);

        let votingPower = R.pathOr(0, ['validatorVotingPowers', 0, 'votingPower'], x);
        let votingPowerPercent = numeral((votingPower / votingPowerOverall) * 100).value();

        const totalDelegations = x.delegations.reduce((a, b) => {
          return a + numeral(R.pathOr(0, ['amount', 'amount'], b)).value();
        }, 0);

        const [selfDelegation] = x.delegations.filter((y) => {
          return y.delegatorAddress === x.validatorInfo.selfDelegateAddress;
        });
        const self = numeral(R.pathOr(0, ['amount', 'amount'], selfDelegation)).value();
        const selfPercent = (self / (totalDelegations || 1)) * 100;

        const missedBlockCounter = R.pathOr(0, ['validatorSigningInfos', 0, 'missedBlocksCounter'], x);
        const condition = getValidatorCondition(signedBlockWindow, missedBlockCounter);

        const status = R.pathOr(0, ['validatorStatuses', 0, 'status'], x);
        const jailed = R.pathOr(false, ['validatorStatuses', 0, 'jailed'], x);
        const tombstoned = R.pathOr(0, ['validatorSigningInfos', 0, 'tombstoned'], x);

        let activeText = 'unknown';
        let activeColor = 'zero';

        let isUnknown = false;

        if (status === 3) {
          activeText = 'active';
          activeColor = 'one';
        } else if (status === 2) {
          activeText = 'unbonding';
          activeColor = 'three';
        } else if (status === 1) {
          activeText = 'unbonded';
          activeColor = 'zero';
        } else {
          activeText = 'unknown';
          activeColor = 'zero';
          isUnknown = true;
        }

        if (isUnknown === false && jailed === true) {
          activeText = 'jailed';
          activeColor = 'two';
        }

        if (tombstoned) {
          activeText = 'Tombstoned';
          activeColor = 'two';
        }

        if (activeText !== 'active') {
          votingPower = 0;
          votingPowerPercent = 0;
        }

        return {
          validator: {
            address: x.validatorInfo.operatorAddress,
            imageUrl: validator.imageUrl,
            name: validator.moniker,
          },
          votingPower,
          votingPowerPercent,
          commission: R.pathOr(0, ['validatorCommissions', 0, 'commission'], x) * 100,
          self,
          selfPercent,
          condition,
          status,
          tombstoned,
          jailed,
          delegators: x.delegations.length,
          active: activeText,
          activeColor,
        };
      });

    return {
      votingPowerOverall,
      items: formattedItems,
    };
  };

  const handleTabChange = (_event: any, newValue: number) => {
    setState((prevState) => ({
      ...prevState,
      tab: newValue,
    }));
  };

  const handleSort = (key: string) => {
    if (key === state.sortKey) {
      setState((prevState) => ({
        ...prevState,
        sortDirection: prevState.sortDirection === 'asc' ? 'desc' : 'asc',
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        sortKey: key,
        sortDirection: 'asc', // new key so we start the sort by asc
      }));
    }
  };

  const sortItems = (items: ValidatorType[]) => {
    let sorted: ValidatorType[] = R.clone(items);

    if (state.tab === 0) {
      sorted = sorted.filter((x) => x.status === 3);
    }

    if (state.tab === 1) {
      sorted = sorted.filter((x) => x.status !== 3);
    }

    if (search) {
      sorted = sorted.filter((x) => {
        return (
          x.validator.name.toLowerCase().replace(/ /g, '').includes(search.toLowerCase()) ||
          x.validator.address.toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    if (state.sortKey && state.sortDirection) {
      sorted.sort((a, b) => {
        let compareA = R.pathOr(undefined, [...state.sortKey.split('.')], a);
        let compareB = R.pathOr(undefined, [...state.sortKey.split('.')], b);

        if (typeof compareA === 'string') {
          compareA = compareA.toLowerCase();
          compareB = compareB.toLowerCase();
        }

        if (compareA < compareB) {
          return state.sortDirection === 'asc' ? -1 : 1;
        }
        if (compareA > compareB) {
          return state.sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sorted;
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return {
    state,
    handleTabChange,
    handleSort,
    handleSearch,
    sortItems,
  };
};
