#!/usr/bin/env node

import { readFileSync } from "fs";
import { OpenAPIV3_1 } from "openapi-types";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import OpenAPISpecFactory from "../factories/OpenAPISpecFactory";
import ParseFactory from "../factories/ParseFactory";
import { RestAPIDocs } from "../RestAPIDocs";
import { DocumentFactory } from "../types/types";
import { parse as yamlParse } from "yaml";

const startApp = (factory: DocumentFactory, arg: any) => {
  const { renderer, r, port, path, ...providerOptions } = arg;

  const app = new RestAPIDocs(factory, path, renderer);
  app.listen(port);
};

function handleParse(arg: any) {
  const {
    appId,
    masterKey,
    serverUrl,
    title,
    summary,
    desc: description,
    ...other
  } = arg;
  startApp(
    new ParseFactory(
      { appId, masterKey, serverUrl },
      { info: { title, summary, description, version: "3.1.0" } }
    ),
    other
  );
}

function handleOpenAPI(args: any) {
  const {
    specUrl,
    specFile,
    title,
    summary,
    desc: description,
    ...other
  } = args;

  let spec: string | OpenAPIV3_1.Document;
  if (specUrl) spec = specUrl;
  else if (specFile) {
    const extension = specFile.split(".").pop()?.toLowerCase();
    // First, try to determine by file extension (optional step)
    if (extension === "json") {
      spec = JSON.parse(readFileSync(specFile, "utf-8"));
    } else if (extension === "yaml" || extension === "yml") {
      spec = yamlParse(readFileSync(specFile, "utf-8"));
      console.log(JSON.stringify(spec, null, 2));
    } else throw new Error("The specification file type is not supported.");
  } else throw new Error("No specification source provided.");
  startApp(
    new OpenAPISpecFactory(spec, {
      info: { title, summary, description, version: "3.1.0" },
    }),
    other
  );
}

yargs(hideBin(process.argv))
  .command(
    "parse-server",
    "Parse-Server schemas",
    (yargs) => {
      return yargs
        .option("appId", {
          alias: "a",
          type: "string",
          describe: "The Parse-Server application id.",
          requiresArg: true,
          demandOption: true,
        })
        .option("masterKey", {
          alias: "m",
          type: "string",
          describe: "Master key for the parse server.",
          requiresArg: true,
          demandOption: true,
        })
        .option("serverUrl", {
          alias: "u",
          type: "string",
          describe: "The url at which parse server serves",
          requiresArg: true,
          demandOption: true,
        })
        .help();
    },
    handleParse
  )
  .command(
    "openapi",
    "Use with a predefined OpenAPI Specification",
    (yargs) => {
      return yargs
        .option("specUrl", {
          type: "string",
          describe: "URL to OpenAPI Specification json.",
        })
        .option("specFile", {
          type: "string",
          describe:
            "Path to an OpenAPI Specification file. Notice that only JSON, and YAML fiel supported",
        })
        .help();
    },
    handleOpenAPI
  )
  .option("title", {
    type: "string",
    describe: "The title of OpenAPI Specification docs.",
  })
  .option("desc", {
    type: "string",
    describe: "The description for OpenAPI docs.",
  })
  .option("summary", {
    type: "string",
    describe: "The summary for OpenAPI docs.",
  })

  .option("port", {
    alias: "p",
    type: "number",
    default: 8080,
    describe: "The port at which the server will listen",
  })
  .option("path", {
    type: "string",
    default: "/_docs",
    describe: "The path to mounth docs at. the default is /_docs",
  })
  .option("renderer", {
    alias: "r",
    type: "string",
    describe: "Provider to render the OpenAPI docs",
    default: "scalar",
    choices: ["swagger", "redoc", "stoplightio", "scalar", "rapidoc"],
  })
  .help().argv;
