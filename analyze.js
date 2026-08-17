const schema={
  type:'object',additionalProperties:false,
  properties:{
    flavor:{type:'string',enum:['Cotton Candy','Lemon Cream','Mango Soda','Matcha Latte','Midnight Choco']},
    location_guess:{type:'string'},location_confidence:{type:'string',enum:['confirmed_by_user','supported_by_exif','visual_guess','unknown']},
    photo_mood:{type:'string',description:'사진 전체의 온도와 리듬을 맛처럼 표현한 짧은 구절'},specific_place_observation:{type:'string',description:'장소 사실은 한 절만 쓰고 곧바로 그곳에서 느껴지는 분위기로 이어지는 다정한 첫 문장'},capture_time_note:{type:'string',description:'기술 출처 없이 계절과 시간대가 만든 빛의 분위기를 감각적으로 표현'},visual_ingredients:{type:'array',items:{type:'string'},minItems:3,maxItems:3},scene_observation:{type:'string',description:'보이는 대상을 나열하지 말고 장면 속 대비와 리듬이 어떤 인상을 만드는지 해석'},warm_observation:{type:'string',description:'사용자가 미처 이름 붙이지 않았을 법한 사진의 작은 분위기를 근거 있게 발견'},why_this_flavor:{type:'string',description:'장면의 분위기가 빛과 색을 거쳐 쿠키 재료와 Flavor가 되는 과정을 3문장으로 서술'},travel_style:{type:'string',description:'사람의 성격을 진단하지 않고 선택한 사진에서 드러난 여행의 호흡과 시선을 표현'},season_note:{type:'string',description:'날씨 정보를 전달하지 말고 그 계절의 공기와 빛이 사진에 남긴 감각을 표현'},local_food_question:{type:'string'},closing_message:{type:'string',description:'오늘의 맛을 다정하게 jar에 담아주는 Cookie:Ro의 짧은 마무리'}
  },
  required:['flavor','location_guess','location_confidence','photo_mood','specific_place_observation','capture_time_note','visual_ingredients','scene_observation','warm_observation','why_this_flavor','travel_style','season_note','local_food_question','closing_message']
};

function stableFlavor(palette){
  const scores={cotton:0,lemon:0,mango:0,matcha:0,midnight:0};
  for(const item of Array.isArray(palette)?palette:[]){
    const hex=String(item?.[1]||'').replace('#','');if(!/^[0-9a-f]{6}$/i.test(hex))continue;
    const weight=Number(item?.[2])||0,r=parseInt(hex.slice(0,2),16)/255,g=parseInt(hex.slice(2,4),16)/255,b=parseInt(hex.slice(4,6),16)/255;
    const max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min,light=(max+min)/2,sat=delta/(1-Math.abs(2*light-1)||1);let hue=0;
    if(delta){if(max===r)hue=60*(((g-b)/delta)%6);else if(max===g)hue=60*((b-r)/delta+2);else hue=60*((r-g)/delta+4);if(hue<0)hue+=360;}
    if(light<.34)scores.midnight+=weight*(1.3-light);
    if(hue>=70&&hue<175)scores.matcha+=weight*(.6+sat);
    if(hue>=18&&hue<58&&sat>.28)scores.mango+=weight*(.55+sat);
    if((hue>=285||hue<10)&&sat>.22)scores.cotton+=weight*(.5+sat);
    if(light>.58)scores.lemon+=weight*(.5+light)+(sat<.2?weight*.2:0);
  }
  const key=Object.entries(scores).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))[0]?.[0]||'lemon';
  return {cotton:'Cotton Candy',lemon:'Lemon Cream',mango:'Mango Soda',matcha:'Matcha Latte',midnight:'Midnight Choco'}[key];
}

