import { OpenAPIV3_1 } from "openapi-types";
import { selectRenderer } from "../openapi.util";
import { RendererContext } from "../render/render";
import {
  DocumentFactory,
  OpenAPIContext,
  OpenAPIRenderer,
  ProviderOption,
  Renderer,
} from "../types/types";

export class OpenAPIApp {
  private readonly context: OpenAPIContext;
  private readonly rendererContext: RendererContext;
  private factory: DocumentFactory;

  constructor(factory: DocumentFactory, renderer?: Renderer) {
    this.context = {
      basicInfo: factory.basicInfo,
      document: factory.document,
    };
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
