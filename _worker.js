// Cloudflare Pages Worker - Este arquivo indica que é um projeto Pages
export default {
  async fetch(request, env, ctx) {
    return new Response('Cloudflare Pages configurado corretamente', { status: 200 });
  }
};
