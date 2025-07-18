import { handleRequest } from '@cloudflare/next-on-pages';

export default {
  async fetch(request, env, ctx) {
    return handleRequest({ request, env, ctx });
  }
};
