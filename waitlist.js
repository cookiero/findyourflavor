export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.GOOGLE_SHEETS_WEBHOOK_URL)return res.status(503).json({error:'Waitlist is not configured'});
  const {name,contact,website='',source='result'}=req.body||{};
  if(website)return res.status(200).json({ok:true});
  if(typeof name!=='string'||name.trim().length<1||name.trim().length>40||typeof contact!=='string'||contact.trim().length<2||contact.trim().length>120)return res.status(400).json({error:'Invalid waitlist entry'});
  try{
    const response=await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:name.trim(),contact:contact.trim(),source:String(source).slice(0,30),createdAt:new Date().toISOString()}),redirect:'follow'});
    if(!response.ok)throw new Error('Sheet request failed');
    return res.status(200).json({ok:true});
  }catch{return res.status(502).json({error:'Waitlist unavailable'});}
}
