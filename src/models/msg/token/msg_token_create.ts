import { Categories } from "../types";

class MsgTokenCreate {
  public category: Categories;
  public type: string;
  public json: any;

  public ownerAddress: string;
  public name: string;
  public symbol: string;
  public mintable: boolean;
  public burnable: boolean;
  public tokenURI: string;
  public totalSupply: string;

  constructor(payload: any) {
    this.category = "token";
    this.type = payload.type;
    this.json = payload.json;

    this.ownerAddress = payload.owner;
    this.name = payload.name;
    this.symbol = payload.symbol;
    this.mintable = payload.mintable;
    this.burnable = payload.burnable;
    this.tokenURI = payload.tokenURI;
    this.totalSupply = payload.totalSupply;
  }

  static fromJson(json: any) {
    return new MsgTokenCreate({
      json,
      type: json["@type"],
      owner: json.owner,
      name: json.name,
      symbol: json.symbol,
      mintable: json.mintable,
      burnable: json.burnable,
      tokenURI: json.tokenURI,
      totalSupply: json.totalSupply,
    });
  }
}

export default MsgTokenCreate;
