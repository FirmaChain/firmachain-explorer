import { Categories } from "../types";

class MsgTokenUpdateURI {
  public category: Categories;
  public type: string;
  public json: any;

  public ownerAddress: string;
  public tokenID: string;
  public tokenURI: string;

  constructor(payload: any) {
    this.category = "token";
    this.type = payload.type;
    this.json = payload.json;

    this.ownerAddress = payload.owner;
    this.tokenID = payload.tokenID;
    this.tokenURI = payload.tokenURI;
  }

  static fromJson(json: any) {
    return new MsgTokenUpdateURI({
      json,
      type: json["@type"],
      owner: json.owner,
      tokenID: json.tokenID,
      tokenURI: json.tokenURI,
    });
  }
}

export default MsgTokenUpdateURI;
