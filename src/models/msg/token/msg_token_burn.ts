import { Categories } from "../types";

class MsgTokenBurn {
  public category: Categories;
  public type: string;
  public json: any;

  public ownerAddress: string;
  public tokenID: string;
  public amount: string;

  constructor(payload: any) {
    this.category = "token";
    this.type = payload.type;
    this.json = payload.json;

    this.ownerAddress = payload.owner;
    this.tokenID = payload.tokenID;
    this.amount = payload.amount;
  }

  static fromJson(json: any) {
    return new MsgTokenBurn({
      json,
      type: json["@type"],
      owner: json.owner,
      tokenID: json.tokenID,
      amount: json.amount,
    });
  }
}

export default MsgTokenBurn;
