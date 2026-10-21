const ID = 'main';
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/state') return env.ASSETS.fetch(request);

    if (request.method === 'GET') {
      const row = await env.DB.prepare('SELECT data, updated_at FROM sim_state WHERE id = ?').bind(ID).first();
      if (!row) return json(null);
      return json({ ...JSON.parse(row.data), updatedAt: row.updated_at });
    }

    if (request.method === 'PUT') {
      if (env.EDIT_KEY && request.headers.get('x-edit-key') !== env.EDIT_KEY) return json({ error: 'unauthorized' }, 401);
      const text = await request.text();
      if (text.length > 500_000) return json({ error: 'too large' }, 413);
      let o;
      try { o = JSON.parse(text); } catch { return json({ error: 'bad json' }, 400); }
      if (!o?.layout?.top || !o?.layout?.base) return json({ error: 'layout.top and layout.base required' }, 400);
      const now = Date.now();
      await env.DB.prepare(
        'INSERT INTO sim_state (id, data, updated_at) VALUES (?1, ?2, ?3) ON CONFLICT(id) DO UPDATE SET data = ?2, updated_at = ?3'
      ).bind(ID, JSON.stringify({ layout: o.layout, params: o.params ?? {} }), now).run();
      return json({ ok: true, updatedAt: now });
    }

    return json({ error: 'method not allowed' }, 405);
  },
};
