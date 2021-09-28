import { Categories } from '../types';

class MsgFeegrantGrant {
    public category: Categories;
    public type: string;
    public json: any;

    public grantee: string;
    public granter: string;

    constructor(payload: any) {
      this.category = 'feegrant';
      this.type = payload.type;
      this.json = payload.json;

      this.grantee = payload.grantee;
      this.granter = payload.granter;
    }

    static fromJson(json: any, log: any) {
      return new MsgFeegrantGrant({
        json,
        type: json['@type'],
        grantee: json.grantee,
        granter: json.granter,
      });
    }
}

export default MsgFeegrantGrant;
