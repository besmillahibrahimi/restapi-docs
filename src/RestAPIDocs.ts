import { OpenAPIApp } from "./core/OpenAPIApp";
import { selectRenderer } from "./openapi.util";
import {
  DocumentFactory,
  ProviderOption,
  Providers,
  Renderer,
} from "./types/types";
import express, { Response } from "express";

export class RestAPIDocs {
  private readonly app: OpenAPIApp;

  constructor(
    factory: DocumentFactory,
    public path: string = "/_docs",
    renderer?: Renderer | Providers
  ) {
    this.app = new OpenAPIApp(
      factory,
      typeof renderer === "string" ? selectRenderer(renderer) : renderer
    );
  }

  getSpec() {
    return this.app.getDocument();
  }
  getSpecUrl() {
    return this.app.getSpecUrl();
  }
  render(options: ProviderOption) {
    return this.app?.render(options);
  }
  listen(port: number = 8080) {
    const app = express();

    this.app.setSpecUrl(
      this.app.getSpecUrl() ?? `http://localhost:${port}${this.path}/json`
    );

    app.get(`${this.path}/json`, async (req, res, next) => {
      const doc = this.getSpec();
      if (!doc) res.redirect(this.app.getSpecUrl()!);
      else res.status(200).json(doc);
    });
    app.get(this.path, (req, res: Response, next) => {
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
