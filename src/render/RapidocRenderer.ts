import { objectToAttr } from "../openapi.util";
import { OpenAPIContext, OpenAPIRenderer } from "../types/types";

export default class RapidocRenderer extends OpenAPIRenderer {
  render(context: OpenAPIContext): string {
    return `
       <!doctype html>
       <html>
        <head>
          <meta charset="utf-8"> <!-- Important: rapi-doc uses utf8 characters -->
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="${
            context.basicInfo?.info?.description
          }" />
          <title>${context.basicInfo?.info?.title}</title>
          <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
        </head>
        <body>
          <rapi-doc
            spec-url="${context.specUrl}"
            ${objectToAttr(context.providerOptions)}
          > </rapi-doc>
        </body>
       </html>
         `;
  }
}
