import { OpenAPIV3_1 } from "openapi-types";
import { ParseOption, ParseSchema, QueriesResult } from "../types/parse.types";
import ParseOpenApi from "./parse-openapi";
import { BasicDocInfo, DocumentFactory } from "../types/types";

export default class ParseFactory extends DocumentFactory {
  constructor(public option: ParseOption, basicInfo?: BasicDocInfo) {
    super(basicInfo);
    this.init();
  }
  async buildDocument(): Promise<OpenAPIV3_1.Document> {
    const res = (await fetch(`${this.option.serverUrl}/schemas`, {
      headers: {
        "X-Parse-Application-Id": this.option.appId,
        "X-Parse-Master-Key": this.option.masterKey,
      },
    }).then((r) => r.json())) as QueriesResult<ParseSchema>;

    const parseApi = new ParseOpenApi();
    return parseApi.createOpenApiSpec(res.results, this.basicInfo);
  }
}
