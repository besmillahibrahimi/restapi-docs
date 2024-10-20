import { OpenAPIV3 } from "openapi-types";
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

export function objectToAttr(obj?: any) {
  return obj
    ? Object.entries(obj)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")
    : "";
}

function merge(src: any = {}, obj: any) {
  return Object.entries(obj ?? {})?.reduce((pre, [key, value]) => {
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
