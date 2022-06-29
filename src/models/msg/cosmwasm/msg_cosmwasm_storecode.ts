import { Categories } from '../types';

class MsgCosmwasmStoreCode {
    public category: Categories;
    public type: string;
    public json: any;

    public ownerAddress: string;
    public codeId: string;

    constructor(payload: any) {
      this.category = 'nft';
      this.type = payload.type;
      this.json = payload.json;

      this.ownerAddress = payload.ownerAddress;
      this.codeId = payload.codeId;
    }

    static fromJson(json: any, log: any) {
      return new MsgCosmwasmStoreCode({
        json,
        type: json['@type'],
        ownerAddress: json.sender,
        codeId: log ? log.events[1].attributes[0].value : 'UNKNWON',
      });
    }
}

export default MsgCosmwasmStoreCode;
