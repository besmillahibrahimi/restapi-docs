import { OpenAPIV3_1 } from "openapi-types";
import RapidocRenderer from "../render/RapidocRenderer";
import RedocRenderer from "../render/RedocRenderer";
import { OpenAPIRenderer, RendererContext } from "../render/render";
import ScalarRenderer from "../render/ScalarRenderer";
import StoplightioRenderer from "../render/StoplightioRenderer";
import SwaggerRenderer from "../render/SwaggerRenderer";
import { AppOption, Providers } from "../types/types";

export const DefualtDocData: AppOption = {
  doc: {
    openapi: "3.1.0",
    info: {
      title: "App Docs",
      version: "1.0.0",
    },
  },
};

export interface OpenAPIContext {
  document: OpenAPIV3_1.Document;
  specUrl: string;
  providerOptions?: any;
}

export interface DocumentFactory {
  buildDocument(): Promise<OpenAPIV3_1.Document>;
}
export class OpenAPIApp {
  private context: OpenAPIContext;
  private rendererContext: RendererContext;

  constructor(context: OpenAPIContext, renderer?: OpenAPIRenderer) {
    this.context = context;
    this.rendererContext = new RendererContext(renderer);
  }

  getDocument(): OpenAPIV3_1.Document {
    return this.context.document;
  }

  render(provider?: Providers): string {
    if (provider) {
      this.rendererContext.setRenderer(
        provider === "scalar"
          ? new ScalarRenderer()
          : provider === "rapidoc"
          ? new RapidocRenderer()
          : provider === "redoc"
          ? new RedocRenderer()
          : provider === "stoplightio"
          ? new StoplightioRenderer()
          : provider === "swagger"
          ? new SwaggerRenderer()
          : new ScalarRenderer()
      );
    }
    return this.rendererContext.render(this.context);
  }

  setRenderer(renderer: OpenAPIRenderer) {
    this.rendererContext.setRenderer(renderer);
  }
}
