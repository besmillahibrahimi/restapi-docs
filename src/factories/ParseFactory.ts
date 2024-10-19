import { OpenAPIV3_1 } from "openapi-types";
import { DocumentFactory } from "../core/OpenAPIApp";
import { ParseOption, ParseSchema, QueriesResult } from "../types/parse.types";
import fetch from "node-fetch";
import ParseOpenApi from "./parse-openapi";

export default class ParseFactory implements DocumentFactory {
  constructor(public option: ParseOption) {}
  async buildDocument(): Promise<OpenAPIV3_1.Document> {
    const res = (await fetch(`${this.option.serverUrl}/schemas`, {
      headers: {
        "X-Parse-Application-Id": this.option.appId,
        "X-Parse-Master-Key": this.option.masterKey,
      },
    }).then((r) => r.json())) as QueriesResult<ParseSchema>;

    const parseApi = new ParseOpenApi();
    return parseApi.createOpenApiSpec(res.results, this.option);
  }
}
