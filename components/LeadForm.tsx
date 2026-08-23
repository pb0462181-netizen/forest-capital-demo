'use client';
import { useState } from 'react';
import { trackEvent } from './ConsentAnalytics';

export function LeadForm(){
  const [state,setState]=useState<'idle'|'sending'|'ok'|'error'>('idle');

  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setState('sending');
    const form=e.currentTarget;
    const body=Object.fromEntries(new FormData(form).entries());

    try{
      const r=await fetch('/api/lead',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          ...body,
          url:location.href,
          utm:location.search,
          source:document.referrer || 'direct'
        })
      });
      if(!r.ok) throw new Error('lead');
      setState('ok');
      trackEvent('lead_success',{ project:String(body.project || '') });
      form.reset();
    }catch{
      setState('error');
      trackEvent('lead_error');
    }
  }

  return <form onSubmit={submit} className="form">
    <input name="name" autoComplete="name" placeholder="Имя" required minLength={2}/>
    <input name="phone" autoComplete="tel" inputMode="tel" placeholder="Телефон" required minLength={7}/>
    <select name="land" defaultValue=""><option value="" disabled>Есть ли участок?</option><option>Есть</option><option>Подбираю</option></select>
    <input name="area" inputMode="numeric" placeholder="Предполагаемая площадь"/>
    <input name="budget" placeholder="Ориентировочный бюджет"/>
    <select name="contact" defaultValue="Телефон"><option>Телефон</option><option>Telegram</option><option>WhatsApp</option></select>
    <textarea name="comment" placeholder="Комментарий" rows={4}/>
    <input type="hidden" name="project" value="Главная страница"/>
    <label className="agree"><input type="checkbox" required/> <span>Согласен на обработку персональных данных и принимаю условия политики конфиденциальности.</span></label>
    <button className="button primary" disabled={state==='sending'}>{state==='sending'?'Отправляем…':'Получить консультацию архитектора'}</button>
    {state==='ok'&&<p className="ok" role="status">Спасибо. Заявка принята — мы свяжемся с вами.</p>}
    {state==='error'&&<p className="error" role="alert">Не удалось отправить заявку. Позвоните нам или напишите в Telegram.</p>}
    <style jsx>{`
      .form{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .form input,.form select,.form textarea{width:100%;border:1px solid var(--line);border-radius:14px;background:rgba(255,255,255,.04);color:white;padding:15px;font:inherit}
      .form textarea,.agree,.form button,.form p,.form input[type=hidden]{grid-column:1/-1}
      .agree{font-size:12px;color:#bbb6ad;display:flex;gap:8px;align-items:flex-start;line-height:1.45}
      .agree input{width:auto;margin-top:3px}.ok{color:#d8d3c8}.error{color:#f0b5a9}
      @media(max-width:700px){.form{grid-template-columns:1fr}.form>*{grid-column:1!important}}
    `}</style>
  </form>
}
