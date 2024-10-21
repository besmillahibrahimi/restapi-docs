import { OpenAPIV3_1 } from "openapi-types";
import RapidocRenderer from "../render/RapidocRenderer";
import RedocRenderer from "../render/RedocRenderer";
import { RendererContext } from "../render/render";
import ScalarRenderer from "../render/ScalarRenderer";
import StoplightioRenderer from "../render/StoplightioRenderer";
import SwaggerRenderer from "../render/SwaggerRenderer";
import {
  DocumentFactory,
  OpenAPIContext,
  OpenAPIRenderer,
  ProviderOption,
  Renderer,
} from "../types/types";
import { selectRenderer } from "../openapi.util";

export class OpenAPIApp {
  private readonly context: OpenAPIContext;
  private readonly rendererContext: RendererContext;
  private factory: DocumentFactory;

  constructor(factory: DocumentFactory, renderer?: Renderer) {
    this.context = { basicInfo: factory.basicInfo };
    this.rendererContext = new RendererContext(renderer);
    this.factory = factory;
    if (this.factory.specUrl) this.setSpecUrl(this.factory.specUrl);
  }

  setFactory(factory: DocumentFactory) {
    this.factory = factory;
  }

  setSpecUrl(specUrl: string) {
    this.context.specUrl = specUrl;
  }
  getSpecUrl(): string | undefined {
    return this.context.specUrl;
  }
  setProviderOptions(options: any) {
    this.context.providerOptions = options;
  }

  getDocument(): OpenAPIV3_1.Document | undefined {
    return this.factory.document;
  }

  render(options?: ProviderOption): string {
    let { provider, ...providerOptions } = options ?? {};
    if (provider) {
      this.setRenderer(selectRenderer(provider));
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
