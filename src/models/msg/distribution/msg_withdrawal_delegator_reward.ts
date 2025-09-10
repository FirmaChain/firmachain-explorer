import * as R from 'ramda';
import { formatToken } from '@utils/format_token';
import { chainConfig } from '@configs';
import { Categories } from '../types';

class MsgWithdrawDelegatorReward {
  public category: Categories;
  public type: string;
  public delegatorAddress: string;
  public validatorAddress: string;
  public amounts: TokenUnit[];
  public json: any;

  constructor(payload: any) {
    this.category = 'distribution';
    this.type = payload.type;
    this.delegatorAddress = payload.delegatorAddress;
    this.validatorAddress = payload.validatorAddress;
    this.amounts = payload.amounts;
    this.json = payload.json;
  }

  static getWithdrawalAmount(events: any, validatorAddress: string) {
    if (events === null) {
      return [formatToken(0)];
    }
    const withdrawEvents = events.filter((x) => x.type === 'withdraw_rewards');

    // 해당 validator에 맞는 withdraw_rewards 이벤트 찾기
    const matchingEvent = withdrawEvents.find((event) => {
      const validatorAttr = event.attributes?.find((attr) => attr.key === 'validator');
      return validatorAttr?.value === validatorAddress;
    });

    if (!matchingEvent) {
      return [formatToken(0)];
    }

    const withdrawAmounts = matchingEvent.attributes.filter((x) => x.key === 'amount');

    const amounts = R.pathOr('0', [0, 'value'], withdrawAmounts).split(',').map((x) => {
      const [amount, denom = chainConfig.primaryTokenUnit] = x.match(/[a-z]+|[^a-z]+/gi);
      return formatToken(amount, denom);
    });

    return amounts;
  }

  static fromJson(json: any, events?: any, msgIndex?: number) {
    const validatorAddress = json.validator_address;
    const amounts = this.getWithdrawalAmount(events, validatorAddress);

    return new MsgWithdrawDelegatorReward({
      json,
      type: json['@type'],
      delegatorAddress: json.delegator_address,
      validatorAddress,
      amounts,
    });
  }
}

export default MsgWithdrawDelegatorReward;
