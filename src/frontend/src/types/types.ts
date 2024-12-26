export interface Proposal {
  id: string;
  date: string;
  assetId: string;
  seller: string;
  buyer: string;
  model: string;
  size: string;
  accepted: boolean;
  assetHash: string;
}

// src/types/Asset.ts

export interface Asset {
  id: string;
  model: string;
  size: string;
  accumulator: string;
}

export interface Org {
  MSP: string;
  assets: Asset[];
  proposals: Proposal[];
  history: History[];
}

// src/types/History.ts

export interface History {
  id: string;
  type: string;
  record: any; // You can replace `any` with a more specific type if known
}

// src/types/AddRecord.ts

export interface AddRecord {
  assetId: string;
  org: string;
  date: string;
}

// src/types/TransactionRecord.ts

export interface TransactionRecord {
  fromOrg: string;
  toOrg: string;
  model: string;
  size: string;
  date: string;
  verified: boolean;
}

// src/types/DeleteRecord.ts

export interface DeleteRecord {
  id: string;
  org: string;
  date: string;
}
