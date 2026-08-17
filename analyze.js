const schema={
  type:'object',additionalProperties:false,
  properties:{
    flavor:{type:'string',enum:['Cotton Candy','Lemon Cream','Mango Soda','Matcha Latte','Midnight Choco']},
    why_this_flavor:{type:'string',description:'결과의 핵심. 베이스, 크림, 첫 토핑, 두 번째 토핑, 여행의 시선, Flavor 완성, 마지막 여운을 각각 독립 문단으로 충분히 길고 섬세하게 쓴 Cookie:Ro 편지'}
  },
  required:['flavor','why_this_flavor']
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

const flavorRecipes={
  'Lemon Cream':{
    base:'버터 쿠키 베이스',baseClues:'편안한 표정, 여유로운 구도, 따뜻한 건물색처럼 여행 전체를 부드럽게 받쳐주는 모습',
    cream:'레몬 크림',creamClues:'햇살을 머금은 노랑·아이보리·크림색과 맑고 환한 빛',
    topping1:'레몬 제스트',topping1Clues:'가벼운 발걸음, 산뜻한 옷차림, 바람에 흔들리는 머리카락처럼 생기 있는 움직임',
    topping2:'슈가 크럼',topping2Clues:'웃는 표정, 반짝이는 장식, 빛이 톡톡 맺힌 장면처럼 여행에 남은 달콤한 순간'
  },
  'Mango Soda':{
    base:'망고 쿠키 베이스',baseClues:'강한 햇살, 선명한 주황·노랑, 여행을 온몸으로 즐기는 활기찬 모습',
    cream:'소다 크림',creamClues:'파란 하늘, 물, 유리창의 반사광처럼 시원하게 열린 장면',
    topping1:'망고 큐브',topping1Clues:'과감한 색의 옷차림, 풍성한 음식, 열대 식물처럼 눈에 확 들어오는 즐거운 요소',
    topping2:'팝핑 캔디',topping2Clues:'뛰거나 춤추는 순간, 장난스러운 포즈, 즉흥적인 방향 전환처럼 경쾌한 움직임'
  },
  'Cotton Candy':{
    base:'바닐라 쿠키 베이스',baseClues:'함께 있는 사람을 향한 시선, 부드러운 표정, 포근한 색처럼 다정한 여행의 바탕',
    cream:'솜사탕 크림',creamClues:'분홍·하늘·라벤더색, 구름, 노을처럼 꿈결같이 섞이는 색',
    topping1:'핑크 슈가',topping1Clues:'귀여운 옷차림과 소품, 캐릭터, 디저트처럼 사랑스러운 취향이 드러나는 부분',
    topping2:'별 스프링클',topping2Clues:'반짝이는 조명, 놀이공원 장식, 손짓과 웃음처럼 설렘이 톡톡 드러나는 순간'
  },
  'Midnight Choco':{
    base:'다크 코코아 쿠키 베이스',baseClues:'깊은 그림자, 묵직한 건축물, 차분하고 영화처럼 여백이 있는 장면',
    cream:'초콜릿 가나슈',creamClues:'짙은 갈색·검정·버건디와 밤의 조명처럼 풍부하고 깊은 색',
    topping1:'베리 크럼',topping1Clues:'어두운 장면 속 붉은 간판, 옷의 포인트, 네온처럼 예상 밖으로 나타난 선명한 색',
    topping2:'솔트 크리스털',topping2Clues:'빗물의 반사, 유리창의 빛, 야경의 작은 불빛처럼 어둠 속에서 또렷하게 반짝이는 순간'
  },
  'Matcha Latte':{
    base:'말차 쿠키 베이스',baseClues:'나무, 정원, 숲길, 오래 머물러 찍은 풍경처럼 여행의 속도를 낮춰주는 장면',
    cream:'밀크 크림',creamClues:'흐린 하늘, 부드러운 햇빛, 흰색·베이지색 옷처럼 초록 사이에 편안함을 더하는 색',
    topping1:'피스타치오 크럼',topping1Clues:'잎마다 다른 초록, 이끼, 정원의 작은 질감처럼 자세히 바라봐야 발견되는 요소',
    topping2:'잎사귀 슈가',topping2Clues:'천천히 걷는 뒷모습, 벤치에 머문 순간, 바람이 스치는 옷자락처럼 고요한 움직임'
  }
};

function keepTheMagic(value){
  if(Array.isArray(value))return value.map(keepTheMagic);
  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,keepTheMagic(item)]));
  if(typeof value!=='string')return value;
  const forbidden=/(?:EXIF|GPS|메타데이터|위치\s*데이터|좌표|위도|경도|촬영\s*(?:정보|시각|시간|일시)|카메라\s*(?:정보|기록)|파일\s*(?:정보|수정)|정보(?:를|을)?\s*(?:읽|확인)|데이터(?:를|을)?\s*(?:읽|확인))/i;
  const safe=value
    .replace(/\r?\n{2,}/g,' §PARAGRAPH§ ')
    .replace(/\*\*/g,'')
    .replace(/\r?\n/g,' ')
    .split(/(?<=[.!?。]|요\.|다\.)\s+|(?<=요)(?=[가-힣A-Z])/)
    .filter(sentence=>!forbidden.test(sentence))
    .join(' ')
    .replace(/\b\d{4}[-./년]\s*\d{1,2}[-./월]\s*\d{1,2}(?:일)?(?:\s*(?:오전|오후)?\s*\d{1,2}[:시]\d{0,2}(?::\d{2})?)?/g,'')
    .replace(/AI(?:가|는|로|를|의)?\s*(?:사진\s*)?분석(?:을|이|으로|한|하면)?/gi,'Cookie:Ro가 사진을 읽어')
    .replace(/이미지\s*분석(?:을|이|으로|한|하면)?/gi,'사진에서 발견한 장면')
    .replace(/\s{2,}/g,' ').replace(/\s*§PARAGRAPH§\s*/g,'\n\n').trim();
  return safe||'사진에 남은 빛과 색을 천천히 맛으로 옮겨 보았어요.';
}

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'Flavor letter is not configured'});
  const {destination,date,images,palette,exif}=req.body||{};
  if(!destination||!date||!Array.isArray(images)||images.length<1||images.length>3)return res.status(400).json({error:'Invalid request'});
  if(images.some(x=>typeof x!=='string'||x.length>1_500_000||!x.startsWith('data:image/')))return res.status(413).json({error:'Image is too large'});
  const flavorAnchor=stableFlavor(palette);
  const recipe=flavorRecipes[flavorAnchor];
  const locationHints=(Array.isArray(exif)?exif:[]).map(item=>({latitude:Number.isFinite(item?.latitude)?item.latitude:null,longitude:Number.isFinite(item?.longitude)?item.longitude:null,time_hint:item?.time_hint||null}));
  const prompt=`당신은 여행 사진을 쿠키 레시피로 번역하는 Cookie:Ro의 다정한 편지 작가입니다.

여행지: ${destination}
여행 시기: ${date}
사진과 일치할 때만 조용히 참고할 위치 단서: ${JSON.stringify(locationHints)}
사진 픽셀에서 직접 추출한 색과 비율: ${JSON.stringify(palette||[])}
반드시 유지할 Flavor: ${flavorAnchor}
반드시 사용할 고정 레시피: ${JSON.stringify(recipe)}

출력은 flavor와 why_this_flavor 두 항목뿐입니다. flavor는 반드시 '${flavorAnchor}'로 쓰세요.

why_this_flavor는 빈 줄로 구분된 7개 문단으로 충분히 길고 감성적인 한국어 편지를 작성하세요.
1문단은 사진 전체를 관통하는 감정과 실제 장면을 2개 이상 짚고, 왜 '${recipe.base}'가 첫맛이 되었는지 4문장 이상 설명합니다.
2문단은 반복되는 색·빛·온도·질감을 2개 이상 짚고, 왜 '${recipe.cream}'을 채웠는지 4문장 이상 설명합니다.
3문단은 실제로 보이는 움직임·옷차림·표정·사물의 포인트를 2개 이상 짚고, 왜 '${recipe.topping1}'을 올렸는지 4문장 이상 설명합니다.
4문단은 반사광·작은 빛·색의 여운처럼 뒤늦게 발견되는 단서를 2개 이상 짚고, 왜 '${recipe.topping2}'로 마무리했는지 4문장 이상 설명합니다.
5문단은 사진 전체에 공통으로 남은 여행자의 시선과 오래 기억될 순간을 2~3문장으로 돌아봅니다.
6문단은 네 재료가 차례로 숨어 있는 '${flavorAnchor}'로 구워진 이유를 2문장으로 맺습니다.
7문단은 나중에 사진을 다시 펼쳤을 때 먼저 떠오를 감정을 1~2문장과 쿠키 이모지로 끝냅니다.

장소나 사물을 맞힌 사실보다 감정·기억·맛의 질감이 중심이어야 합니다. 사진에 없는 사람·표정·옷차림은 꾸며내지 마세요. 같은 색 하나를 네 재료의 근거로 반복하지 마세요. 장소 정보의 출처나 기술 용어를 말하지 마세요. 정확한 촬영 날짜와 숫자 시각을 쓰지 마세요. 재료 이름을 합치거나 새로 만들지 말고 '${recipe.base}', '${recipe.cream}', '${recipe.topping1}', '${recipe.topping2}'를 각각 정확히 사용하세요. 마크다운과 별표를 사용하지 마세요. 보고서가 아니라 여행을 함께 돌아보는 사람의 따뜻한 말투로 쓰세요.`;
  const content=[{type:'input_text',text:prompt},...images.map(image_url=>({type:'input_image',image_url,detail:'auto'}))];
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5.6-luna',store:false,input:[{role:'user',content}],tools:[{type:'web_search'}],text:{format:{type:'json_schema',name:'cookiero_flavor_letter',strict:true,schema}}})});
    const data=await response.json();
    if(!response.ok)return res.status(response.status).json({error:'Flavor letter failed',detail:data?.error?.message||'Unknown error'});
    const text=data.output?.flatMap(item=>item.content||[]).find(item=>item.type==='output_text')?.text;
    if(!text)throw new Error('No flavor letter returned');
    return res.status(200).json({analysis:keepTheMagic(JSON.parse(text))});
  }catch(error){return res.status(500).json({error:'Flavor letter unavailable',detail:error.message});}
}
