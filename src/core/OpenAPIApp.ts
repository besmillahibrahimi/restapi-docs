import { OpenAPIV3_1 } from "openapi-types";
import RapidocRenderer from "../render/RapidocRenderer";
import RedocRenderer from "../render/RedocRenderer";
import { RendererContext } from "../render/render";
import ScalarRenderer from "../render/ScalarRenderer";
import StoplightioRenderer from "../render/StoplightioRenderer";
import SwaggerRenderer from "../render/SwaggerRenderer";
import {
  OpenAPIContext,
  OpenAPIRenderer,
  ProviderOption,
  Providers,
} from "../types/types";

export class OpenAPIApp {
  private context: OpenAPIContext;
  private rendererContext: RendererContext;

  constructor(context: OpenAPIContext, renderer?: OpenAPIRenderer) {
    this.context = context;
    this.rendererContext = new RendererContext(renderer);
  }

  getDocument(): OpenAPIV3_1.Document | string | undefined {
    return this.context.document;
  }

  render(options?: ProviderOption): string {
    let { provider, ...providerOptions } = options ?? {};
    if (provider) {
      this.rendererContext.setRenderer(
        provider === "rapidoc"
          ? new RapidocRenderer()
          : provider === "redoc"
          ? new RedocRenderer()
          : provider === "stoplightio"
          ? new StoplightioRenderer()
          : provider === "swagger"
          ? new SwaggerRenderer()
          : new ScalarRenderer() // scalar is the defualt renderer
      );
    }
    if (providerOptions) {
      this.context.providerOptions = providerOptions;
    }
    return this.rendererContext.render(this.context);
  }

  setRenderer(renderer: OpenAPIRenderer) {
    this.rendererContext.setRenderer(renderer);
  }
}
