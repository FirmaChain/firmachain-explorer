export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  jsonb: any;
  timestamp: any;
};


/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "application_link" */
export type Application_Link = {
  __typename?: 'application_link';
  application: Scalars['String'];
  creation_time: Scalars['timestamp'];
  expiration_time: Scalars['timestamp'];
  /** An object relationship */
  oracle_request?: Maybe<Application_Link_Oracle_Request>;
  /** An object relationship */
  profile?: Maybe<Profile>;
  result?: Maybe<Scalars['jsonb']>;
  state: Scalars['String'];
  user_address: Scalars['String'];
  username: Scalars['String'];
};


/** columns and relationships of "application_link" */
export type Application_LinkResultArgs = {
  path?: Maybe<Scalars['String']>;
};

/** order by aggregate values of table "application_link" */
export type Application_Link_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Application_Link_Max_Order_By>;
  min?: Maybe<Application_Link_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "application_link". All fields are combined with a logical 'AND'. */
export type Application_Link_Bool_Exp = {
  _and?: Maybe<Array<Application_Link_Bool_Exp>>;
  _not?: Maybe<Application_Link_Bool_Exp>;
  _or?: Maybe<Array<Application_Link_Bool_Exp>>;
  application?: Maybe<String_Comparison_Exp>;
  creation_time?: Maybe<Timestamp_Comparison_Exp>;
  expiration_time?: Maybe<Timestamp_Comparison_Exp>;
  oracle_request?: Maybe<Application_Link_Oracle_Request_Bool_Exp>;
  profile?: Maybe<Profile_Bool_Exp>;
  result?: Maybe<Jsonb_Comparison_Exp>;
  state?: Maybe<String_Comparison_Exp>;
  user_address?: Maybe<String_Comparison_Exp>;
  username?: Maybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "application_link" */
export type Application_Link_Max_Order_By = {
  application?: Maybe<Order_By>;
  creation_time?: Maybe<Order_By>;
  expiration_time?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  user_address?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** order by min() on columns of table "application_link" */
export type Application_Link_Min_Order_By = {
  application?: Maybe<Order_By>;
  creation_time?: Maybe<Order_By>;
  expiration_time?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  user_address?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** columns and relationships of "application_link_oracle_request" */
export type Application_Link_Oracle_Request = {
  __typename?: 'application_link_oracle_request';
  call_data: Scalars['jsonb'];
  client_id: Scalars['String'];
  request_id: Scalars['bigint'];
  script_id: Scalars['bigint'];
};


/** columns and relationships of "application_link_oracle_request" */
export type Application_Link_Oracle_RequestCall_DataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "application_link_oracle_request". All fields are combined with a logical 'AND'. */
export type Application_Link_Oracle_Request_Bool_Exp = {
  _and?: Maybe<Array<Application_Link_Oracle_Request_Bool_Exp>>;
  _not?: Maybe<Application_Link_Oracle_Request_Bool_Exp>;
  _or?: Maybe<Array<Application_Link_Oracle_Request_Bool_Exp>>;
  call_data?: Maybe<Jsonb_Comparison_Exp>;
  client_id?: Maybe<String_Comparison_Exp>;
  request_id?: Maybe<Bigint_Comparison_Exp>;
  script_id?: Maybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "application_link_oracle_request". */
export type Application_Link_Oracle_Request_Order_By = {
  call_data?: Maybe<Order_By>;
  client_id?: Maybe<Order_By>;
  request_id?: Maybe<Order_By>;
  script_id?: Maybe<Order_By>;
};

/** select columns of table "application_link_oracle_request" */
export enum Application_Link_Oracle_Request_Select_Column {
  /** column name */
  CallData = 'call_data',
  /** column name */
  ClientId = 'client_id',
  /** column name */
  RequestId = 'request_id',
  /** column name */
  ScriptId = 'script_id'
}

/** Ordering options when selecting data from "application_link". */
export type Application_Link_Order_By = {
  application?: Maybe<Order_By>;
  creation_time?: Maybe<Order_By>;
  expiration_time?: Maybe<Order_By>;
  oracle_request?: Maybe<Application_Link_Oracle_Request_Order_By>;
  profile?: Maybe<Profile_Order_By>;
  result?: Maybe<Order_By>;
  state?: Maybe<Order_By>;
  user_address?: Maybe<Order_By>;
  username?: Maybe<Order_By>;
};

/** columns and relationships of "application_link_score" */
export type Application_Link_Score = {
  __typename?: 'application_link_score';
  details: Scalars['jsonb'];
  score: Scalars['Int'];
  timestamp: Scalars['timestamp'];
};


/** columns and relationships of "application_link_score" */
export type Application_Link_ScoreDetailsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "application_link_score". All fields are combined with a logical 'AND'. */
export type Application_Link_Score_Bool_Exp = {
  _and?: Maybe<Array<Application_Link_Score_Bool_Exp>>;
  _not?: Maybe<Application_Link_Score_Bool_Exp>;
  _or?: Maybe<Array<Application_Link_Score_Bool_Exp>>;
  details?: Maybe<Jsonb_Comparison_Exp>;
  score?: Maybe<Int_Comparison_Exp>;
  timestamp?: Maybe<Timestamp_Comparison_Exp>;
};

/** Ordering options when selecting data from "application_link_score". */
export type Application_Link_Score_Order_By = {
  details?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  timestamp?: Maybe<Order_By>;
};

/** select columns of table "application_link_score" */
export enum Application_Link_Score_Select_Column {
  /** column name */
  Details = 'details',
  /** column name */
  Score = 'score',
  /** column name */
  Timestamp = 'timestamp'
}

/** select columns of table "application_link" */
export enum Application_Link_Select_Column {
  /** column name */
  Application = 'application',
  /** column name */
  CreationTime = 'creation_time',
  /** column name */
  ExpirationTime = 'expiration_time',
  /** column name */
  Result = 'result',
  /** column name */
  State = 'state',
  /** column name */
  UserAddress = 'user_address',
  /** column name */
  Username = 'username'
}


/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: Maybe<Scalars['bigint']>;
  _gt?: Maybe<Scalars['bigint']>;
  _gte?: Maybe<Scalars['bigint']>;
  _in?: Maybe<Array<Scalars['bigint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['bigint']>;
  _lte?: Maybe<Scalars['bigint']>;
  _neq?: Maybe<Scalars['bigint']>;
  _nin?: Maybe<Array<Scalars['bigint']>>;
};

/** columns and relationships of "chain_link" */
export type Chain_Link = {
  __typename?: 'chain_link';
  /** An object relationship */
  chain_config: Chain_Link_Chain_Config;
  /** An array relationship */
  chain_link_proofs: Array<Chain_Link_Proof>;
  creation_time: Scalars['timestamp'];
  external_address: Scalars['String'];
  height: Scalars['bigint'];
  /** An object relationship */
  profile?: Maybe<Profile>;
  /** An object relationship */
  proof?: Maybe<Chain_Link_Proof>;
  user_address: Scalars['String'];
};


/** columns and relationships of "chain_link" */
export type Chain_LinkChain_Link_ProofsArgs = {
  distinct_on?: Maybe<Array<Chain_Link_Proof_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chain_Link_Proof_Order_By>>;
  where?: Maybe<Chain_Link_Proof_Bool_Exp>;
};

/** order by aggregate values of table "chain_link" */
export type Chain_Link_Aggregate_Order_By = {
  avg?: Maybe<Chain_Link_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Chain_Link_Max_Order_By>;
  min?: Maybe<Chain_Link_Min_Order_By>;
  stddev?: Maybe<Chain_Link_Stddev_Order_By>;
  stddev_pop?: Maybe<Chain_Link_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Chain_Link_Stddev_Samp_Order_By>;
  sum?: Maybe<Chain_Link_Sum_Order_By>;
  var_pop?: Maybe<Chain_Link_Var_Pop_Order_By>;
  var_samp?: Maybe<Chain_Link_Var_Samp_Order_By>;
  variance?: Maybe<Chain_Link_Variance_Order_By>;
};

/** order by avg() on columns of table "chain_link" */
export type Chain_Link_Avg_Order_By = {
  height?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "chain_link". All fields are combined with a logical 'AND'. */
export type Chain_Link_Bool_Exp = {
  _and?: Maybe<Array<Chain_Link_Bool_Exp>>;
  _not?: Maybe<Chain_Link_Bool_Exp>;
  _or?: Maybe<Array<Chain_Link_Bool_Exp>>;
  chain_config?: Maybe<Chain_Link_Chain_Config_Bool_Exp>;
  chain_link_proofs?: Maybe<Chain_Link_Proof_Bool_Exp>;
  creation_time?: Maybe<Timestamp_Comparison_Exp>;
  external_address?: Maybe<String_Comparison_Exp>;
  height?: Maybe<Bigint_Comparison_Exp>;
  profile?: Maybe<Profile_Bool_Exp>;
  proof?: Maybe<Chain_Link_Proof_Bool_Exp>;
  user_address?: Maybe<String_Comparison_Exp>;
};

/** columns and relationships of "chain_link_chain_config" */
export type Chain_Link_Chain_Config = {
  __typename?: 'chain_link_chain_config';
  /** An array relationship */
  chain_links: Array<Chain_Link>;
  name: Scalars['String'];
};


/** columns and relationships of "chain_link_chain_config" */
export type Chain_Link_Chain_ConfigChain_LinksArgs = {
  distinct_on?: Maybe<Array<Chain_Link_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chain_Link_Order_By>>;
  where?: Maybe<Chain_Link_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "chain_link_chain_config". All fields are combined with a logical 'AND'. */
export type Chain_Link_Chain_Config_Bool_Exp = {
  _and?: Maybe<Array<Chain_Link_Chain_Config_Bool_Exp>>;
  _not?: Maybe<Chain_Link_Chain_Config_Bool_Exp>;
  _or?: Maybe<Array<Chain_Link_Chain_Config_Bool_Exp>>;
  chain_links?: Maybe<Chain_Link_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "chain_link_chain_config". */
export type Chain_Link_Chain_Config_Order_By = {
  chain_links_aggregate?: Maybe<Chain_Link_Aggregate_Order_By>;
  name?: Maybe<Order_By>;
};

/** select columns of table "chain_link_chain_config" */
export enum Chain_Link_Chain_Config_Select_Column {
  /** column name */
  Name = 'name'
}

/** order by max() on columns of table "chain_link" */
export type Chain_Link_Max_Order_By = {
  creation_time?: Maybe<Order_By>;
  external_address?: Maybe<Order_By>;
  height?: Maybe<Order_By>;
  user_address?: Maybe<Order_By>;
};

/** order by min() on columns of table "chain_link" */
export type Chain_Link_Min_Order_By = {
  creation_time?: Maybe<Order_By>;
  external_address?: Maybe<Order_By>;
  height?: Maybe<Order_By>;
  user_address?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "chain_link". */
export type Chain_Link_Order_By = {
  chain_config?: Maybe<Chain_Link_Chain_Config_Order_By>;
  chain_link_proofs_aggregate?: Maybe<Chain_Link_Proof_Aggregate_Order_By>;
  creation_time?: Maybe<Order_By>;
  external_address?: Maybe<Order_By>;
  height?: Maybe<Order_By>;
  profile?: Maybe<Profile_Order_By>;
  proof?: Maybe<Chain_Link_Proof_Order_By>;
  user_address?: Maybe<Order_By>;
};

/** columns and relationships of "chain_link_proof" */
export type Chain_Link_Proof = {
  __typename?: 'chain_link_proof';
  /** An object relationship */
  chain_link: Chain_Link;
  plain_text: Scalars['String'];
  public_key: Scalars['jsonb'];
  signature: Scalars['String'];
};


/** columns and relationships of "chain_link_proof" */
export type Chain_Link_ProofPublic_KeyArgs = {
  path?: Maybe<Scalars['String']>;
};

/** order by aggregate values of table "chain_link_proof" */
export type Chain_Link_Proof_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Chain_Link_Proof_Max_Order_By>;
  min?: Maybe<Chain_Link_Proof_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "chain_link_proof". All fields are combined with a logical 'AND'. */
export type Chain_Link_Proof_Bool_Exp = {
  _and?: Maybe<Array<Chain_Link_Proof_Bool_Exp>>;
  _not?: Maybe<Chain_Link_Proof_Bool_Exp>;
  _or?: Maybe<Array<Chain_Link_Proof_Bool_Exp>>;
  chain_link?: Maybe<Chain_Link_Bool_Exp>;
  plain_text?: Maybe<String_Comparison_Exp>;
  public_key?: Maybe<Jsonb_Comparison_Exp>;
  signature?: Maybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "chain_link_proof" */
export type Chain_Link_Proof_Max_Order_By = {
  plain_text?: Maybe<Order_By>;
  signature?: Maybe<Order_By>;
};

/** order by min() on columns of table "chain_link_proof" */
export type Chain_Link_Proof_Min_Order_By = {
  plain_text?: Maybe<Order_By>;
  signature?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "chain_link_proof". */
export type Chain_Link_Proof_Order_By = {
  chain_link?: Maybe<Chain_Link_Order_By>;
  plain_text?: Maybe<Order_By>;
  public_key?: Maybe<Order_By>;
  signature?: Maybe<Order_By>;
};

/** select columns of table "chain_link_proof" */
export enum Chain_Link_Proof_Select_Column {
  /** column name */
  PlainText = 'plain_text',
  /** column name */
  PublicKey = 'public_key',
  /** column name */
  Signature = 'signature'
}

/** select columns of table "chain_link" */
export enum Chain_Link_Select_Column {
  /** column name */
  CreationTime = 'creation_time',
  /** column name */
  ExternalAddress = 'external_address',
  /** column name */
  Height = 'height',
  /** column name */
  UserAddress = 'user_address'
}

/** order by stddev() on columns of table "chain_link" */
export type Chain_Link_Stddev_Order_By = {
  height?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "chain_link" */
export type Chain_Link_Stddev_Pop_Order_By = {
  height?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "chain_link" */
export type Chain_Link_Stddev_Samp_Order_By = {
  height?: Maybe<Order_By>;
};

/** order by sum() on columns of table "chain_link" */
export type Chain_Link_Sum_Order_By = {
  height?: Maybe<Order_By>;
};

/** order by var_pop() on columns of table "chain_link" */
export type Chain_Link_Var_Pop_Order_By = {
  height?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "chain_link" */
export type Chain_Link_Var_Samp_Order_By = {
  height?: Maybe<Order_By>;
};

/** order by variance() on columns of table "chain_link" */
export type Chain_Link_Variance_Order_By = {
  height?: Maybe<Order_By>;
};

/** columns and relationships of "dtag_transfer_requests" */
export type Dtag_Transfer_Requests = {
  __typename?: 'dtag_transfer_requests';
  /** An object relationship */
  receiver?: Maybe<Profile>;
  receiver_address: Scalars['String'];
  /** An object relationship */
  sender?: Maybe<Profile>;
  sender_address: Scalars['String'];
};

/** order by aggregate values of table "dtag_transfer_requests" */
export type Dtag_Transfer_Requests_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Dtag_Transfer_Requests_Max_Order_By>;
  min?: Maybe<Dtag_Transfer_Requests_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "dtag_transfer_requests". All fields are combined with a logical 'AND'. */
export type Dtag_Transfer_Requests_Bool_Exp = {
  _and?: Maybe<Array<Dtag_Transfer_Requests_Bool_Exp>>;
  _not?: Maybe<Dtag_Transfer_Requests_Bool_Exp>;
  _or?: Maybe<Array<Dtag_Transfer_Requests_Bool_Exp>>;
  receiver?: Maybe<Profile_Bool_Exp>;
  receiver_address?: Maybe<String_Comparison_Exp>;
  sender?: Maybe<Profile_Bool_Exp>;
  sender_address?: Maybe<String_Comparison_Exp>;
};

/** order by max() on columns of table "dtag_transfer_requests" */
export type Dtag_Transfer_Requests_Max_Order_By = {
  receiver_address?: Maybe<Order_By>;
  sender_address?: Maybe<Order_By>;
};

/** order by min() on columns of table "dtag_transfer_requests" */
export type Dtag_Transfer_Requests_Min_Order_By = {
  receiver_address?: Maybe<Order_By>;
  sender_address?: Maybe<Order_By>;
};

/** Ordering options when selecting data from "dtag_transfer_requests". */
export type Dtag_Transfer_Requests_Order_By = {
  receiver?: Maybe<Profile_Order_By>;
  receiver_address?: Maybe<Order_By>;
  sender?: Maybe<Profile_Order_By>;
  sender_address?: Maybe<Order_By>;
};

/** select columns of table "dtag_transfer_requests" */
export enum Dtag_Transfer_Requests_Select_Column {
  /** column name */
  ReceiverAddress = 'receiver_address',
  /** column name */
  SenderAddress = 'sender_address'
}


/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "profile" */
export type Profile = {
  __typename?: 'profile';
  address: Scalars['String'];
  /** An array relationship */
  applications_links: Array<Application_Link>;
  bio: Scalars['String'];
  /** An array relationship */
  chain_links: Array<Chain_Link>;
  /** An object relationship */
  counters?: Maybe<Profile_Counters>;
  cover_pic: Scalars['String'];
  creation_time: Scalars['timestamp'];
  dtag: Scalars['String'];
  /** Computed field that tells whether the current Hasura user has blocked this profile */
  has_user_blocked?: Maybe<Scalars['Boolean']>;
  /** An array relationship */
  incoming_dtag_transfer_requests: Array<Dtag_Transfer_Requests>;
  /** Computed field that tells whether the given profile has blocked the current Hasura user */
  is_user_blocked_by?: Maybe<Scalars['Boolean']>;
  /** A computed field that tells whether the given Hasura user is followed by this profile */
  is_user_followed_by?: Maybe<Scalars['Boolean']>;
  /** A computed field that tells whether the current Hasura user is following this profile */
  is_user_following?: Maybe<Scalars['Boolean']>;
  nickname: Scalars['String'];
  /** An array relationship */
  outgoing_dtag_transfer_requests: Array<Dtag_Transfer_Requests>;
  profile_pic: Scalars['String'];
};


/** columns and relationships of "profile" */
export type ProfileApplications_LinksArgs = {
  distinct_on?: Maybe<Array<Application_Link_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Application_Link_Order_By>>;
  where?: Maybe<Application_Link_Bool_Exp>;
};


/** columns and relationships of "profile" */
export type ProfileChain_LinksArgs = {
  distinct_on?: Maybe<Array<Chain_Link_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chain_Link_Order_By>>;
  where?: Maybe<Chain_Link_Bool_Exp>;
};


/** columns and relationships of "profile" */
export type ProfileIncoming_Dtag_Transfer_RequestsArgs = {
  distinct_on?: Maybe<Array<Dtag_Transfer_Requests_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dtag_Transfer_Requests_Order_By>>;
  where?: Maybe<Dtag_Transfer_Requests_Bool_Exp>;
};


/** columns and relationships of "profile" */
export type ProfileOutgoing_Dtag_Transfer_RequestsArgs = {
  distinct_on?: Maybe<Array<Dtag_Transfer_Requests_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dtag_Transfer_Requests_Order_By>>;
  where?: Maybe<Dtag_Transfer_Requests_Bool_Exp>;
};

/** aggregated selection of "profile" */
export type Profile_Aggregate = {
  __typename?: 'profile_aggregate';
  aggregate?: Maybe<Profile_Aggregate_Fields>;
  nodes: Array<Profile>;
};

/** aggregate fields of "profile" */
export type Profile_Aggregate_Fields = {
  __typename?: 'profile_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Profile_Max_Fields>;
  min?: Maybe<Profile_Min_Fields>;
};


/** aggregate fields of "profile" */
export type Profile_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Profile_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "profile". All fields are combined with a logical 'AND'. */
export type Profile_Bool_Exp = {
  _and?: Maybe<Array<Profile_Bool_Exp>>;
  _not?: Maybe<Profile_Bool_Exp>;
  _or?: Maybe<Array<Profile_Bool_Exp>>;
  address?: Maybe<String_Comparison_Exp>;
  applications_links?: Maybe<Application_Link_Bool_Exp>;
  bio?: Maybe<String_Comparison_Exp>;
  chain_links?: Maybe<Chain_Link_Bool_Exp>;
  counters?: Maybe<Profile_Counters_Bool_Exp>;
  cover_pic?: Maybe<String_Comparison_Exp>;
  creation_time?: Maybe<Timestamp_Comparison_Exp>;
  dtag?: Maybe<String_Comparison_Exp>;
  has_user_blocked?: Maybe<Boolean_Comparison_Exp>;
  incoming_dtag_transfer_requests?: Maybe<Dtag_Transfer_Requests_Bool_Exp>;
  is_user_blocked_by?: Maybe<Boolean_Comparison_Exp>;
  is_user_followed_by?: Maybe<Boolean_Comparison_Exp>;
  is_user_following?: Maybe<Boolean_Comparison_Exp>;
  nickname?: Maybe<String_Comparison_Exp>;
  outgoing_dtag_transfer_requests?: Maybe<Dtag_Transfer_Requests_Bool_Exp>;
  profile_pic?: Maybe<String_Comparison_Exp>;
};

/** columns and relationships of "profile_counters" */
export type Profile_Counters = {
  __typename?: 'profile_counters';
  application_links_count: Scalars['bigint'];
  blocks_count: Scalars['bigint'];
  chain_links_count: Scalars['bigint'];
  profile_address: Scalars['String'];
  relationships_count: Scalars['bigint'];
};

/** Boolean expression to filter rows from the table "profile_counters". All fields are combined with a logical 'AND'. */
export type Profile_Counters_Bool_Exp = {
  _and?: Maybe<Array<Profile_Counters_Bool_Exp>>;
  _not?: Maybe<Profile_Counters_Bool_Exp>;
  _or?: Maybe<Array<Profile_Counters_Bool_Exp>>;
  application_links_count?: Maybe<Bigint_Comparison_Exp>;
  blocks_count?: Maybe<Bigint_Comparison_Exp>;
  chain_links_count?: Maybe<Bigint_Comparison_Exp>;
  profile_address?: Maybe<String_Comparison_Exp>;
  relationships_count?: Maybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "profile_counters". */
export type Profile_Counters_Order_By = {
  application_links_count?: Maybe<Order_By>;
  blocks_count?: Maybe<Order_By>;
  chain_links_count?: Maybe<Order_By>;
  profile_address?: Maybe<Order_By>;
  relationships_count?: Maybe<Order_By>;
};

/** select columns of table "profile_counters" */
export enum Profile_Counters_Select_Column {
  /** column name */
  ApplicationLinksCount = 'application_links_count',
  /** column name */
  BlocksCount = 'blocks_count',
  /** column name */
  ChainLinksCount = 'chain_links_count',
  /** column name */
  ProfileAddress = 'profile_address',
  /** column name */
  RelationshipsCount = 'relationships_count'
}

/** aggregate max on columns */
export type Profile_Max_Fields = {
  __typename?: 'profile_max_fields';
  address?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  cover_pic?: Maybe<Scalars['String']>;
  creation_time?: Maybe<Scalars['timestamp']>;
  dtag?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  profile_pic?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Profile_Min_Fields = {
  __typename?: 'profile_min_fields';
  address?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  cover_pic?: Maybe<Scalars['String']>;
  creation_time?: Maybe<Scalars['timestamp']>;
  dtag?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  profile_pic?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "profile". */
export type Profile_Order_By = {
  address?: Maybe<Order_By>;
  applications_links_aggregate?: Maybe<Application_Link_Aggregate_Order_By>;
  bio?: Maybe<Order_By>;
  chain_links_aggregate?: Maybe<Chain_Link_Aggregate_Order_By>;
  counters?: Maybe<Profile_Counters_Order_By>;
  cover_pic?: Maybe<Order_By>;
  creation_time?: Maybe<Order_By>;
  dtag?: Maybe<Order_By>;
  has_user_blocked?: Maybe<Order_By>;
  incoming_dtag_transfer_requests_aggregate?: Maybe<Dtag_Transfer_Requests_Aggregate_Order_By>;
  is_user_blocked_by?: Maybe<Order_By>;
  is_user_followed_by?: Maybe<Order_By>;
  is_user_following?: Maybe<Order_By>;
  nickname?: Maybe<Order_By>;
  outgoing_dtag_transfer_requests_aggregate?: Maybe<Dtag_Transfer_Requests_Aggregate_Order_By>;
  profile_pic?: Maybe<Order_By>;
};

/** select columns of table "profile" */
export enum Profile_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Bio = 'bio',
  /** column name */
  CoverPic = 'cover_pic',
  /** column name */
  CreationTime = 'creation_time',
  /** column name */
  Dtag = 'dtag',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  ProfilePic = 'profile_pic'
}

/** columns and relationships of "profiles_params" */
export type Profiles_Params = {
  __typename?: 'profiles_params';
  params: Scalars['jsonb'];
};


/** columns and relationships of "profiles_params" */
export type Profiles_ParamsParamsArgs = {
  path?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "profiles_params". All fields are combined with a logical 'AND'. */
export type Profiles_Params_Bool_Exp = {
  _and?: Maybe<Array<Profiles_Params_Bool_Exp>>;
  _not?: Maybe<Profiles_Params_Bool_Exp>;
  _or?: Maybe<Array<Profiles_Params_Bool_Exp>>;
  params?: Maybe<Jsonb_Comparison_Exp>;
};

/** Ordering options when selecting data from "profiles_params". */
export type Profiles_Params_Order_By = {
  params?: Maybe<Order_By>;
};

/** select columns of table "profiles_params" */
export enum Profiles_Params_Select_Column {
  /** column name */
  Params = 'params'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "application_link" */
  application_link: Array<Application_Link>;
  /** fetch data from the table: "application_link_oracle_request" */
  application_link_oracle_request: Array<Application_Link_Oracle_Request>;
  /** fetch data from the table: "application_link_score" */
  application_link_score: Array<Application_Link_Score>;
  /** fetch data from the table: "chain_link" */
  chain_link: Array<Chain_Link>;
  /** fetch data from the table: "chain_link_chain_config" */
  chain_link_chain_config: Array<Chain_Link_Chain_Config>;
  /** fetch data from the table: "chain_link_proof" */
  chain_link_proof: Array<Chain_Link_Proof>;
  /** fetch data from the table: "dtag_transfer_requests" */
  dtag_transfer_requests: Array<Dtag_Transfer_Requests>;
  /** fetch data from the table: "profile" */
  profile: Array<Profile>;
  /** fetch aggregated fields from the table: "profile" */
  profile_aggregate: Profile_Aggregate;
  /** fetch data from the table: "profile" using primary key columns */
  profile_by_pk?: Maybe<Profile>;
  /** fetch data from the table: "profile_counters" */
  profile_counters: Array<Profile_Counters>;
  /** fetch data from the table: "profiles_params" */
  profiles_params: Array<Profiles_Params>;
  /** fetch data from the table: "user_block" */
  user_block: Array<User_Block>;
  /** fetch data from the table: "user_relationship" */
  user_relationship: Array<User_Relationship>;
  /** fetch aggregated fields from the table: "user_relationship" */
  user_relationship_aggregate: User_Relationship_Aggregate;
};


export type Query_RootApplication_LinkArgs = {
  distinct_on?: Maybe<Array<Application_Link_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Application_Link_Order_By>>;
  where?: Maybe<Application_Link_Bool_Exp>;
};


export type Query_RootApplication_Link_Oracle_RequestArgs = {
  distinct_on?: Maybe<Array<Application_Link_Oracle_Request_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Application_Link_Oracle_Request_Order_By>>;
  where?: Maybe<Application_Link_Oracle_Request_Bool_Exp>;
};


export type Query_RootApplication_Link_ScoreArgs = {
  distinct_on?: Maybe<Array<Application_Link_Score_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Application_Link_Score_Order_By>>;
  where?: Maybe<Application_Link_Score_Bool_Exp>;
};


export type Query_RootChain_LinkArgs = {
  distinct_on?: Maybe<Array<Chain_Link_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chain_Link_Order_By>>;
  where?: Maybe<Chain_Link_Bool_Exp>;
};


export type Query_RootChain_Link_Chain_ConfigArgs = {
  distinct_on?: Maybe<Array<Chain_Link_Chain_Config_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chain_Link_Chain_Config_Order_By>>;
  where?: Maybe<Chain_Link_Chain_Config_Bool_Exp>;
};


export type Query_RootChain_Link_ProofArgs = {
  distinct_on?: Maybe<Array<Chain_Link_Proof_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chain_Link_Proof_Order_By>>;
  where?: Maybe<Chain_Link_Proof_Bool_Exp>;
};


export type Query_RootDtag_Transfer_RequestsArgs = {
  distinct_on?: Maybe<Array<Dtag_Transfer_Requests_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dtag_Transfer_Requests_Order_By>>;
  where?: Maybe<Dtag_Transfer_Requests_Bool_Exp>;
};


export type Query_RootProfileArgs = {
  distinct_on?: Maybe<Array<Profile_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Order_By>>;
  where?: Maybe<Profile_Bool_Exp>;
};


export type Query_RootProfile_AggregateArgs = {
  distinct_on?: Maybe<Array<Profile_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Order_By>>;
  where?: Maybe<Profile_Bool_Exp>;
};


export type Query_RootProfile_By_PkArgs = {
  address: Scalars['String'];
};


export type Query_RootProfile_CountersArgs = {
  distinct_on?: Maybe<Array<Profile_Counters_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Counters_Order_By>>;
  where?: Maybe<Profile_Counters_Bool_Exp>;
};


export type Query_RootProfiles_ParamsArgs = {
  distinct_on?: Maybe<Array<Profiles_Params_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profiles_Params_Order_By>>;
  where?: Maybe<Profiles_Params_Bool_Exp>;
};


export type Query_RootUser_BlockArgs = {
  distinct_on?: Maybe<Array<User_Block_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Block_Order_By>>;
  where?: Maybe<User_Block_Bool_Exp>;
};


export type Query_RootUser_RelationshipArgs = {
  distinct_on?: Maybe<Array<User_Relationship_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Relationship_Order_By>>;
  where?: Maybe<User_Relationship_Bool_Exp>;
};


export type Query_RootUser_Relationship_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Relationship_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Relationship_Order_By>>;
  where?: Maybe<User_Relationship_Bool_Exp>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "application_link" */
  application_link: Array<Application_Link>;
  /** fetch data from the table: "application_link_oracle_request" */
  application_link_oracle_request: Array<Application_Link_Oracle_Request>;
  /** fetch data from the table: "application_link_score" */
  application_link_score: Array<Application_Link_Score>;
  /** fetch data from the table: "chain_link" */
  chain_link: Array<Chain_Link>;
  /** fetch data from the table: "chain_link_chain_config" */
  chain_link_chain_config: Array<Chain_Link_Chain_Config>;
  /** fetch data from the table: "chain_link_proof" */
  chain_link_proof: Array<Chain_Link_Proof>;
  /** fetch data from the table: "dtag_transfer_requests" */
  dtag_transfer_requests: Array<Dtag_Transfer_Requests>;
  /** fetch data from the table: "profile" */
  profile: Array<Profile>;
  /** fetch aggregated fields from the table: "profile" */
  profile_aggregate: Profile_Aggregate;
  /** fetch data from the table: "profile" using primary key columns */
  profile_by_pk?: Maybe<Profile>;
  /** fetch data from the table: "profile_counters" */
  profile_counters: Array<Profile_Counters>;
  /** fetch data from the table: "profiles_params" */
  profiles_params: Array<Profiles_Params>;
  /** fetch data from the table: "user_block" */
  user_block: Array<User_Block>;
  /** fetch data from the table: "user_relationship" */
  user_relationship: Array<User_Relationship>;
  /** fetch aggregated fields from the table: "user_relationship" */
  user_relationship_aggregate: User_Relationship_Aggregate;
};


export type Subscription_RootApplication_LinkArgs = {
  distinct_on?: Maybe<Array<Application_Link_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Application_Link_Order_By>>;
  where?: Maybe<Application_Link_Bool_Exp>;
};


export type Subscription_RootApplication_Link_Oracle_RequestArgs = {
  distinct_on?: Maybe<Array<Application_Link_Oracle_Request_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Application_Link_Oracle_Request_Order_By>>;
  where?: Maybe<Application_Link_Oracle_Request_Bool_Exp>;
};


export type Subscription_RootApplication_Link_ScoreArgs = {
  distinct_on?: Maybe<Array<Application_Link_Score_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Application_Link_Score_Order_By>>;
  where?: Maybe<Application_Link_Score_Bool_Exp>;
};


export type Subscription_RootChain_LinkArgs = {
  distinct_on?: Maybe<Array<Chain_Link_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chain_Link_Order_By>>;
  where?: Maybe<Chain_Link_Bool_Exp>;
};


export type Subscription_RootChain_Link_Chain_ConfigArgs = {
  distinct_on?: Maybe<Array<Chain_Link_Chain_Config_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chain_Link_Chain_Config_Order_By>>;
  where?: Maybe<Chain_Link_Chain_Config_Bool_Exp>;
};


export type Subscription_RootChain_Link_ProofArgs = {
  distinct_on?: Maybe<Array<Chain_Link_Proof_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chain_Link_Proof_Order_By>>;
  where?: Maybe<Chain_Link_Proof_Bool_Exp>;
};


export type Subscription_RootDtag_Transfer_RequestsArgs = {
  distinct_on?: Maybe<Array<Dtag_Transfer_Requests_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dtag_Transfer_Requests_Order_By>>;
  where?: Maybe<Dtag_Transfer_Requests_Bool_Exp>;
};


export type Subscription_RootProfileArgs = {
  distinct_on?: Maybe<Array<Profile_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Order_By>>;
  where?: Maybe<Profile_Bool_Exp>;
};


export type Subscription_RootProfile_AggregateArgs = {
  distinct_on?: Maybe<Array<Profile_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Order_By>>;
  where?: Maybe<Profile_Bool_Exp>;
};


export type Subscription_RootProfile_By_PkArgs = {
  address: Scalars['String'];
};


export type Subscription_RootProfile_CountersArgs = {
  distinct_on?: Maybe<Array<Profile_Counters_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profile_Counters_Order_By>>;
  where?: Maybe<Profile_Counters_Bool_Exp>;
};


export type Subscription_RootProfiles_ParamsArgs = {
  distinct_on?: Maybe<Array<Profiles_Params_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Profiles_Params_Order_By>>;
  where?: Maybe<Profiles_Params_Bool_Exp>;
};


export type Subscription_RootUser_BlockArgs = {
  distinct_on?: Maybe<Array<User_Block_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Block_Order_By>>;
  where?: Maybe<User_Block_Bool_Exp>;
};


export type Subscription_RootUser_RelationshipArgs = {
  distinct_on?: Maybe<Array<User_Relationship_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Relationship_Order_By>>;
  where?: Maybe<User_Relationship_Bool_Exp>;
};


export type Subscription_RootUser_Relationship_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Relationship_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<User_Relationship_Order_By>>;
  where?: Maybe<User_Relationship_Bool_Exp>;
};


/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamp']>;
  _gt?: Maybe<Scalars['timestamp']>;
  _gte?: Maybe<Scalars['timestamp']>;
  _in?: Maybe<Array<Scalars['timestamp']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamp']>;
  _lte?: Maybe<Scalars['timestamp']>;
  _neq?: Maybe<Scalars['timestamp']>;
  _nin?: Maybe<Array<Scalars['timestamp']>>;
};

/** columns and relationships of "user_block" */
export type User_Block = {
  __typename?: 'user_block';
  /** An object relationship */
  blocked?: Maybe<Profile>;
  blocked_address?: Maybe<Scalars['String']>;
  /** An object relationship */
  blocker?: Maybe<Profile>;
  blocker_address?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  subspace_id: Scalars['bigint'];
};

/** Boolean expression to filter rows from the table "user_block". All fields are combined with a logical 'AND'. */
export type User_Block_Bool_Exp = {
  _and?: Maybe<Array<User_Block_Bool_Exp>>;
  _not?: Maybe<User_Block_Bool_Exp>;
  _or?: Maybe<Array<User_Block_Bool_Exp>>;
  blocked?: Maybe<Profile_Bool_Exp>;
  blocked_address?: Maybe<String_Comparison_Exp>;
  blocker?: Maybe<Profile_Bool_Exp>;
  blocker_address?: Maybe<String_Comparison_Exp>;
  reason?: Maybe<String_Comparison_Exp>;
  subspace_id?: Maybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "user_block". */
export type User_Block_Order_By = {
  blocked?: Maybe<Profile_Order_By>;
  blocked_address?: Maybe<Order_By>;
  blocker?: Maybe<Profile_Order_By>;
  blocker_address?: Maybe<Order_By>;
  reason?: Maybe<Order_By>;
  subspace_id?: Maybe<Order_By>;
};

/** select columns of table "user_block" */
export enum User_Block_Select_Column {
  /** column name */
  BlockedAddress = 'blocked_address',
  /** column name */
  BlockerAddress = 'blocker_address',
  /** column name */
  Reason = 'reason',
  /** column name */
  SubspaceId = 'subspace_id'
}

/** columns and relationships of "user_relationship" */
export type User_Relationship = {
  __typename?: 'user_relationship';
  /** An object relationship */
  counterparty?: Maybe<Profile>;
  counterparty_address: Scalars['String'];
  /** An object relationship */
  creator?: Maybe<Profile>;
  creator_address: Scalars['String'];
  subspace_id: Scalars['bigint'];
};

/** aggregated selection of "user_relationship" */
export type User_Relationship_Aggregate = {
  __typename?: 'user_relationship_aggregate';
  aggregate?: Maybe<User_Relationship_Aggregate_Fields>;
  nodes: Array<User_Relationship>;
};

/** aggregate fields of "user_relationship" */
export type User_Relationship_Aggregate_Fields = {
  __typename?: 'user_relationship_aggregate_fields';
  avg?: Maybe<User_Relationship_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<User_Relationship_Max_Fields>;
  min?: Maybe<User_Relationship_Min_Fields>;
  stddev?: Maybe<User_Relationship_Stddev_Fields>;
  stddev_pop?: Maybe<User_Relationship_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Relationship_Stddev_Samp_Fields>;
  sum?: Maybe<User_Relationship_Sum_Fields>;
  var_pop?: Maybe<User_Relationship_Var_Pop_Fields>;
  var_samp?: Maybe<User_Relationship_Var_Samp_Fields>;
  variance?: Maybe<User_Relationship_Variance_Fields>;
};


/** aggregate fields of "user_relationship" */
export type User_Relationship_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Relationship_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type User_Relationship_Avg_Fields = {
  __typename?: 'user_relationship_avg_fields';
  subspace_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user_relationship". All fields are combined with a logical 'AND'. */
export type User_Relationship_Bool_Exp = {
  _and?: Maybe<Array<User_Relationship_Bool_Exp>>;
  _not?: Maybe<User_Relationship_Bool_Exp>;
  _or?: Maybe<Array<User_Relationship_Bool_Exp>>;
  counterparty?: Maybe<Profile_Bool_Exp>;
  counterparty_address?: Maybe<String_Comparison_Exp>;
  creator?: Maybe<Profile_Bool_Exp>;
  creator_address?: Maybe<String_Comparison_Exp>;
  subspace_id?: Maybe<Bigint_Comparison_Exp>;
};

/** aggregate max on columns */
export type User_Relationship_Max_Fields = {
  __typename?: 'user_relationship_max_fields';
  counterparty_address?: Maybe<Scalars['String']>;
  creator_address?: Maybe<Scalars['String']>;
  subspace_id?: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type User_Relationship_Min_Fields = {
  __typename?: 'user_relationship_min_fields';
  counterparty_address?: Maybe<Scalars['String']>;
  creator_address?: Maybe<Scalars['String']>;
  subspace_id?: Maybe<Scalars['bigint']>;
};

/** Ordering options when selecting data from "user_relationship". */
export type User_Relationship_Order_By = {
  counterparty?: Maybe<Profile_Order_By>;
  counterparty_address?: Maybe<Order_By>;
  creator?: Maybe<Profile_Order_By>;
  creator_address?: Maybe<Order_By>;
  subspace_id?: Maybe<Order_By>;
};

/** select columns of table "user_relationship" */
export enum User_Relationship_Select_Column {
  /** column name */
  CounterpartyAddress = 'counterparty_address',
  /** column name */
  CreatorAddress = 'creator_address',
  /** column name */
  SubspaceId = 'subspace_id'
}

/** aggregate stddev on columns */
export type User_Relationship_Stddev_Fields = {
  __typename?: 'user_relationship_stddev_fields';
  subspace_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type User_Relationship_Stddev_Pop_Fields = {
  __typename?: 'user_relationship_stddev_pop_fields';
  subspace_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type User_Relationship_Stddev_Samp_Fields = {
  __typename?: 'user_relationship_stddev_samp_fields';
  subspace_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type User_Relationship_Sum_Fields = {
  __typename?: 'user_relationship_sum_fields';
  subspace_id?: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type User_Relationship_Var_Pop_Fields = {
  __typename?: 'user_relationship_var_pop_fields';
  subspace_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type User_Relationship_Var_Samp_Fields = {
  __typename?: 'user_relationship_var_samp_fields';
  subspace_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type User_Relationship_Variance_Fields = {
  __typename?: 'user_relationship_variance_fields';
  subspace_id?: Maybe<Scalars['Float']>;
};

export type DesmosProfileQueryVariables = Exact<{
  address?: Maybe<Scalars['String']>;
}>;


export type DesmosProfileQuery = { profile: Array<(
    { __typename?: 'profile' }
    & Pick<Profile, 'address' | 'bio' | 'dtag' | 'nickname'>
    & { profilePic: Profile['profile_pic'], coverPic: Profile['cover_pic'], creationTime: Profile['creation_time'] }
    & { chainLinks: Array<(
      { __typename?: 'chain_link' }
      & { creationTime: Chain_Link['creation_time'], externalAddress: Chain_Link['external_address'] }
      & { chainConfig: (
        { __typename?: 'chain_link_chain_config' }
        & Pick<Chain_Link_Chain_Config, 'name'>
      ) }
    )>, applicationLinks: Array<(
      { __typename?: 'application_link' }
      & Pick<Application_Link, 'username' | 'application'>
      & { creationTime: Application_Link['creation_time'] }
    )> }
  )> };

export type DesmosProfileLinkQueryVariables = Exact<{
  address?: Maybe<Scalars['String']>;
}>;


export type DesmosProfileLinkQuery = { profile: Array<(
    { __typename?: 'profile' }
    & Pick<Profile, 'address' | 'bio' | 'dtag' | 'nickname'>
    & { profilePic: Profile['profile_pic'], coverPic: Profile['cover_pic'], creationTime: Profile['creation_time'] }
    & { chainLinks: Array<(
      { __typename?: 'chain_link' }
      & { creationTime: Chain_Link['creation_time'], externalAddress: Chain_Link['external_address'] }
      & { chainConfig: (
        { __typename?: 'chain_link_chain_config' }
        & Pick<Chain_Link_Chain_Config, 'name'>
      ) }
    )>, applicationLinks: Array<(
      { __typename?: 'application_link' }
      & Pick<Application_Link, 'username' | 'application'>
      & { creationTime: Application_Link['creation_time'] }
    )> }
  )> };

export type DesmosProfileDtagQueryVariables = Exact<{
  dtag?: Maybe<Scalars['String']>;
}>;


export type DesmosProfileDtagQuery = { profile: Array<(
    { __typename?: 'profile' }
    & Pick<Profile, 'address' | 'bio' | 'dtag' | 'nickname'>
    & { profilePic: Profile['profile_pic'], coverPic: Profile['cover_pic'], creationTime: Profile['creation_time'] }
    & { chainLinks: Array<(
      { __typename?: 'chain_link' }
      & { creationTime: Chain_Link['creation_time'], externalAddress: Chain_Link['external_address'] }
      & { chainConfig: (
        { __typename?: 'chain_link_chain_config' }
        & Pick<Chain_Link_Chain_Config, 'name'>
      ) }
    )>, applicationLinks: Array<(
      { __typename?: 'application_link' }
      & Pick<Application_Link, 'username' | 'application'>
      & { creationTime: Application_Link['creation_time'] }
    )> }
  )> };
