import { OpenAPIV3_1 } from "openapi-types";
import {
  buildOpenAPIQueryResult,
  fakeExample,
  mergeObject,
} from "../openapi.util";
import { ParseOption, ParseSchema } from "../types/parse.types";
import { DefualtDocData } from "../core/OpenAPIApp";

const typeMapping: Record<
  string,
  OpenAPIV3_1.NonArraySchemaObjectType | OpenAPIV3_1.ArraySchemaObjectType
> = {
  String: "string",
  Number: "number",
  Boolean: "boolean",
  Date: "string", // Add format: date-time in schema
  Object: "object",
  Pointer: "string", // Points to an objectId
  Relation: "string", // Points to an objectId
  Array: "array", // Points to an objectId
};

interface IProperties {
  [name: string]: OpenAPIV3_1.ReferenceObject | OpenAPIV3_1.SchemaObject;
}

export default class ParseOpenApi {
  createOpenApiSpec(
    schemas: ParseSchema[],
    options: ParseOption
  ): OpenAPIV3_1.Document {
    const document: OpenAPIV3_1.Document = {
      ...mergeObject(DefualtDocData, options.doc),
      tags: schemas.map<OpenAPIV3_1.TagObject>((s) => ({ name: s.className })),
      components: {
        schemas: schemas.reduce((pre, cur, index) => {
          // @ts-ignore
          pre[cur.className] = this.generateOpenAPIComponentSchema(cur);
          return pre;
        }, {}),
        parameters: {
          AppIdHeader: {
            name: "X-Parse-Application-Id",
            description: "Application ID for Parse Server.",
            in: "header",
            required: true,
            schema: { type: "string" },
          },
          RestKeyHeader: {
            name: "X-Parse-REST-API-Key",
            description: " REST API Key for Parse Server.",
            in: "header",
            required: true,
            schema: { type: "string" },
          },
          WhereQueryParam: {
            name: "where",
            in: "query",
            required: false,
            schema: {
              type: "string",
            },
            description: "Filter condition in JSON format.",
            examples: {
              "application/json": {
                $ref: "#/components/examples/GameScoreQuery",
              },
            },
          },
          IncludeQueryParam: {
            name: "include",
            in: "query",
            required: false,
            schema: {
              type: "string",
            },
            description:
              "When retrieving objects that have pointers to children, you can fetch child objects by using the `include` option",
            examples: {
              "application/json": {
                $ref: "#/components/examples/GameScoreQuery",
              },
            },
          },
          ReadPreferenceQueryParam: {
            name: "readPreference",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: [
                "PRIMARY",
                "PRIMARY_PREFERRED",
                "SECONDARY",
                "SECONDARY_PREFERRED",
                "NEAREST",
              ],
            },
            description:
              "When using a MongoDB replica set, you can use the `readPreference` option to choose from which replica the object will be retrieved.",
            examples: {
              "application/json": {
                $ref: "#/components/examples/GameScoreQuery",
              },
            },
          },
          IncludeReadPreferenceQueryParam: {
            name: "includeReadPreference",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: [
                "PRIMARY",
                "PRIMARY_PREFERRED",
                "SECONDARY",
                "SECONDARY_PREFERRED",
                "NEAREST",
              ],
            },
            description:
              "You can also use the `includeReadPreference` option to choose from which replica the included pointers will be retrieved.",
            examples: {
              "application/json": {
                $ref: "#/components/examples/GameScoreQuery",
              },
            },
          },
          ProjectQueryParam: {
            name: "project",
            in: "query",
            required: false,
            schema: {
              type: "string",
            },
            description:
              "You can add or remove existing fields with `project` parameter. project is similar to `keys`.",

            example: {
              value: { score: 1, noNeedField: -1 },
            },
          },
          MatchQueryParam: {
            name: "match",
            in: "query",
            required: false,
            schema: {
              type: "string",
            },
            description:
              "You can filter out objects with `match` parameter. match is similar to `$eq`",
          },
          GroupQueryParam: {
            name: "group",
            in: "query",
            required: false,
            schema: {
              type: "string",
            },
            description:
              "You can group the objects and apply an accumulator operator such as `$sum`, `$avg`, `$max`, `$min`. `group` is similar to `distinct`.",
          },
          DistinctQueryParam: {
            name: "distinct",
            in: "query",
            required: false,
            schema: {
              type: "string",
            },
            description:
              "Finds the distinct values for a specified field across a single collection or view and returns the results in an array.",
          },
        },
        securitySchemes: {
          AppId: { $ref: `#/components/parameters/AppIdHeader` },
          RestKey: { $ref: `#/components/parameters/RestKeyHeader` },
        },

        examples: {
          GameScore: {
            value: { score: 1337, playerName: "Sean Plott", cheatMode: false },
          },
          GameScoreQuery: {
            value: {
              score: { $in: [1, 3, 5, 7, 9] },
              playerName: "Sean Plott",
            },
          },
          ...schemas.reduce<Record<string, OpenAPIV3_1.ExampleObject>>(
            (pre, cur) => ({
              ...pre,
              [cur.className]: { value: fakeExample(cur) },
            }),
            {}
          ),
        },
      },
      paths: schemas.reduce((pre, cur, index) => {
        const paths = this.generateOpenAPIPaths(cur);
        return { ...pre, ...paths };
      }, {}),
    };

    return document;
  }

  // Function to generate OpenAPI components from Parse schema
  generateOpenAPIComponentSchema(
    schema: ParseSchema
  ): OpenAPIV3_1.SchemaObject {
    const properties: IProperties = {};
    const required: string[] = [];

    for (const [field, metadata] of Object.entries(schema.fields)) {
      const type = typeMapping[metadata.type] ?? "string";

      const prop:
        | OpenAPIV3_1.ArraySchemaObject
        | OpenAPIV3_1.NonArraySchemaObject =
        type === "array" ? { type, items: { type: "string" } } : { type };
      properties[field] = prop;

      if (metadata?.required) {
        required.push(field);
      }

      if (metadata?.type === "Pointer") {
        properties[field].description = `Pointer to ${metadata?.targetClass}`;
      }

      if (["date", "Date"].includes(metadata.type)) {
        properties[field].format = "date-time";
      }
    }

    return {
      type: "object",
      description: `${schema.className} Definitions`,
      properties,
      required: required.length ? required : undefined,
    };
  }

  generateOpenAPIPaths(schema: ParseSchema): OpenAPIV3_1.PathsObject {
    const paths: OpenAPIV3_1.PathsObject = {};
    paths[`/classes/${schema.className}`] = {
      get: {
        operationId: `get_classes_${schema.className}`,
        summary: `Queries ${schema.className}`,
        externalDocs: {
          url: "https://docs.parseplatform.org/rest/guide/#retrieving-objects",
          description: "Parse Official Docs",
        },
        description: `You can retrieve multiple objects at once by sending a GET request to the class URL. Without any URL parameters, this simply lists objects in the class`,
        tags: [schema.className],
        responses: {
          "200": {
            description: "Successful Response",
            content: {
              "application/json": {
                examples: {
                  "application/json": {
                    value: {
                      results: [
                        {
                          $ref: `#/components/examples/${schema.className}/value`,
                        },
                      ],
                    },
                  },
                },
                schema: buildOpenAPIQueryResult(schema),
              },
            },
          },
        },
        parameters: [
          {
            $ref: `#/components/parameters/AppIdHeader`,
          },
          {
            $ref: `#/components/parameters/RestKeyHeader`,
          },
          {
            $ref: `#/components/parameters/WhereQueryParam`,
          },
          {
            $ref: `#/components/parameters/IncludeQueryParam`,
          },
          {
            $ref: `#/components/parameters/ReadPreferenceQueryParam`,
          },
          {
            $ref: `#/components/parameters/IncludeReadPreferenceQueryParam`,
          },
          {
            $ref: `#/components/parameters/ProjectQueryParam`,
          },
        ],
      },
      post: {
        operationId: `post_classes_${schema.className}`,
        summary: `Creating ${schema.className}`,
        externalDocs: {
          url: "https://docs.parseplatform.org/rest/guide/#creating-objects",
          description: "Parse Official Docs",
        },
        description:
          "To create a new object on Parse, send a POST request to the class URL containing the contents of the object. For example, to create the object described above:",
        tags: [schema.className],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              examples: {
                "application/json": {
                  $ref: `#/components/examples/${schema.className}`,
                },
              },
              schema: { $ref: `#/components/schemas/${schema.className}` },
            },
          },
        },
        parameters: [
          {
            $ref: `#/components/parameters/AppIdHeader`,
          },
          {
            $ref: `#/components/parameters/RestKeyHeader`,
          },
        ],
        responses: {
          "201": {
            description: `**${schema.className}** object created successfully`,
            headers: {
              Location: {
                description: "URL of the newly created object",
                schema: {
                  type: "string",
                  example: `https://YOUR.PARSE-SERVER.HERE/parse/classes/${schema.className}/xxxxx`,
                },
              },
            },
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    objectId: {
                      type: "string",
                      description: "Unique identifier of the created object",
                      example: "Ed1nuqPvcm",
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                      description: "Time of object creation",
                      example: "2024-09-07T12:34:56.789Z",
                    },
                  },
                },
              },
            },
          },
        },
      },
    };
    paths[`/classes/${schema.className}/:objectId`] = {
      get: {
        operationId: `get_classes_${schema.className}_objectId`,
        summary: `Retrieving ${schema.className}`,
        tags: [schema.className],
        externalDocs: {
          url: "https://docs.parseplatform.org/rest/guide/#retrieving-objects",
          description: "Parse Official Docs",
        },

        description:
          "Once you’ve created an object, you can retrieve its contents by sending a GET request to the object URL returned in the location header.",
        parameters: [
          {
            $ref: `#/components/parameters/AppIdHeader`,
          },
          {
            $ref: `#/components/parameters/RestKeyHeader`,
          },
          {
            $ref: `#/components/parameters/WhereQueryParam`,
          },
        ],
        responses: {
          "200": {
            description: "Successful Response",
            content: {
              "application/json": {
                schema: {
                  $ref: `#/components/schemas/${schema.className}`,
                  description:
                    "The response body is a JSON object containing all the user-provided fields, plus the **createdAt**, **updatedAt**, and **objectId** fields",
                },
              },
            },
          },
        },
      },
      put: {
        operationId: `put_classes_${schema.className}_objectId`,
        summary: `Updating ${schema.className}`,
        tags: [schema.className],
        externalDocs: {
          url: "https://docs.parseplatform.org/rest/guide/#updating-objects",
          description: "Parse Official Docs",
        },
        description:
          "To change the data on an object that already exists, send a PUT request to the object URL. Any keys you don’t specify will remain unchanged, so you can update just a subset of the object’s data. For example, if we wanted to change the score field of our object",
        parameters: [
          {
            $ref: `#/components/parameters/AppIdHeader`,
          },
          {
            $ref: `#/components/parameters/RestKeyHeader`,
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              examples: {
                "application/json": {
                  $ref: `#/components/examples/${schema.className}`,
                },
              },
              schema: {
                $ref: `#/components/schemas/${schema.className}`,
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful update",
            content: {
              "application/json": {
                schema: {
                  description:
                    "The response body is a JSON object containing just an updatedAt field with the timestamp of the update.",
                  type: "object",
                  properties: {
                    updatedAt: {
                      type: "string",
                      format: "date-time",
                    },
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        operationId: `delete_classes_${schema.className}_objectId`,
        summary: `Deleting ${schema.className}`,
        tags: [schema.className],
        externalDocs: {
          url: "https://docs.parseplatform.org/rest/guide/#deleting-objects",
          description: "Parse Official Docs",
        },
        description:
          "To delete an object from the Parse Cloud, send a DELETE request to its object URL.",
        responses: {
          "200": {
            description: "Successful Delete",
          },
        },
      },
    };
    paths[`/aggregate/${schema.className}`] = {
      get: {
        operationId: `get_aggregate_${schema.className}`,
        summary: `Aggregate Queries ${schema.className}`,
        externalDocs: {
          url: "https://docs.parseplatform.org/rest/guide/#retrieving-objects",
          description: "Parse Official Docs",
        },
        description: `You can retrieve multiple objects at once by sending a GET request to the class URL. Without any URL parameters, this simply lists objects in the class`,
        tags: [schema.className],
        responses: {
          "200": {
            description: "Successful Response",
            content: {
              "application/json": {
                examples: {
                  "application/json": {
                    value: {
                      results: [
                        {
                          $ref: `#/components/examples/${schema.className}/value`,
                        },
                      ],
                    },
                  },
                },
                schema: buildOpenAPIQueryResult(schema),
              },
            },
          },
        },
        parameters: [
          {
            $ref: `#/components/parameters/AppIdHeader`,
          },
          {
            $ref: `#/components/parameters/RestKeyHeader`,
          },
          {
            $ref: `#/components/parameters/WhereQueryParam`,
          },
          {
            $ref: `#/components/parameters/IncludeQueryParam`,
          },
          {
            $ref: `#/components/parameters/ReadPreferenceQueryParam`,
          },
          {
            $ref: `#/components/parameters/IncludeReadPreferenceQueryParam`,
          },
          {
            $ref: `#/components/parameters/ProjectQueryParam`,
          },
          {
            $ref: `#/components/parameters/MatchQueryParam`,
          },
          {
            $ref: `#/components/parameters/GroupQueryParam`,
          },
          {
            $ref: `#/components/parameters/DistinctQueryParam`,
          },
        ],
      },
    };

    return paths;
  }
}
