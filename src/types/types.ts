import { OpenAPIV3_1 } from "openapi-types";

export type Providers =
  | "swagger"
  | "scalar"
  | "redoc"
  | "rapidoc"
  | "stoplightio";

export type AppOption = {
  doc?: {
    openapi?: string;
    info?: OpenAPIV3_1.InfoObject;
    externalDocs?: OpenAPIV3_1.ExternalDocumentationObject;
    servers?: OpenAPIV3_1.ServerObject[];
  };
};
