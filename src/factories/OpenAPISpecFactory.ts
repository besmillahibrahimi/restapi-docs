import { OpenAPIV3_1 } from "openapi-types";
import { DocumentFactory } from "../types/types";

export default class OpenAPISpecFactory extends DocumentFactory {
  constructor(specUrl: string, info: OpenAPIV3_1.InfoObject) {
    super(info);
    this.document = specUrl;
  }

  async buildDocument(): Promise<OpenAPIV3_1.Document | undefined> {
    return undefined;
  }
}
