import { OpenAPIContext, OpenAPIRenderer } from "../types/types";

export default class SwaggerRenderer extends OpenAPIRenderer {
  render(ctx: OpenAPIContext): string {
    return `
        <html lang="en" dir="ltr>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="${ctx.document?.info?.description}" />
            <title>${ctx.document?.info?.title}</title>
            <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
          </head>
          <body>
            <div id="swagger-ui"></div>
            <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" crossorigin></script>
            <script>
              window.onload = () => {
                window.ui = SwaggerUIBundle({
                  url: '${ctx.specUrl}',
                  dom_id: '#swagger-ui',
                });
              };
            </script>
          </body>
        </html>
          `;
  }
}
