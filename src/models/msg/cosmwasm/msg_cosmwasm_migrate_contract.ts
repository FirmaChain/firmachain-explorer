import { Categories } from '../types';

class MsgCosmwasmMigrateContract {
    public category: Categories;
    public type: string;
    public json: any;

    public ownerAddress: string;
    public contractAddress: string;
    public codeId: string;

    constructor(payload: any) {
      this.category = 'nft';
      this.type = payload.type;
      this.json = payload.json;

      this.ownerAddress = payload.ownerAddress;
      this.contractAddress = payload.contractAddress;
      this.codeId = payload.codeId;
    }

    static fromJson(json: any) {
      return new MsgCosmwasmMigrateContract({
        json,
        type: json['@type'],
        ownerAddress: json.sender,
        contractAddress: json.contract,
        codeId: json.code_id,
      });
    }
}

export default MsgCosmwasmMigrateContract;
