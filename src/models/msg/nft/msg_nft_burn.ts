import { Categories } from '../types';

class MsgNFTBurn {
    public category: Categories;
    public type: string;
    public json: any;

    public ownerAddress: string;
    public nftId: string;

    constructor(payload: any) {
      this.category = 'nft';
      this.type = payload.type;
      this.json = payload.json;

      this.ownerAddress = payload.owner;
      this.nftId = payload.nftId;
    }

    static fromJson(json: any, log: any) {
      return new MsgNFTBurn({
        json,
        type: json['@type'],
        owner: json.owner,
        nftId: json.nftId
      });
    }
}

export default MsgNFTBurn;
