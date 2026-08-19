export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  const rawWebhook=String(process.env.GOOGLE_SHEETS_WEBHOOK_URL||'').trim();
  if(!rawWebhook)return res.status(503).json({error:'NOT_CONFIGURED',message:'대기명단 연결 주소가 아직 설정되지 않았어요.'});
  const {name,contact,website='',source='result',cookie}=req.body||{};
  if(website)return res.status(200).json({ok:true});
  if(typeof name!=='string'||name.trim().length<1||name.trim().length>40||typeof contact!=='string'||contact.trim().length<2||contact.trim().length>120)return res.status(400).json({error:'Invalid waitlist entry'});
  const text=(value,max)=>typeof value==='string'?value.trim().slice(0,max):'';
  const list=value=>Array.isArray(value)?value.map(item=>text(item,80)).filter(Boolean).slice(0,2).join(', '):text(value,180);
  const savedCookie={
    cookieId:text(cookie?.cookieId,80),destination:text(cookie?.destination,80),travelDate:text(cookie?.travelDate,20),flavorId:text(cookie?.flavorId,40),flavorName:text(cookie?.flavorName,60),
    baseAnalysis:text(cookie?.baseAnalysis,4000),creamAnalysis:text(cookie?.creamAnalysis,4000),cubeAnalysis:text(cookie?.cubeAnalysis,4000),toppingAnalysis:text(cookie?.toppingAnalysis,4000),finalBake:text(cookie?.finalBake,4000),
    journeyPurpose:text(cookie?.journeyPurpose,120),purposeNote:text(cookie?.purposeNote,500),departureMood:text(cookie?.departureMood,120),departureNote:text(cookie?.departureNote,500),returnMood:text(cookie?.returnMood,120),returnNote:text(cookie?.returnNote,500),photoMoods:list(cookie?.photoMoods),air:text(cookie?.air,120),wind:text(cookie?.wind,120),answerVersion:Number(cookie?.answerVersion)||1,
    photosStored:false,storageVersion:2
  };
  if(!savedCookie.cookieId||!savedCookie.destination||!/^\d{4}-\d{2}$/.test(savedCookie.travelDate)||!savedCookie.flavorId||!savedCookie.flavorName||!savedCookie.baseAnalysis||!savedCookie.creamAnalysis||!savedCookie.cubeAnalysis||!savedCookie.toppingAnalysis||!savedCookie.finalBake)return res.status(400).json({error:'Invalid cookie record',message:'Cookie Jar에 담을 여행 기록이 완전하지 않아요.'});
  try{
    const fullUrl=rawWebhook.match(/https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/(?:exec|dev)/)?.[0];
    const deploymentId=!fullUrl&&/^[A-Za-z0-9_-]{30,}$/.test(rawWebhook.replace(/^['"]|['"]$/g,''))?rawWebhook.replace(/^['"]|['"]$/g,''):null;
    const webhook=(fullUrl||deploymentId&&`https://script.google.com/macros/s/${deploymentId}/exec`)?.replace(/\/dev$/,'/exec');
    if(!webhook)return res.status(500).json({error:'INVALID_WEBHOOK',message:'Google Sheets 연결 주소 형식이 올바르지 않아요.'});
    const response=await fetch(webhook,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:name.trim(),contact:contact.trim(),source:String(source).slice(0,30),createdAt:new Date().toISOString(),...savedCookie}),redirect:'follow'});
    const responseText=await response.text();
    if(!response.ok){console.error('Waitlist Google status',response.status);return res.status(502).json({error:'GOOGLE_DENIED',message:'Google Apps Script의 액세스 권한을 모든 사용자로 확인해 주세요.'})}
    let sheetResult;try{sheetResult=JSON.parse(responseText)}catch{sheetResult=null}
    if(!sheetResult?.ok){console.error('Waitlist script returned an invalid response');return res.status(502).json({error:'SHEET_SCRIPT_ERROR',message:'Google Sheets 스크립트 실행에 실패했어요. waitlist 탭 이름과 배포 코드를 확인해 주세요.'})}
    return res.status(200).json({ok:true});
  }catch(error){console.error('Waitlist connection error',error?.message||'unknown');return res.status(502).json({error:'CONNECTION_ERROR',message:'Google Sheets에 연결하지 못했어요. 웹 앱 URL이 /exec로 끝나는지 확인해 주세요.'});}
}
