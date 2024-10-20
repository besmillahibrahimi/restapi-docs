import { OpenAPIV3_1 } from "openapi-types";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
import { DocumentFactory } from "../types/types";
import ParseFactory from "../factories/ParseFactory";
import OpenAPISpecFactory from "../factories/OpenAPISpecFactory";
import { RestAPIDocs } from "../RestAPIDocs";

const startApp = (factory: DocumentFactory, arg: any) => {
  const {
    renderer,
    r,
    port,

    ...providerOptions
  } = arg;

  const app = new RestAPIDocs(factory);
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
      { title, summary, description, version: "3.1.0" }
    ),
    other
  );
}

function handleOpenAPI(args: any) {
  const { specUrl, title, summary, desc: description, ...other } = args;
  startApp(
    new OpenAPISpecFactory(specUrl, {
      title,
      summary,
      description,
      version: "3.1.0",
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
          type: "string",
          describe: "The Parse-Server application id.",
          requiresArg: true,
          demandOption: true,
        })
        .option("masterKey", {
          type: "string",
          describe: "Master key for the parse server.",
          requiresArg: true,
          demandOption: true,
        })
        .option("serverUrl", {
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
  .option("desc", {
    type: "string",
    describe: "The description for OpenAPI docs.",
  })
  .option("port", {
    type: "number",
    default: 8080,
    describe: "The port at which the server will listen",
  })
  .option("renderer", {
    alias: "r",
    type: "string",
    describe: "Provider to render the OpenAPI docs",
    default: "scalar",
    choices: ["swagger", "redoc", "stoplightio", "scalar", "rapidoc"],
  })
  .help().argv;
