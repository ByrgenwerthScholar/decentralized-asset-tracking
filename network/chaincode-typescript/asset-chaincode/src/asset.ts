/*
  SPDX-License-Identifier: Apache-2.0
*/

import {Object, Property} from 'fabric-contract-api';

@Object()
export class Proposal {
    id: string;
    date: string;
    assetId: string;
    seller: string;
    buyer: string;
    model: string;
    size: string; 
    accepted: boolean;
}

@Object()
export class Asset {
    @Property()
    public id: string;

    @Property()
    public model: string;

    @Property()
    public size: number;

    @Property()
    public accumulator: string;

}

@Object()
export class History {

  @Property()
  public id: string;

  @Property()
  public record: Record;
}

interface AddRecord {
  type: "add";
  assetId: string;
  org: string;
  date: string;
}

interface TransactionRecord {
  type: "transaction";
  fromOrg: string; 
  toOrg: string;
  model: string;
  size: number;
  date: string;
}

interface DeleteRecord {
  type: "delete";
  id: string;
  org: string;
  date: string;
}

// Union type for the record
type Record = TransactionRecord | AddRecord | DeleteRecord;
