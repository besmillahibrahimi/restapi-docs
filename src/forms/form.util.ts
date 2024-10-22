import { OpenAPIV3_1 } from "openapi-types";

function inputType(type: OpenAPIV3_1.NonArraySchemaObjectType) {
  switch (type) {
    case "boolean":
      return "radio";
    case "number":
    case "integer":
      return "number";
    case "null":
    case "object":
    case "string":
    default:
      return "text";
  }
}

export function Input(name: string, props: OpenAPIV3_1.SchemaObject): string {
  return `
  <div>
    <label>${name}</label>
    <input class=" border border-solid border-gray-300 shadow-xs p-2 rounded-md focus:rounded-md focus:outline-none focus:border-blue-500 focus:ring-2  focus:ring-blue-500 flex w-full bg-transparent text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed"
    name="${name}" placeholder="${name}" type="${inputType(
    props.type as any
  )}"/>
  </div>
    `;
}

export function Form(name: string, schemas: OpenAPIV3_1.SchemaObject): string {
  return `
    <form id="${name}" class="grid grid-cols-1 md:grid-cols-2 gap-5">
    ${Object.entries(schemas.properties ?? {})
      .map(([name, props]) => Input(name, props))
      .join("\n")}
    </form>
    `;
}
