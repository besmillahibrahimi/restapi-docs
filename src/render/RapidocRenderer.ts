import { objectToAttr } from "../openapi.util";
import { OpenAPIContext, OpenAPIRenderer } from "../types/types";

export default class RapidocRenderer extends OpenAPIRenderer {
  render(ctx: OpenAPIContext): string {
    return `
       <!doctype html>
       <html>
        <head>
          <meta charset="utf-8"> <!-- Important: rapi-doc uses utf8 characters -->
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          ${
            ctx.basicInfo?.info?.description ?? ctx.document?.info?.description
              ? `<meta name="description" content="${
                  ctx.basicInfo?.info?.description ??
                  ctx.document?.info?.description
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
          <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
        </head>
        <body>
          <rapi-doc
            spec-url="${ctx.specUrl}"
            ${objectToAttr(ctx.providerOptions)}
          > </rapi-doc>
        </body>
       </html>
         `;
  }
}
