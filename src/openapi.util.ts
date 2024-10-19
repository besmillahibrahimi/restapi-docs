import { OpenAPIV3 } from "openapi-types";
import { faker } from "@faker-js/faker";
import { Providers } from "./types/types";
import { ParseSchema } from "./types/parse.types";

export function buildOpenAPIQueryResult(
  schema: ParseSchema
): OpenAPIV3.SchemaObject {
  const result: OpenAPIV3.SchemaObject = {
    type: "object",
    description:
      "The return value is a JSON object that contains a results field with a JSON array that lists the objects.",
    properties: {
      results: {
        type: "array",
        items: {
          $ref: `#/components/schemas/${schema.className}`,
        },
      },
    },
  };

  return result;
}

const GameScore = { score: 1337, playerName: "Sean Plott", cheatMode: false };
const fakeString = () => faker.string.alpha();
const fakeWord = () => faker.company.name();
const fakeUrl = () => faker.internet.url();
const fakeNumber = () => faker.number.int();
const fakeDate = () => faker.date.anytime();
const fakeNull = () => null;
const fakeObject = () => GameScore;
const fakeArray = () => faker.helpers.multiple(() => null, { count: 3 });
const fakeBool = () => (Math.ceil(Math.random() * 10) % 2 === 0 ? true : false);

const func: Record<string, any> = {
  String: fakeWord,
  Number: fakeNumber,
  Boolean: fakeBool,
  Date: fakeDate,
  DateTime: fakeDate,
  File: fakeUrl,
  Null: fakeNull,
  Object: fakeObject,
  Pointer: fakeString,
  Relation: fakeString,
  Array: fakeArray,
  ACL: fakeString,
};

export function fakeExample(schema: ParseSchema): Record<string, any> {
  const example: Record<string, any> = {};
  for (let [field, metadata] of Object.entries(schema.fields)) {
    example[field] = func[metadata.type]();
  }

  return example;
}

export function objectToAttr(obj?: any) {
  return obj
    ? Object.entries(obj)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")
    : "";
}

function merge(src: any = {}, obj: any) {
  return Object.entries(obj).reduce((pre, [key, value]) => {
    pre[key] = typeof value === "object" ? merge(src[key], value) : value;
    return pre;
  }, src);
}

export function mergeObject(obj1: any, obj2: any): any {
  let obj = {};
  merge(obj, obj1);
  merge(obj, obj2);
  return obj;
}

export function createHTML(provider: Providers): string {
  const swagger = `
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="SwaggerUI" />
    <title>SwaggerUI</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js" crossorigin></script>
    <script>
      window.onload = () => {
        window.ui = SwaggerUIBundle({
          url: 'http://localhost:5000/docs/json',
          dom_id: '#swagger-ui',
        });
      };
    </script>
  </body>
</html>
  `;

  const scalar = `
<!DOCTYPE html>
<html>
  <head>
    <title>API Reference</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
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
      data-url="http://localhost:5000/docs/json"
      
    >
    </script>
    
	<script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.25.9/dist/browser/standalone.min.js" crossorigin></script>
  </body>
</html>
  `;

  const redoc = `
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="SwaggerUI" />
    <title>SwaggerUI</title>
    <style>
      body {
        margin: 0;
      }
    </style>
    <style>
      
    </style>
  </head>
  <body>
    <redoc spec-url="http://localhost:5000/docs/json"></redoc>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"> </script>
  </body>
</html>
  `;

  const stoplightio = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Elements in HTML</title>
    <!-- Embed elements Elements via Web Component -->
    <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css">
  </head>
  <body>

    <elements-api
      apiDescriptionUrl="http://localhost:5000/docs/json"
      router="hash"
      layout="sidebar"
    />

  </body>
</html>
  `;

  const rapidoc = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8"> <!-- Important: rapi-doc uses utf8 characters -->
  <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
</head>
<body>
  <rapi-doc
    spec-url="http://localhost:5000/docs/json"
    theme = "dark"
  > </rapi-doc>
</body>
</html>
  `;

  const providers = { swagger, scalar, redoc, stoplightio, rapidoc };
  return providers[provider] ?? providers.scalar;
}
