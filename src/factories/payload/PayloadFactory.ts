import { OpenAPIV3_1 } from "openapi-types";
import { DocumentFactory } from "../../types/types";

export class PayloadFactory extends DocumentFactory {
  buildDocument(): Promise<OpenAPIV3_1.Document | undefined> {
    throw new Error("Method not implemented.");
  }
}
