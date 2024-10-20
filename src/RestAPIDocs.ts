import { OpenAPIApp } from "./core/OpenAPIApp";
import { DocumentFactory, ProviderOption, Providers } from "./types/types";
import express, { Response } from "express";

export class RestAPIDocs {
  private app: OpenAPIApp;
  constructor(public factory: DocumentFactory) {
    this.app = new OpenAPIApp({
      document: factory.document,
      specUrl: factory.document,
    });
  }

  getSpec() {
    return this.factory.buildDocument();
  }
  render(options: ProviderOption) {
    return this.app?.render(options);
  }
  listen(port: number = 8080) {
    const app = express();
    app.get("/docs/json", async (req, res, next) => {
      const doc = this.getSpec();
      if (typeof doc === "string") res.redirect(doc);
      else res.send(doc);
    });
    app.get("/docs", (req, res: Response, next) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res
        .status(200)
        .send(this.app?.render({ provider: req.query.provider as Providers }));
    });
    app.listen(port, () => {
      console.log(
        "See your OpenAPI Specification with beautiful rendering provider at port",
        port
      );
    });
  }
}
