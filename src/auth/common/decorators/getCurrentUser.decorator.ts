import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Decorator getting user data request
export const GetCurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext): Promise<any> => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
