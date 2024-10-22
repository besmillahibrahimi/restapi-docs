import { objectToAttr } from "../openapi.util";
import { OpenAPIContext, OpenAPIRenderer } from "../types/types";

export default class StoplightioRenderer extends OpenAPIRenderer {
  render(ctx: OpenAPIContext): string {
    return `
<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${
      ctx.basicInfo?.info?.description ?? ctx.document?.info?.description
        ? `<meta name="description" content="${
            ctx.basicInfo?.info?.description ?? ctx.document?.info?.description
          }" />`
        : ""
    }
    ${
      ctx.basicInfo?.info?.title ?? ctx.document?.info?.title
        ? `<title>${
            ctx.basicInfo?.info?.title ?? ctx.document?.info?.title
          }</title>`
        : ""
    }
    <!-- Embed elements Elements via Web Component -->
    <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
  </head>
  <body>

    <elements-api
      apiDescriptionUrl="${ctx.specUrl}"
      router="hash"
      layout="sidebar"
      ${objectToAttr(ctx.providerOptions)}
    />

  </body>
</html>
  `;
  }
}
