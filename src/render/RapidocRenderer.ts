import { OpenAPIContext } from "../core/OpenAPIApp";
import { objectToAttr } from "../openapi.util";
import { OpenAPIRenderer } from "./render";

export default class RapidocRenderer extends OpenAPIRenderer {
  render(context: OpenAPIContext): string {
    return `
       <!doctype html>
       <html>
        <head>
          <meta charset="utf-8"> <!-- Important: rapi-doc uses utf8 characters -->
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="${
            context.document?.info.description
          }" />
          <title>${context.document?.info.title}</title>
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
