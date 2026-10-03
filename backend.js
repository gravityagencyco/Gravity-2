// Backend صغير لإشعار واتساب. يعمل على Node 18+ وليس على GitHub Pages.
// الأسرار (WHATSAPP_TOKEN) موجودة هنا فقط كمتغيرات بيئة، ولا تصل للـ Frontend.
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_ANON_KEY, WHATSAPP_TOKEN, WHATSAPP_PHONE_ID, WHATSAPP_TEMPLATE, ALLOWED_ORIGIN, PORT = 3000 } = process.env;
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) { console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY'); process.exit(1); }
const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(cors({ origin: (ALLOWED_ORIGIN || '').split(',').filter(Boolean) }));
app.get('/health', (_, res) => res.send('ok'));

app.post('/api/notify-completed', async (req, res) => {
  try {
    const token = (req.headers.authorization || '').replace(/^Bearer /, '');
    if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID || !WHATSAPP_TEMPLATE) return res.status(503).json({ error: 'whatsapp not configured' });
    const { orderId } = req.body || {};
    if (!token || !orderId) return res.status(400).json({ error: 'bad request' });
    // نتصرف بصلاحيات المستخدم نفسه: RLS هو اللي يقرر، فلا نحتاج Service Role Key
    const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { global: { headers: { Authorization: 'Bearer ' + token } }, auth: { persistSession: false } });
    const { data: admin } = await sb.rpc('is_admin');
    if (admin !== true) return res.status(403).json({ error: 'admin only' });
    const { data: o, error } = await sb.from('orders').select('id,status,notified_at,profiles(name,phone)').eq('id', orderId).single();
    if (error || !o) return res.status(404).json({ error: 'order not found' });
    if (o.status !== 'completed') return res.status(409).json({ error: 'order is not completed' });
    if (o.notified_at) return res.json({ ok: true, already: true });
    const d = String(o.profiles?.phone || '').replace(/\D/g, '');
    const to = d.startsWith('0') ? '20' + d.slice(1) : d; // أرقام مصر المحلية
    const r = await fetch(`https://graph.facebook.com/v21.0/${WHATSAPP_PHONE_ID}/messages`, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + WHATSAPP_TOKEN, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'template',
        template: { name: WHATSAPP_TEMPLATE, language: { code: 'ar' }, components: [{ type: 'body', parameters: [{ type: 'text', text: o.profiles?.name || '' }] }] } })
    });
    if (!r.ok) return res.status(502).json({ error: 'whatsapp: ' + (await r.text()).slice(0, 200) });
    await sb.from('orders').update({ notified_at: new Date().toISOString() }).eq('id', orderId);
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: 'server error' }); }
});

app.listen(PORT, () => console.log('GRAVITY backend on :' + PORT));
