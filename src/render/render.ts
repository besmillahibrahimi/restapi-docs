import { OpenAPIContext } from "../core/OpenAPIApp";
import ScalarRenderer from "./ScalarRenderer";

export interface Renderer {
  render(context: OpenAPIContext): string;
}

export abstract class OpenAPIRenderer implements Renderer {
  abstract render(context: OpenAPIContext): string;
}

export class RendererContext {
  renderer: Renderer;

  constructor(renderer?: Renderer) {
    this.renderer = renderer ?? new ScalarRenderer();
  }

  setRenderer(renderer: OpenAPIRenderer) {
    this.renderer = renderer;
  }

  render(ctx: OpenAPIContext) {
    return this.renderer.render(ctx);
  }
}
