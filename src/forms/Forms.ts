import { Request, Response } from "express";
import { OpenAPIV3_1 } from "openapi-types";
import { Form } from "./form.util";

export default function createForm(specUrl: string) {
  return async (req: Request, res: Response) => {
    const spec = (await fetch(specUrl).then((r) =>
      r.json()
    )) as OpenAPIV3_1.Document;

    const html = `
            <!doctype html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
        <main class="container mx-auto flex">
            <div class="px-16 border-r border-r-gray-700 ">
                <ul>
                ${Object.entries(spec.components?.schemas ?? {})
                  .map(
                    ([key, value]) => `
                  <li class="py-1 px-2 hover:bg-gray-100 rounded">
                  <a href="#${key}">
                  ${key}
                  </a>
                  </li>`
                  )
                  .join("\n")}
                </ul>
            </div>

            <div class="flex-grow h-screen overflow-y-auto">
            ${Object.entries(spec.components?.schemas ?? {})
              .map(
                ([name, props]) =>
                  `
                <section id="${name}" class="min-h-screen p-8">
                    ${Form(name, props)}
                </section>
                <hr/>
                `
              )
              .join("\n")}
            </div>

            <div class="px-16 border-l border-l-gray-700 ">
            
            </div>
        </main>
    </body>
    </html>
            `;

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  };
}
