import express, { Response } from "express";
import schemas from "../test/schemas.js";

import ParseOpenApi from "./factories/parse-openapi.js";
import { createHTML } from "./openapi.util";
import { OpenAPIApp } from "./core/OpenAPIApp.js";
import ParseFactory from "./factories/ParseFactory.js";
import { Providers } from "./types/types.js";

const app = express();

const openApiApp = new OpenAPIApp({
  document: new ParseFactory().buildDocument(),
  specUrl: "http://localhost:5000/docs-json",
});

app.use("docs-json", (req, res, next) => {
  res.send(openApiApp.getDocument());
});
app.use("docs-new", (req, res: Response, next) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(openApiApp.render());
});

const api = new ParseOpenApi();
const obj = schemas[0];

app.get("/docs/json", async (_, res) => {
  const schemas = await fetch("https://parse-server.lm4c.com/parse/schemas", {
    headers: {
      "X-Parse-Application-Id": "node-parse-server",
      "X-Parse-Master-Key": "node-parse-server",
    },
  }).then((r) => r.json());
  const json = api.createOpenApiSpec(obj as any);
  res.json(json);
});
app.get("/docs", (req, res) => {
  const provider = (req.query.provider as Providers) ?? "scalar";

  res.send(createHTML(provider));
});
app.listen(5000, () => console.log(`openapi docs is running at port 5000`));
