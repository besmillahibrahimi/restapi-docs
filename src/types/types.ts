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

export const DefualtDocData: AppOption = {
  doc: {
    openapi: "3.1.0",
    info: {
      title: "App Docs",
      version: "1.0.0",
    },
  },
};

export interface OpenAPIContext {
  document?: OpenAPIV3_1.Document;
  specUrl?: string;
  providerOptions?: any;
}

export interface BaseDocument {
  buildDocument(): Promise<OpenAPIV3_1.Document | undefined>;
}

export abstract class DocumentFactory implements BaseDocument {
  document?: OpenAPIV3_1.Document | string; // this is either the [OpenAPI.Document] object or a url a document json object
  constructor(info?: OpenAPIV3_1.InfoObject) {
    this.init();
  }
  protected async init() {
    this.document = await this.buildDocument();
  }
  abstract buildDocument(): Promise<OpenAPIV3_1.Document | undefined>;
}

export interface Renderer {
  render(context: OpenAPIContext): string;
}

export abstract class OpenAPIRenderer implements Renderer {
  abstract render(context: OpenAPIContext): string;
}

export type ProviderOption = {
  provider?: Providers;
  [key: string]: any;
};
