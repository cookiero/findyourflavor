const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeContact(value){
  const raw=String(value||'').trim().slice(0,254);if(!raw)return null;
  if(emailPattern.test(raw))return{contact:raw.toLowerCase(),type:'email',email:raw.toLowerCase()};
  const phone=raw.replace(/[^\d+]/g,'').replace(/(?!^)\+/g,''),digits=phone.replace(/\D/g,'');
  if(digits.length>=8&&digits.length<=15&&/^[+\d\s().-]+$/.test(raw))return{contact:phone,type:'phone',email:null};
  if(raw.length>=2)return{contact:raw.toLowerCase(),type:'kakao',email:null};
  return null;
}

export default async function handler(req,res){
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({error:'POST 요청만 사용할 수 있어요.'});}
  const supabaseUrl=(process.env.SUPABASE_URL||'').replace(/\/$/,'');
  const serviceKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!supabaseUrl||!serviceKey)return res.status(503).json({error:'대기명단 저장소가 아직 연결되지 않았어요.'});

  const name=String(req.body?.name||'').trim().slice(0,60);
  const contactInfo=normalizeContact(req.body?.contact||req.body?.email);
  const allowedSources=new Set(['find_your_flavor','friend_share','ios_testflight']);
  const source=allowedSources.has(req.body?.source)?req.body.source:'find_your_flavor';
  const flavor=req.body?.flavor?String(req.body.flavor).trim().slice(0,50):null;
  const pageUrl=req.body?.page_url?String(req.body.page_url).slice(0,500):null;
  if(!name)return res.status(400).json({error:'이름을 입력해 주세요.'});
  if(!contactInfo)return res.status(400).json({error:'이메일, 전화번호 또는 카카오톡 ID 중 하나를 확인해 주세요.'});

  try{
    const response=await fetch(`${supabaseUrl}/rest/v1/waitlist?on_conflict=contact`,{
      method:'POST',headers:{'Content-Type':'application/json','apikey':serviceKey,'Authorization':`Bearer ${serviceKey}`,'Prefer':'resolution=merge-duplicates,return=minimal'},
      body:JSON.stringify({name,contact:contactInfo.contact,contact_type:contactInfo.type,email:contactInfo.email,source,flavor,page_url:pageUrl,updated_at:new Date().toISOString()})
    });
    if(!response.ok){const detail=await response.text();console.error('Supabase waitlist error',response.status,detail.slice(0,300));return res.status(502).json({error:'대기명단을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.'});}
    return res.status(200).json({ok:true});
  }catch(error){console.error('Waitlist request error',error);return res.status(500).json({error:'대기명단을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.'});}
}
