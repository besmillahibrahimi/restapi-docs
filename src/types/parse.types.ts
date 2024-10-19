import { AppOption } from "./types";

export type ParseOption = AppOption & {
  appId: string;
  masterKey: string;
  serverUrl: string;
};

export type IParseOpenApi = {
  path: string;
};

export type Fields =
  | "Array"
  | "Boolean"
  | "Date"
  | "File"
  | "GeoPoint"
  | "Number"
  | "Object"
  | "Pointer"
  | "Polygon"
  | "Relation"
  | "String";

// Interface for Indexes
type IIndexes = {
  [key: string]: {
    [field: string]: number;
  };
};
export type ParseField = {
  type: string;
  targetClass?: string;
  required?: boolean;
  defaultValue?: any;
};

type IField = {
  [key: string]: ParseField;
};
// Interface for class level permissions
type IClassLevelPermissions = {
  find: Record<string, boolean>;
  count: Record<string, boolean>;
  get: Record<string, boolean>;
  create: Record<string, boolean>;
  update: Record<string, boolean>;
  delete: Record<string, boolean>;
  addField: Record<string, boolean>;
  protectedFields: Record<string, any[]>;
};

export type ParseSchema = {
  className: string;
  fields: IField;
  classLevelPermissions: IClassLevelPermissions;
  indexes: IIndexes;
};

export type QueriesResult<T> = {
  results: T[];
};
