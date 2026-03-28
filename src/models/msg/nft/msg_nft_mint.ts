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

    static fromJson(json: any, events: any[]) {
        const nftEvent = events.find((event) => event.type === 'message' && event.attributes?.some((attr) => attr.key === 'nftID'));

        const nftIdAttr = nftEvent?.attributes?.find((attr) => attr.key === 'nftID');
        const nftId = nftIdAttr?.value || 'Unknown';

        return new MsgNFTMint({
            json,
            type: json['@type'],
            owner: json.owner,
            tokenURI: json.tokenURI,
            nftId
        });
    }
}
export default MsgNFTMint;
