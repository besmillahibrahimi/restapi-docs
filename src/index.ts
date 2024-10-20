import express, { Response } from "express";
import { OpenAPIApp } from "./core/OpenAPIApp";
import ParseFactory from "./factories/ParseFactory";
import { Providers } from "./types/types";

const app = express();

let openApiApp: OpenAPIApp;

app.get("/docs/json", (req, res, next) => {
  res.send(openApiApp?.getDocument());
});
app.get("/docs", (req, res: Response, next) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res
    .status(200)
    .send(openApiApp?.render({ provider: req.query.provider as Providers }));
});

app.listen(5000, async () => {
  openApiApp = new OpenAPIApp({
    document: await new ParseFactory({
      appId: "parse-server.lm4c.com/parse-server",
      masterKey: "eqLa6fJ0RiRsxFGub15COutTacoLc74/2X6PueOiHsk",
      serverUrl: "https://parse-server.lm4c.com/parse",
    }).buildDocument(),
    specUrl: "http://localhost:5000/docs-json",
  });
  console.log(`openapi docs is running at port 5000`);
});