async function resolveGpsPlace(exif){
  const point=(Array.isArray(exif)?exif:[]).find(item=>Number.isFinite(item?.latitude)&&Number.isFinite(item?.longitude));
  if(!point)return null;
  const lat=Math.max(-90,Math.min(90,point.latitude)),lon=Math.max(-180,Math.min(180,point.longitude));
  try{
    const response=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&zoom=18&addressdetails=1`,{headers:{'User-Agent':'CookieRo-FindYourFlavor/1.0','Accept-Language':'ko,en;q=0.8'}});
    if(!response.ok)return null;const data=await response.json();
    return {display_name:String(data?.display_name||'').slice(0,500),name:String(data?.name||'').slice(0,160),category:String(data?.category||''),type:String(data?.type||''),address:data?.address||{}};
  }catch{return null;}
}

function keepTheMagic(value){
  if(Array.isArray(value))return value.map(keepTheMagic);
  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,keepTheMagic(item)]));
  if(typeof value!=='string')return value;
  return value
    .replace(/EXIF(?:\s*정보|\s*데이터)?(?:를|을|에서|상|으로)?/gi,'사진에 남은 시간의 단서를')
    .replace(/GPS(?:\s*정보|\s*좌표|\s*데이터)?(?:를|을|에서|상|으로)?/gi,'장소의 단서를')
    .replace(/메타데이터(?:를|을|에서|상|로)?/g,'사진 속 단서를')
    .replace(/AI(?:가|는|로|를|의)?\s*(?:사진\s*)?분석(?:을|이|으로|한|하면)?/gi,'Cookie:Ro가 사진을 읽어')
    .replace(/이미지\s*분석(?:을|이|으로|한|하면)?/gi,'사진에서 발견한 장면')
    .replace(/\s{2,}/g,' ').trim();
}

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI is not configured'});
  const {destination,date,images,palette,exif,curated}=req.body||{};
  if(!destination||!date||!Array.isArray(images)||images.length<1||images.length>2)return res.status(400).json({error:'Invalid request'});
  if(images.some(x=>typeof x!=='string'||x.length>4_000_000||!x.startsWith('data:image/')))return res.status(413).json({error:'Image is too large'});
  const flavorAnchor=stableFlavor(palette);
  const gpsPlace=await resolveGpsPlace(exif);
  const safeExif=(Array.isArray(exif)?exif:[]).map(item=>({taken_at:item?.taken_at||null,camera:item?.camera||null,has_gps:Number.isFinite(item?.latitude)&&Number.isFinite(item?.longitude)}));
  const prompt=`당신은 Cookie:Ro의 따뜻하고 세심한 여행 사진 큐레이터입니다. 사용자 입력과 사진을 함께 분석해 자연스러운 한국어로 답하세요.

사용자 입력 여행지: ${destination}
여행 시기: ${date}
사진 EXIF 촬영 정보(없을 수 있음): ${JSON.stringify(safeExif)}
GPS 좌표를 서버에서 장소명으로 변환한 결과(없을 수 있음): ${JSON.stringify(gpsPlace)}
브라우저가 실제 픽셀로 계산한 색상 비율: ${JSON.stringify(palette||[])}
검수된 여행지 정보(있을 수 있음): ${JSON.stringify(curated||{})}
색상 팔레트로 고정된 Flavor: ${flavorAnchor}

규칙:
- 사진에서 실제로 보이는 장면, 빛, 구도, 활동만 근거로 쓰고 보이지 않는 사실은 꾸며내지 마세요.
- 사용자가 올랜도라고 입력해도 사진에 디즈니월드의 성, 간판, 캐릭터처럼 구체적인 장소를 뒷받침하는 시각 단서가 보이면 그 세부 장소를 다정하게 언급하세요. 단서가 모호하면 장소 이름을 단정하지 마세요.
- 행복이나 감정은 단정하지 마세요. 표정, 몸짓, 조명, 색, 구도 같은 보이는 단서를 먼저 말한 뒤 '설렘이 느껴져요', '즐거운 분위기로 읽혀요'처럼 조심스럽게 표현하세요.
- GPS 장소명과 사진 속 시각 단서가 일치하면 location_confidence를 supported_by_exif로 두고 테마파크·랜드마크 같은 구체적인 장소를 언급할 수 있습니다. GPS가 없으면 장소를 확정하지 마세요. 사용자 입력만 있으면 confirmed_by_user, 시각 추정만 있으면 visual_guess로 구분하세요.
- EXIF taken_at이 있으면 촬영된 현지 시각의 오전/낮/해질녘/밤을 장면의 실제 빛과 교차 확인해 capture_time_note에 반영하세요. EXIF 시각과 사진의 빛이 충돌하거나 타임존을 알 수 없으면 정확한 시각을 단정하지 마세요. file_modified는 촬영 시각으로 취급하지 마세요.
- 중요: 사용자에게 보여주는 어떤 문장에도 AI, 분석, EXIF, GPS, 좌표, 메타데이터, 데이터라는 기술 용어를 절대 쓰지 마세요. 이 정보들은 뒤에서만 조용히 참고하세요.
- specific_place_observation은 근거가 충분할 때 '아, 여기 디즈니 스프링스네요. 반짝이는 간판과 여름 저녁의 활기가 사진 안에 그대로 남아 있어요.'처럼 장소를 자연스럽게 알아본 다정한 첫 문장으로 쓰세요. 근거가 부족하면 구체적 장소를 만들어내지 마세요.
- capture_time_note는 '7월 한여름의 오후빛 속에서 예쁜 장면을 남기셨네요.'처럼 계절과 시간의 분위기로만 말하세요. 정보를 어디에서 읽었는지 설명하지 마세요.
- Cookie:Ro는 기능을 설명하는 도구가 아니라 여행을 맛으로 구워주는 큐레이터입니다. 항상 '보이는 장면 → 떠오른 색과 온도 → 쿠키 재료 → Flavor'의 흐름으로 말하세요.
- 결과의 목표는 사진 속 사실을 맞히는 것이 아닙니다. 사용자가 눈으로 이미 아는 대상과 색을 반복 설명하지 말고, 그 단서들이 함께 만들고 있는 온도·호흡·여운을 새롭게 이름 붙여 주세요.
- 장소명, 월, 시간대 같은 사실 전달은 전체 답변의 20% 이내로 제한하세요. 나머지는 분위기의 해석, 감각적인 번역, 그 재료를 선택한 배경에 사용하세요.
- '건물이 보입니다', '초록색이 많습니다', '7월에 촬영되었습니다'처럼 보고서 같은 문장을 금지합니다. 대신 '짙은 초록이 장면의 속도를 천천히 낮춰줘요', '한여름의 빛이 가장자리까지 바삭하게 익혀주고 있어요'처럼 색과 빛이 장면에서 하는 역할을 말하세요.
- scene_observation은 사물 목록이 아니라 장면 안의 대비와 리듬을 2문장으로 해석하세요. warm_observation은 크고 뻔한 특징보다 사진 사이에 공통으로 남은 작은 분위기를 한 가지 발견하세요.
- travel_style은 '당신은 ~한 사람'이라고 진단하지 말고 '선택한 사진들에서는 ~에 머문 장면이 더 눈에 띄어요'처럼 사진에 한정하세요.
- 계절은 여행지의 실제 기후와 입력 월을 기준으로 쓰세요. 북반구 기준 표현을 열대·남반구에 적용하지 마세요.
- 검수된 여행지 정보가 있으면 음식과 풍경에 우선 활용하세요. 없으면 필요할 때 웹 검색을 사용하되 불확실한 사실을 만들지 마세요.
- local_food_question은 그 지역의 구체적인 대표 음식 이름을 넣어 사람에게 다정하게 묻는 한두 문장이어야 합니다.
- 사진 픽셀 색상 비율은 이미 계산되었으므로 새 비율을 추측하지 마세요.
- 인종, 건강, 종교, 성적 지향, 정치 성향 같은 민감한 특성을 추정하지 마세요.
- flavor는 변형하거나 재선택하지 말고 반드시 '${flavorAnchor}'로 출력하세요. 이는 같은 사진을 다시 분석했을 때 핵심 결과를 일관되게 유지하기 위한 고정 규칙입니다.
- visual_ingredients는 단순 색 이름이 아니라 그 색이 만든 느낌까지 포함해 '한여름 끝에 남은 오렌지빛 열기 → 톡 터지는 Mango zest'처럼 시각 단서에서 쿠키 재료로 번역하세요.
- why_this_flavor는 장소나 활동의 사실을 첫 절에서만 짧게 짚고, 그 장면의 온도와 리듬 → 떠오른 쿠키 재료 → Flavor의 순서로 정확히 3문장을 쓰세요. 사용자가 '내 사진을 이렇게 맛으로도 읽을 수 있구나'라고 느껴야 합니다.
- closing_message는 결과 요약을 반복하지 말고 '오늘의 반짝임은 바삭한 가장자리까지 잘 구워서 jar에 담아둘게요.'처럼 Cookie:Ro가 직접 쿠키를 건네는 말로 끝내세요.
- 표현은 실행마다 조금 달라도 괜찮지만 specific_place_observation, visual_ingredients, why_this_flavor, closing_message의 사실 근거와 핵심 메시지는 서로 모순되지 않아야 합니다.`;
  const content=[{type:'input_text',text:prompt},...images.map(image_url=>({type:'input_image',image_url,detail:'auto'}))];
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5.6-luna',store:false,input:[{role:'user',content}],tools:[{type:'web_search'}],text:{format:{type:'json_schema',name:'cookiero_travel_analysis',strict:true,schema}}})});
    const data=await response.json();
    if(!response.ok)return res.status(response.status).json({error:'AI analysis failed',detail:data?.error?.message||'Unknown error'});
    const text=data.output?.flatMap(x=>x.content||[]).find(x=>x.type==='output_text')?.text;
    if(!text)throw new Error('No structured output');
    return res.status(200).json({analysis:keepTheMagic(JSON.parse(text))});
  }catch(error){return res.status(500).json({error:'Analysis unavailable',detail:error.message});}
}
