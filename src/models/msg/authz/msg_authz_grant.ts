import { Categories } from '../types';

class MsgAuthzGrant {
    public category: Categories;
    public type: string;
    public json: any;

    public grantee: string;
    public granter: string;
    public grant: {
        expiration:string;
        authorication:{
            type:string;
            spendLimit:{
                denom : string;
                amount : string | number
            }[];
        }
    }

    constructor(payload: any) {
      this.category = 'authz';
      this.type = payload.type;
      this.json = payload.json;

      this.grantee = payload.grantee;
      this.granter = payload.granter;
      this.grant = payload.grant;
    }

    static fromJson(json: any, log: any) {
      return new MsgAuthzGrant({
        json,
        type: json['@type'],
        grantee: json.grantee,
        granter: json.granter,
        grant : json.grant,
      });
    }
}

export default MsgAuthzGrant;
