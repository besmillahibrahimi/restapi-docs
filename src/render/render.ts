import { OpenAPIContext, OpenAPIRenderer, Renderer } from "../types/types";
import ScalarRenderer from "./ScalarRenderer";

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
