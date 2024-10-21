import { OpenAPIV3_1 } from "openapi-types";
import { BasicDocInfo, DocumentFactory } from "../types/types";

export default class OpenAPISpecFactory extends DocumentFactory {
  constructor(
    public spec: OpenAPIV3_1.Document | string,
    basicInfo: BasicDocInfo
  ) {
    super(basicInfo, spec);
  }

  async buildDocument(): Promise<OpenAPIV3_1.Document | undefined> {
    return typeof this.spec !== "string" ? this.spec : undefined;
  }
}
