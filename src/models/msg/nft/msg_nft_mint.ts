import { Categories } from '../types';

class MsgNFTMint {
    public category: Categories;
    public type: string;
    public json: any;

    public ownerAddress: string;
    public tokenURI: string;
    public nftId: string;

    constructor(payload: any) {
      this.category = 'nft';
      this.type = payload.type;
      this.json = payload.json;

      this.ownerAddress = payload.owner;
      this.tokenURI = payload.tokenURI;
      this.nftId = payload.nftId;
    }

    static fromJson(json: any, log: any) {
      return new MsgNFTMint({
        json,
        type: json['@type'],
        owner: json.owner,
        tokenURI: json.tokenURI,
        nftId: log.events[0].attributes[2].value
      });
    }
}

export default MsgNFTMint;
