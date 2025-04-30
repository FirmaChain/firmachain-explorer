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

    static getInstantiateCodeId(events: any) {
      if (events === null) {
        return 'Unknown';
      }
      const WasmEvent = events.find(event =>
        event.type === 'instantiate' &&
        event.attributes?.some(attr => attr.key === 'code_id')
      );
    
      const codeIdAttr = WasmEvent?.attributes?.find(attr => attr.key === 'code_id');
      const codeId = codeIdAttr?.value || 'Unknown'; 
      return codeId
    }

    static fromJson(json: any, events: any) {
      let contractAddress = 'NULL';
      if(events !== null){
        contractAddress = events.filter((v:any) => {
          return v.type === "instantiate"
        })[0].attributes[0].value;
      }
      const codeId = this.getInstantiateCodeId(events);
      
      return new MsgCosmwasmInstantiateContract({
        json,
        type: json['@type'],
        ownerAddress: json.sender,
        adminAddress: json.admin,
        contractAddress,
        codeId
      });
    }
}

export default MsgCosmwasmInstantiateContract;
