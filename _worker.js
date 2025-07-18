// Cloudflare Pages Functions
export default {
  async fetch(request, env, ctx) {
    return new Response('Cloudflare Pages está funcionando!', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};
