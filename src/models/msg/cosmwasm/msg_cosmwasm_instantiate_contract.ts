import { Categories } from '../types';

class MsgCosmwasmInstantiateContract {
    public category: Categories;
    public type: string;
    public json: any;

    public ownerAddress: string;
    public contractAddress: string;
    public adminAddress: string;
    public label: string;
    public codeId: string;

    constructor(payload: any) {
      this.category = 'nft';
      this.type = payload.type;
      this.json = payload.json;

      this.ownerAddress = payload.ownerAddress;
      this.adminAddress = payload.adminAddress;
      this.contractAddress = payload.contractAddress;
      this.label = payload.label;
      this.codeId = payload.codeId;
    }

    static fromJson(json: any, log: any) {
      let contractAddress = 'NULL';
      if(log !== null){
        contractAddress = log.events.filter((v:any) => {
          return v.type === "instantiate"
        })[0].attributes[0].value;
      }

      return new MsgCosmwasmInstantiateContract({
        json,
        type: json['@type'],
        ownerAddress: json.sender,
        adminAddress: json.admin,
        contractAddress,
        codeId: json.code_id
      });
    }
}

export default MsgCosmwasmInstantiateContract;
