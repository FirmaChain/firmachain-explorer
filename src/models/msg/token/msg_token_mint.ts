import { Categories } from "../types";

class MsgTokenMint {
  public category: Categories;
  public type: string;
  public json: any;

  public ownerAddress: string;
  public tokenID: string;
  public amount: string;
  public toAddress: string;

  constructor(payload: any) {
    this.category = "token";
    this.type = payload.type;
    this.json = payload.json;

    this.ownerAddress = payload.owner;
    this.tokenID = payload.tokenID;
    this.amount = payload.amount;
    this.toAddress = payload.toAddress;
  }

  static fromJson(json: any) {
    return new MsgTokenMint({
      json,
      type: json["@type"],
      owner: json.owner,
      tokenID: json.tokenID,
      amount: json.amount,
      toAddress: json.toAddress,
    });
  }
}

export default MsgTokenMint;
