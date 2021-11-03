export type BaseCategories =
  | "bank"
  | "crisis"
  | "distribution"
  | "governance"
  | "slashing"
  | "staking"
  | "profiles"
  | "ibc"
  | "ibc-transfer"
  | "others";
export type CustomCategories = "nft" | "authz" | "feegrant" | "contract" | "token"; // custom modules
export type Categories = BaseCategories | CustomCategories;
