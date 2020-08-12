import { Viewer } from '../Viewer';
import { MiddlewareFn } from 'type-graphql';
import { authenticate, GraphQLContext } from 'rmc-backend-tools';

export const authentication: MiddlewareFn<GraphQLContext> = async ({ context }, next) => {
  const result = await authenticate(context.req.headers.authorization);
  context.viewer = new Viewer(result);

  return next();
};
