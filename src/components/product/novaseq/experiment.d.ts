export interface Experiment {
  readonly [index: string]: string | number | Object;
  Id: string;
  Href: string;
  Number: number;
  ExperimentName: string;
  Status: string;
  ReagentBarcode: string;
  FlowcellBarcode: string;
  DateCreated: string;
  DateModified: string;
  UserOwnedBy: {
    Id: string;
    Name: string;
  };
  TotalSize: number;
  PlatformName: string;
  Workflow: string;
  Instrument: {
    InstrumentId: number;
    Name: string;
  };
  InstrumentName: string;
  InstrumentType: string;
  NumCyclesRead1: number;
  HrefBaseSpaceUI: string;
  LaneAndQcStatus: string;
  DateInstrumentStarted: string;
  DateInstrumentCompleted: string;
}

export type UserOwnedBy = {
  Id: string;
  Name: string;
};

export type Instrument = {
  InstrumentId: number;
  Name: string;
};
