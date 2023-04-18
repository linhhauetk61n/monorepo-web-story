import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ContextData = createParamDecorator<any, ExecutionContext>(
  (_, ctx) => ctx.switchToHttp().getRequest(),
);

//Save data decoded from jwt to request with custom key
// export class ContextType {
//   user: {
//     id: string;
//     role: UserRole;
//   };
// }

// const contextKey = 'contextKey';

// export const getRequestContext = (req: unknown): ContextType =>
//   req?.[contextKey] || {};

// export const addRequestContext = (
//   req: unknown,
//   input: Partial<ContextType>,
// ): ContextType => {
//   const cur: ContextType = getRequestContext(req);
//   req[contextKey] = {
//     ...cur,
//     ...input,
//   };
//   return req[contextKey];
// };

// export const ContextData = createParamDecorator<
//   any,
//   ExecutionContext,
//   ContextType
// >((_, ctx) => getRequestContext(ctx.switchToHttp()?.getRequest()));
