import { Viewer } from '../Viewer';
import { MiddlewareFn } from 'type-graphql';

export const authentication: MiddlewareFn<Context> = async ({ context }, next) => {
  const result = await authenticate(context.req.headers.authorization);
  context.viewer = new Viewer(result);

  return next();
};
