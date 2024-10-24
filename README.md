# RestAPI-Docs

RestAPI-Docs is an npm package that allows you to render OpenAPI specifications using different tools such as Swagger UI, Redoc, RapiDoc, StoplightIO, and Scalar. It can either take an OpenAPI specification URL, file, or generate the specification directly from database model schemas (like Parse Server's `/schemas` endpoint).

## Features

- **Multiple Renderers**: Support for Swagger, Redoc, RapiDoc, StoplightIO, and Scalar renderers.
- **Flexible Input Options**: Render OpenAPI specs from a URL, local spec file, or generate from Parse Server schemas.
- **CLI Tool**: Can be used as a command-line tool or a programmatic package.
- **Easy Integration**: Works seamlessly with Parse Server schemas.

## Installation

You can install the package using npm:

### npm

```bash
npm install -g restapi-docs
```

### yarn

```bash
yarn add -g restapi-docs
```

## Usage

## CLI Usage

You can use the CLI to render OpenAPI specs from various sources:

1. Render from a URL:

```bash
restapi-docs openapi --specUrl <openapi-spec-url> --renderer <renderer>
```

Example:

```bash
restapi-docs openapi --specUrl https://api.example.com/openapi.json --renderer swagger
```

2. Render from a local spec file:

```bash
restapi-docs openapi --specFile <openapi-spec-file> --renderer <renderer>
```

Example:

```bash
restapi-docs openapi --specFile ./openapi.json --renderer scalar
```

## Build OpenAPI Document from Parse Server Schemas:

Creates OpenAPI Specification from Parse-Server schemas.

1. Render from parse-server schemas:

```bash
restapi-docs parse-server --appId <parse-server-app-id> --masterKey <parse-server-master-key> --serverUrl <parse-server-server-url> --renderer <renderer>
```

Example:

```bash
restapi-docs parse-server --appId parse-server-app-id --masterKey parse-server-master-key --serverUrl https://example.com/parse --renderer scalar
```

## Programmatic Usage

You can also use the package programmatically in your Node.js application:

# Available Renderers

- `swagger` – Swagger UI
- `redoc` – Redoc
- `rapidoc` – RapiDoc
- `stoplightio` – StoplightIO
- `scalar` – Scalar

# Commands & Options

The following commands with options are available for both the CLI and programmatic usage:

## parse-server

- `--appId` or `appId`: Parse-Server Application-ID
- `--masterKey` or `masterKey`: parse-Server Master-Key
- `--serverUrl` or `serverUrl`: URL to the Parse Server

### - Example

```bash
restapi-docs parse-server --<options>
```

## openapi

- `--specUrl` or `specUrl`: URL to the OpenAPI specification.
- `--specFile` or `specFile`: Path to the local OpenAPI specification file.

### - Example

```bash
restapi-docs openapi --<options>
```

## Global Options

The following options can be used in-conjuction with all commands.

- `--title` or `title`: A title for specification. It is shown as browser title
- `--desc` or `desc`: A description of the specification.
- `--summary` or `summary`: A summary of the specification.
- `--port` or `port`: The port at which the app will listen in stand-alone mode.
- `--path` or `path`: A path after hostname. The default value /\_docs
- `--renderer` or `-r` or `provider`: Specifies the renderer engine.
  - swagger
  - redoc
  - stoplightio
  - scalar
  - rapidoc
