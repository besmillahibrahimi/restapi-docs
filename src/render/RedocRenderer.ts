import { objectToAttr } from "../openapi.util";
import { OpenAPIContext, OpenAPIRenderer } from "../types/types";

export default class RedocRenderer extends OpenAPIRenderer {
  render(ctx: OpenAPIContext): string {
    return `
  <!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${ctx.document?.info?.description}" />
    <title>${ctx.document?.info?.title}</title>
    <style>
      body {
        margin: 0;
      }
    </style>
    <style>
      
    </style>
  </head>
  <body>
    <redoc spec-url="${ctx.specUrl}" ${objectToAttr(
      ctx.providerOptions
    )}></redoc>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>
  </body>
</html>
  `;
  }
}
