import { Categories } from '../types';

class MsgCosmwasmUpdateAdmin {
    public category: Categories;
    public type: string;
    public json: any;

    public ownerAddress: string;
    public newAdminAddress: string;
    public contractAddress: string;

    constructor(payload: any) {
      this.category = 'nft';
      this.type = payload.type;
      this.json = payload.json;

      this.ownerAddress = payload.ownerAddress;
      this.newAdminAddress = payload.newAdminAddress;
      this.contractAddress = payload.contractAddress;
    }

    static fromJson(json: any) {
      return new MsgCosmwasmUpdateAdmin({
        json,
        type: json['@type'],
        ownerAddress: json.sender,
        newAdminAddress: json.new_admin,
        contractAddress: json.contract,
      });
    }
}

export default MsgCosmwasmUpdateAdmin;
