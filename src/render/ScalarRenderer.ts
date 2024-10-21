import { OpenAPIContext, OpenAPIRenderer } from "../types/types";

export default class ScalarRenderer extends OpenAPIRenderer {
  render(ctx: OpenAPIContext): string {
    return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${ctx.basicInfo?.info?.description}" />
    <title>${ctx.basicInfo?.info?.title}</title>
    <style>
      body {
        margin: 0;
      }
    </style>
    <style>
      
    </style>
  </head>
  <body>
    <script
      id="api-reference"
      data-url="${ctx.specUrl}"
      
    >
    </script>
    
	<script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.25.9/dist/browser/standalone.min.js" crossorigin></script>
  </body>
</html>
  `;
  }
}
