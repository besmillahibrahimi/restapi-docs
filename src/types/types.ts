import { OpenAPIV3_1 } from "openapi-types";

export type Providers =
  | "swagger"
  | "scalar"
  | "redoc"
  | "rapidoc"
  | "stoplightio";

export type BasicDocInfo = {
  openapi?: string;
  info?: OpenAPIV3_1.InfoObject;
  externalDocs?: OpenAPIV3_1.ExternalDocumentationObject;
  servers?: OpenAPIV3_1.ServerObject[];
};

export const DefualtDocData: BasicDocInfo = {
  openapi: "3.1.0",
  info: {
    title: "App Docs",
    version: "1.0.0",
  },
};

export interface OpenAPIContext {
  basicInfo?: BasicDocInfo;
  document?: OpenAPIV3_1.Document;
  specUrl?: string;
  providerOptions?: any;
}

export interface BaseDocument {
  /**
   * This method builds {@link OpenAPIV3_1.Document}. It must be implemented in any {@link DocumentFactory} subclasses.
   * @returns {@link OpenAPIV3_1.Document}
   */
  buildDocument(): Promise<OpenAPIV3_1.Document | undefined>;
}

export abstract class DocumentFactory implements BaseDocument {
  /**
   * The {@link OpenAPIV3_1.Document} object
   */
  document?: OpenAPIV3_1.Document;
  specUrl?: string;
  constructor(
    public basicInfo?: BasicDocInfo,
    spec?: OpenAPIV3_1.Document | string
  ) {
    if (typeof spec === "string") this.specUrl = spec;
    else this.document = spec;
    // this.init();
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
