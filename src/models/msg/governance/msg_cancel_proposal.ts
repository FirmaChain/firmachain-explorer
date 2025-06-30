import numeral from 'numeral';
import { Categories } from '../types';

class MsgCancelProposal {
  public category: Categories;
  public type: string;
  public proposalId: number | string;
  public proposer: string;
  public json: any;

  constructor(payload: any) {
    this.category = 'governance';
    this.type = payload.type;
    this.proposalId = payload.proposalId;
    this.proposer = payload.proposer;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgCancelProposal({
      json,
      type: json['@type'],
      proposalId: numeral(json.proposal_id).value(),
      proposer: json.proposer,
    });
  }
}

export default MsgCancelProposal;
