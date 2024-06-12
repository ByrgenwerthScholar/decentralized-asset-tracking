export class Asset {

    public ID!: string;
  
    public CurrentOwner!: string;

    public Model!: string;

    public Batch?: Batch;

    constructor(id: string, currentOwner: string, model: string, batch?: Batch) {
        this.ID = id;
        this.CurrentOwner = currentOwner;
        this.Model = model;
        this.Batch = batch;
    }
}

export class Batch {

    public ID!: string;

    public Size!: number;

    public SubBatches!: SubBatch[] | null;

    constructor(id: string, size: number, subBatches: SubBatch[] | null) { 
        this.ID = id;
        this.Size = size;
        this.SubBatches = subBatches;
    }
}

export class SubBatch {

  public ID!: string;

  public Size!: number;

  public History!: Record[];

  constructor(id: string, size: number, history: Record[]) {
    this.ID = id;
    this.Size = size;
    this.History = history;
  }
}

interface CreateRecord {
  type: "create";
  id: string;
  batchid: string;
  org: string;
  date: Date;

}

interface TransactionRecord {
  type: "transaction";
  id: string;
  fromOrg: string; 
  toOrg: string;
  size: number;
  date: Date;
}

interface SplitRecord {
  type: "split";
  id: string;
  org: string;
  fromBatch: string;
  batch1amount: number;
  batch2amount: number;
  date: Date;
}

interface CombineRecord {
  type: "combine";
  id: string;
  org: string;
  fromBatch1: string;
  fromBatch2: string;
  batch1History: Record[];
  batch2History: Record[];
  date: Date;
}

// Union type for the record
type RecordType = TransactionRecord | SplitRecord | CombineRecord | CreateRecord;

class Record {
  public data!: RecordType;
  constructor(data: RecordType) {
    this.data = data;
  }
}