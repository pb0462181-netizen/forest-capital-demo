import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const LeadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(30),
  land: z.string().max(40).optional(),
  area: z.string().max(40).optional(),
  budget: z.string().max(80).optional(),
  contact: z.string().max(30).optional(),
  comment: z.string().max(1500).optional(),
  url: z.string().max(500).optional(),
  utm: z.string().max(1000).optional(),
  project: z.string().max(120).optional(),
  source: z.string().max(120).optional(),
});

function clean(value: unknown) {
  return typeof value === 'string' ? value.replace(/[<>]/g, '') : value;
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    const parsed = LeadSchema.safeParse(Object.fromEntries(
      Object.entries(raw).map(([k,v]) => [k, clean(v)])
    ));

    if (!parsed.success) {
      return NextResponse.json({ ok:false, error:'validation' }, { status:400 });
    }

    const lead = {
      ...parsed.data,
      source: parsed.data.source || 'website',
      receivedAt: new Date().toISOString(),
      userAgent: req.headers.get('user-agent') || '',
      referer: req.headers.get('referer') || '',
    };

    const webhook = process.env.BITRIX24_WEBHOOK_URL;

    if (!webhook) {
      console.info('[FOREST lead / demo]', lead);
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ ok:false, error:'crm_not_configured' }, { status:503 });
      }
      return NextResponse.json({ ok:true, demo:true });
    }

    const fields = {
      TITLE: `Заявка с сайта FOREST capital — ${lead.name}`,
      NAME: lead.name,
      PHONE: [{ VALUE: lead.phone, VALUE_TYPE: 'WORK' }],
      COMMENTS: [
        lead.comment,
        `Участок: ${lead.land || '—'}`,
        `Площадь: ${lead.area || '—'}`,
        `Бюджет: ${lead.budget || '—'}`,
        `Связь: ${lead.contact || '—'}`,
        `Проект: ${lead.project || '—'}`,
        `URL: ${lead.url || '—'}`,
        `UTM: ${lead.utm || '—'}`,
        `Источник: ${lead.source || 'website'}`
      ].filter(Boolean).join('\n')
    };

    const endpoint = webhook.replace(/\/$/, '') + '/crm.lead.add.json';
    const crm = await fetch(endpoint, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({ fields, params:{ REGISTER_SONET_EVENT:'Y' } }),
      cache:'no-store',
    });

    if (!crm.ok) {
      console.error('Bitrix24 HTTP error', crm.status, await crm.text());
      return NextResponse.json({ ok:false, error:'crm_failed' }, { status:502 });
    }

    const result = await crm.json();
    return NextResponse.json({ ok:true, id:result.result ?? null });
  } catch (error) {
    console.error('Lead route error', error);
    return NextResponse.json({ ok:false, error:'server_error' }, { status:500 });
  }
}
