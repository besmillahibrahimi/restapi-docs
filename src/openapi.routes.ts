import express, { Request, Response } from "express";

const OpenApiRoutes = express.Router();

class ParseOpenApi {
  createOpenApiSpec(schemas: ParseSchemas) {}
  generateOpenApiSpec(req: Request, res: Response) {}
  renderOpenApiSpec(req: Request, res: Response) {}
}

export function initParseOpenApi(options: IParseOpenApi) {
  const openApi = new ParseOpenApi();
  OpenApiRoutes.get(options.path, openApi.renderOpenApiSpec);
  OpenApiRoutes.get(`${options.path}/json`, openApi.generateOpenApiSpec);
  return OpenApiRoutes;
}
