import { Categories } from '../types';

class MsgNFTTransfer {
    public category: Categories;
    public type: string;
    public json: any;

    public ownerAddress: string;
    public toAddress: string;
    public nftId: string;

    constructor(payload: any) {
      this.category = 'nft';
      this.type = payload.type;
      this.json = payload.json;

      this.ownerAddress = payload.owner;
      this.toAddress = payload.toAddress;
      this.nftId = payload.nftId;
    }

    static fromJson(json: any, log: any) {
      return new MsgNFTTransfer({
        json,
        type: json['@type'],
        owner: json.owner,
        toAddress: json.toAddress,
        nftId: json.nftId
      });
    }
}

export default MsgNFTTransfer;
