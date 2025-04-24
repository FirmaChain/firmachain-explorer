import * as R from 'ramda';
import { chainConfig } from '@configs';
import { formatToken } from '@utils/format_token';
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
  static getCodeId(events: any) {
    if (events === null) {
      return 'Unknown';
    }
    const WasmEvent = events.find(event =>
      event.type === 'store_code' &&
      event.attributes?.some(attr => attr.key === 'code_id')
    );
  
    const codeIdAttr = WasmEvent?.attributes?.find(attr => attr.key === 'code_id');
    const codeId = codeIdAttr?.value || 'Unknown'; 
    return codeId
  }

  static fromJson(json: any, events: any) {
    const codeId = this.getCodeId(events);
    return new MsgCosmwasmStoreCode({
      json,
      type: json['@type'],
      ownerAddress: json.sender,
      codeId,
    });
  }
}

export default MsgCosmwasmStoreCode;
