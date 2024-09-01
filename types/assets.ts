export class Asset {

    public id!: string;
  
    public model!: string;

    public size!: number;

    public accumulator: string;

    constructor(id: string, model: string, size: number, accumulator: string) {
        this.id = id;
        this.model = model;
        this.size = size;
        this.accumulator = accumulator;
    }
}

export class Proposal {
    public id: string;
    public date: string;
    public assetId: string;
    public seller: string;
    public buyer: string;
    public model: string;
    public size: string; 
    public accepted: boolean;
    public assetHash: string;
    public response?: boolean;

    constructor(id: string, date: string, assetId: string, seller: string, buyer: string, model: string, size: string, accepted: boolean, assetHash: string) {
        this.id = id;
        this.date = date;
        this.assetId = assetId;
        this.seller = seller;
        this.buyer = buyer;
        this.model = model;
        this.size = size;
        this.accepted = accepted;
        this.assetHash = assetHash;
    }
}

export class History {

  public id: string;

  public record: Record;

  constructor(id: string, record: Record) {
    this.id = id;
    this.record = record;
}
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
  verified: boolean;
}

interface DeleteRecord {
  type: "delete";
  id: string;
  org: string;
  date: string;
}

// Union type for the record
type Record = TransactionRecord | AddRecord | DeleteRecord;
