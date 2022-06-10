import { Categories } from '../types';

class MsgExec {
  public category: Categories;
  public type: string;
  public json: any;
  public grantee: string;

  constructor(payload: any) {
    this.category = 'authz';
    this.type = payload.type;
    this.json = payload.json;
    this.grantee = payload.grantee;
  }

  static fromJson(json: any) {
    return new MsgExec({
      json,
      type: json['@type'],
      grantee: json.grantee,
    });
  }
}

export default MsgExec;
