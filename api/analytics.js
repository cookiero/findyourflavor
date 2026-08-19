const ALLOWED_EVENTS=new Set(['flavor_started','flavor_completed','friend_share_clicked','friend_landing_viewed','friend_flavor_completed','jar_save_completed']);

function webhookUrl(rawValue){
  const raw=String(rawValue||'').trim();
  const fullUrl=raw.match(/https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/(?:exec|dev)/)?.[0];
  const id=!fullUrl&&/^[A-Za-z0-9_-]{30,}$/.test(raw.replace(/^['"]|['"]$/g,''))?raw.replace(/^['"]|['"]$/g,''):null;
  return(fullUrl||id&&`https://script.google.com/macros/s/${id}/exec`)?.replace(/\/dev$/,'/exec');
}

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  const webhook=webhookUrl(process.env.GOOGLE_SHEETS_WEBHOOK_URL);
  if(!webhook)return res.status(503).json({error:'NOT_CONFIGURED'});
  const text=(value,max)=>typeof value==='string'?value.trim().slice(0,max):'';
  const event={type:'analytics',timestamp:new Date().toISOString(),session_id:text(req.body?.session_id,100),event_name:text(req.body?.event_name,50),flavor:text(req.body?.flavor,60),source:text(req.body?.source,60),destination:text(req.body?.destination,80),referrer:text(req.body?.referrer,500)};
  if(!event.session_id||!ALLOWED_EVENTS.has(event.event_name))return res.status(400).json({error:'Invalid analytics event'});
  try{
    const response=await fetch(webhook,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(event),redirect:'follow'});
    const result=await response.json().catch(()=>null);
    if(!response.ok||!result?.ok)return res.status(502).json({error:'SHEET_SCRIPT_ERROR'});
    return res.status(200).json({ok:true});
  }catch(error){console.error('Analytics connection error',error?.message||'unknown');return res.status(502).json({error:'CONNECTION_ERROR'});}
}
