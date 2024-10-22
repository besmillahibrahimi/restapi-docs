import { OpenAPIV3_1 } from "openapi-types";

function mapType(type: OpenAPIV3_1.NonArraySchemaObjectType) {
  switch (type) {
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

function renderInput(name: string, props: OpenAPIV3_1.SchemaObject) {
  switch (props.type) {
    case "boolean":
      return `
      <div>
        <label>${name}</label>
        <input type="radio"/>
      </div>
      `;

    case "null":
    case "string":
      return `
      <tinymce-editor class="col-span-2"
    api-key="xgthcqdxgns6ddrqgp0jrtmri932xiqhi6dr2be6omubk9pp"
    height="500"
    menubar="false"
    plugins="a11ychecker advlist advcode advtable autolink checklist export
    lists link image charmap preview anchor searchreplace visualblocks
    powerpaste fullscreen formatpainter insertdatetime media table help wordcount"
    toolbar="undo redo | casechange blocks | bold italic backcolor |
     alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent |
     removeformat | a11ycheck code table help"
    content_style="body
    {
      font-family:Helvetica,Arial,sans-serif;
      font-size:14px
    }"
    >

    <!-- Adding some initial editor content -->
    &lt;p&gt;Welcome to the TinyMCE Web Component example!&lt;/p&gt;

  </tinymce-editor>
      `;
    case "string":
    case "number":
    case "integer":
    default:
      return Input(name, props);
  }
}

export function TextArea(name: string, props: any): string {
  return `
  <textarea name="${name}" />
  `;
}

export function Input(name: string, props: OpenAPIV3_1.SchemaObject): string {
  return `
  <div>
    <label>${name}</label>
    <input class=" border border-solid border-gray-300 shadow-xs p-2 rounded-md focus:rounded-md focus:outline-none focus:border-blue-500 focus:ring-2  focus:ring-blue-500 flex w-full bg-transparent text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed"
    name="${name}" placeholder="${name}" type="${mapType(props.type as any)}"/>
  </div>
    `;
}

export function Form(name: string, schemas: OpenAPIV3_1.SchemaObject): string {
  return `
    <form id="${name}" class="grid grid-cols-1 md:grid-cols-2 gap-5">
    ${Object.entries(schemas.properties ?? {})
      .map(([name, props]) => renderInput(name, props))
      .join("\n")}
    </form>
    `;
}
