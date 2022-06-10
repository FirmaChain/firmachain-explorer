import { Categories } from '../types';

class MsgCosmwasmExecuteContract {
    public category: Categories;
    public type: string;
    public json: any;

    public contractAddress: string;

    constructor(payload: any) {
      this.category = 'nft';
      this.type = payload.type;
      this.json = payload.json;

      this.contractAddress = payload.contractAddress;
    }

    static fromJson(json: any, log: any) {
      return new MsgCosmwasmExecuteContract({
        json,
        type: json['@type'],
        contractAddress: json.contract,
      });
    }
}

export default MsgCosmwasmExecuteContract;
