import { Categories } from '../types';

class MsgCosmwasmUpdateLabel {
    public category: Categories;
    public type: string;
    public json: any;

    public ownerAddress: string;
    public newLabelString: string;
    public contractAddress: string;

    constructor(payload: any) {
      this.category = 'nft';
      this.type = payload.type;
      this.json = payload.json;

      this.ownerAddress = payload.ownerAddress;
      this.newLabelString = payload.newLabelString;
      this.contractAddress = payload.contractAddress;
    }

    static fromJson(json: any) {
      return new MsgCosmwasmUpdateLabel({
        json,
        type: json['@type'],
        ownerAddress: json.sender,
        newLabelString: json.new_label,
        contractAddress: json.contract,
      });
    }
}

export default MsgCosmwasmUpdateLabel;
