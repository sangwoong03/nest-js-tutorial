import { applyDecorators, Type } from '@nestjs/common';

export const Swagger = (
  summary: string,
  description: string,
  outputType: Type<unknown> | Function | [Function] | string,
  isArray?: boolean,
  error?: string,
) => {
  return applyDecorators(
    // some decorators for SwaggerUI
  );
};