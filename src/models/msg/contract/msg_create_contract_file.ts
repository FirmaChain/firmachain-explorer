import { Categories } from '../types';

class MsgCreateContractFile {
    public category: Categories;
    public type: string;
    public json: any;

    public contractHash: string;
    public creatorAddress: string;
    public ownerList: string[];
    public timeStamp: string;
    public metaDataJsonString: string;

    constructor(payload: any) {
      this.category = 'contract';
      this.type = payload.type;
      this.json = payload.json;

      this.contractHash = payload.contractHash;
      this.creatorAddress = payload.creator;
      this.ownerList = payload.ownerList;
      this.timeStamp = payload.timeStamp;
      this.metaDataJsonString = payload.metaDataJsonString;
    }

    static fromJson(json: any) {
      return new MsgCreateContractFile({
        json,
        type: json['@type'],
        fileHash: json.fileHash,
        creator: json.creator,
        ownerList: json.ownerList,
        timeStamp: json.timeStamp,
        metaDataJsonString: json.metaDataJsonString,
      });
    }
}

export default MsgCreateContractFile;
