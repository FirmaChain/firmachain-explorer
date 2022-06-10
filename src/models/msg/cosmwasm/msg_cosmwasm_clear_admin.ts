import { Categories } from '../types';

class MsgCosmwasmClearAdmin {
    public category: Categories;
    public type: string;
    public json: any;

    public ownerAddress: string;
    public contractAddress: string;

    constructor(payload: any) {
      this.category = 'nft';
      this.type = payload.type;
      this.json = payload.json;

      this.ownerAddress = payload.ownerAddress;
      this.contractAddress = payload.contractAddress;
    }

    static fromJson(json: any) {
      return new MsgCosmwasmClearAdmin({
        json,
        type: json['@type'],
        ownerAddress: json.sender,
        contractAddress: json.contract,
      });
    }
}

export default MsgCosmwasmClearAdmin;
