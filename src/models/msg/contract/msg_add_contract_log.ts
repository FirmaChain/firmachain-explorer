import { Categories } from '../types';

class MsgAddContractLog {
    public category: Categories;
    public type: string;
    public json: any;

    public contractHash: string;
    public creatorAddress: string;
    public ownerAddress: string;
    public eventName: string;
    public timeStamp: string;
    public jsonString: string;

    constructor(payload: any) {
      this.category = 'contract';
      this.type = payload.type;
      this.json = payload.json;

      this.contractHash = payload.contractHash;
      this.creatorAddress = payload.creator;
      this.ownerAddress = payload.ownerAddress;
      this.eventName = payload.eventName;
      this.timeStamp = payload.timeStamp;
      this.jsonString = payload.jsonString;
    }

    static fromJson(json: any) {
      return new MsgAddContractLog({
        json,
        type: json['@type'],
        contractHash: json.contractHash,
        creator: json.creator,
        ownerAddress: json.ownerAddress,
        eventName: json.eventName,
        timeStamp: json.timeStamp,
        jsonString: json.jsonString,
      });
    }
}

export default MsgAddContractLog;
