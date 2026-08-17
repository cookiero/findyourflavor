const schema={
  type:'object',additionalProperties:false,
  properties:{
    flavor:{type:'string',enum:['Cotton Candy','Lemon Cream','Mango Soda','Matcha Latte','Midnight Choco']},
    location_guess:{type:'string'},location_confidence:{type:'string',enum:['confirmed_by_user','supported_by_location','visual_guess','unknown']},
    photo_mood:{type:'string',description:'사진 전체의 온도와 리듬을 맛처럼 표현한 짧은 구절'},specific_place_observation:{type:'string',description:'장소 사실보다 그곳에서 느껴진 분위기를 중심으로 쓴 한 문장'},capture_time_note:{type:'string',description:'정확한 날짜나 시각 없이 사진에 보이는 빛의 결을 표현한 한 문장'},visual_ingredients:{type:'array',items:{type:'string'},minItems:3,maxItems:3},scene_observation:{type:'string',description:'장면 안의 대비와 리듬을 해석한 한 문장'},warm_observation:{type:'string',description:'사진 사이에 공통으로 남은 작은 분위기를 발견한 한 문장'},why_this_flavor:{type:'string',description:'결과의 핵심. 베이스, 크림, 첫 토핑, 두 번째 토핑, 여행의 시선, Flavor 완성, 마지막 여운을 각각 독립 문단으로 쓴 최소 18문장의 길고 섬세한 Cookie:Ro 편지'},travel_style:{type:'string',description:'사진에서 드러난 여행의 호흡을 한 문장으로 표현'},season_note:{type:'string',description:'계절의 공기와 빛이 남긴 감각을 한 문장으로 표현'},local_food_question:{type:'string'},closing_message:{type:'string',description:'오늘의 맛을 jar에 담아주는 한 문장'}
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
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI is not configured'});
  const {destination,date,images,palette,exif,curated}=req.body||{};
  if(!destination||!date||!Array.isArray(images)||images.length<1||images.length>5)return res.status(400).json({error:'Invalid request'});
  if(images.some(x=>typeof x!=='string'||x.length>1_500_000||!x.startsWith('data:image/')))return res.status(413).json({error:'Image is too large'});
  const flavorAnchor=stableFlavor(palette);
  const recipe=flavorRecipes[flavorAnchor];
  const gpsPlace=await resolveGpsPlace(exif);
  const timeHints=[...new Set((Array.isArray(exif)?exif:[]).map(item=>item?.time_hint).filter(item=>['morning','daylight','evening','night'].includes(item)))];
  const prompt=`당신은 Cookie:Ro의 따뜻하고 세심한 여행 사진 큐레이터입니다. 사용자 입력과 사진을 함께 분석해 자연스러운 한국어로 답하세요.

사용자 입력 여행지: ${destination}
여행 시기: ${date}
사진의 장소와 교차 확인할 비공개 장소 참고값(없을 수 있음): ${JSON.stringify(gpsPlace)}
사진의 빛과 교차 확인할 넓은 시간대 힌트(없거나 부정확할 수 있음): ${JSON.stringify(timeHints)}
브라우저가 실제 픽셀로 계산한 색상 비율: ${JSON.stringify(palette||[])}
검수된 여행지 정보(있을 수 있음): ${JSON.stringify(curated||{})}
색상 팔레트로 고정된 Flavor: ${flavorAnchor}
이번 Flavor의 고정 레시피: ${JSON.stringify(recipe)}

규칙:
- 사진에서 실제로 보이는 장면, 빛, 구도, 활동만 근거로 쓰고 보이지 않는 사실은 꾸며내지 마세요.
- 사용자가 올랜도라고 입력해도 사진에 디즈니월드의 성, 간판, 캐릭터처럼 구체적인 장소를 뒷받침하는 시각 단서가 보이면 그 세부 장소를 다정하게 언급하세요. 단서가 모호하면 장소 이름을 단정하지 마세요.
- 행복이나 감정은 단정하지 마세요. 표정, 몸짓, 조명, 색, 구도 같은 보이는 단서를 먼저 말한 뒤 '설렘이 느껴져요', '즐거운 분위기로 읽혀요'처럼 조심스럽게 표현하세요.
- 비공개 장소 참고값과 사진 속 시각 단서가 서로 일치할 때만 테마파크·랜드마크 같은 구체적인 장소를 자연스럽게 언급할 수 있습니다. 참고값이 없거나 서로 어긋나면 장소를 확정하지 마세요.
- 정확한 촬영 날짜와 시각은 제공되지 않습니다. 시간대 힌트는 카메라 설정이나 시차 때문에 틀릴 수 있는 약한 참고값입니다. 사진에 실제로 보이는 하늘·그림자·조명과 분명히 일치할 때만 아침, 한낮, 해 질 무렵, 밤처럼 넓고 자연스럽게 표현하고, 어긋나거나 애매하면 완전히 무시하세요.
- 정확한 연·월·일이나 06:17 같은 숫자 시각을 추측하거나 만들어내지 마세요. 사용자가 입력한 여행 월은 계절의 큰 맥락에만 사용하세요.
- capture_time_note는 '늦은 오후의 부드러운 빛이 장면의 가장자리를 크림처럼 감싸고 있어요.'처럼 빛이 사진에 남긴 느낌을 말하세요. '시간 정보에 따르면', '촬영 시각을 보니'처럼 근거를 설명하지 마세요.
- 중요: 사용자에게 보여주는 문장에는 기술 용어, 위치·시간 정보의 출처, 무언가를 읽거나 확인했다는 설명을 절대 쓰지 마세요. 장소를 알게 되었더라도 '아, 여기 롯데 뉴욕 팰리스네요.'처럼 자연스럽게 이야기를 시작하세요.
- specific_place_observation은 근거가 충분할 때 '아, 여기 디즈니 스프링스네요. 반짝이는 간판과 여름 저녁의 활기가 사진 안에 그대로 남아 있어요.'처럼 장소를 자연스럽게 알아본 다정한 첫 문장으로 쓰세요. 근거가 부족하면 구체적 장소를 만들어내지 마세요.
- capture_time_note에는 숫자 날짜·시각을 쓰지 말고, 사진과 힌트가 일치할 때만 넓은 시간대와 빛의 온도·여운을 자연스럽게 엮으세요.
- Cookie:Ro는 기능을 설명하는 도구가 아니라 여행을 맛으로 구워주는 큐레이터입니다. 항상 '보이는 장면 → 떠오른 색과 온도 → 쿠키 재료 → Flavor'의 흐름으로 말하세요.
- 문체는 여행을 함께 돌아보는 다정한 편지처럼 쓰세요. 짧은 사실을 나열하지 말고, 한 장면을 발견한 뒤 그날의 공기와 오래 남을 기억으로 천천히 이어가세요. '여행을 하다 보면 유명한 장소보다 이런 순간이 오래 기억에 남곤 하잖아요.', '나중에 다시 본다면 그때의 공기가 먼저 떠오를 것 같아요.'처럼 독자의 기억을 조심스럽게 열어주는 호흡을 사용하세요.
- 단, 분위기만 길게 감상하지 마세요. 결과의 중심은 사진이 실제 쿠키 레시피로 변하는 과정이어야 합니다. 고정 레시피의 base, cream, topping1, topping2를 모두 정확한 이름으로 언급하고, 각각을 왜 골랐는지 사진 속 서로 다른 근거를 하나씩 연결하세요.
- 재료 설명은 반드시 '사진 속 ○○한 모습에서 [베이스]를 가져왔고 → ○○한 색과 빛을 보고 [크림]으로 채웠고 → ○○한 움직임·옷차림·작은 장면에서 [토핑 1]이 떠올랐고 → ○○한 달콤한 여운을 [토핑 2]로 마지막에 올렸다'는 네 단계가 빠짐없이 읽혀야 합니다.
- 레시피의 clue는 선택 가능한 방향이지 사진에 없는데도 써야 하는 사실이 아닙니다. 사람이 없는 풍경 사진이라면 표정·옷차림·발걸음을 꾸며내지 말고, 구도·빛·물결·나뭇잎·건축물의 움직임과 질감으로 같은 재료의 이유를 찾으세요.
- 각 재료의 근거를 반복하지 마세요. 같은 '노란색' 하나로 베이스와 크림과 토핑을 모두 설명하지 말고, 베이스는 장면 전체의 정서, 크림은 중심 색과 빛, 첫 토핑은 움직임이나 눈에 띄는 디테일, 두 번째 토핑은 마지막에 남은 작은 반짝임과 여운에 연결하세요.
- 결과의 중심은 장소를 맞히는 것이 아니라 사진이 쿠키의 네 가지 재료로 구워지는 과정입니다. 장소명과 건축 양식 같은 사실을 첫 문장에서 길게 나열하지 마세요. 사용자가 눈으로 이미 아는 대상을 반복 설명하는 대신, 그 장면이 어떤 온도·호흡·여운을 만들었고 그것이 왜 특정 재료가 되었는지를 깊게 풀어주세요.
- 전체 감정적 밀도의 80% 이상을 why_this_flavor에 사용하세요. 장소·여행 스타일·계절·음식 등 나머지 설명은 각각 한 문장으로 절제하세요.
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
- why_this_flavor 하나에 완성된 장문 편지를 쓰세요. 반드시 빈 줄로 구분한 7개 문단, 최소 18문장으로 작성하세요.
- 1문단은 사진 여러 장을 관통하는 감정과 구체적인 장면 2개 이상을 발견하고 정확한 베이스 재료가 된 이유를 4문장 이상으로 설명하세요.
- 2문단은 여러 사진에서 반복되는 색·빛·온도·질감을 짚고 정확한 크림 재료가 된 이유를 4문장 이상으로 설명하세요.
- 3문단은 움직임·옷차림·표정·사물의 작은 포인트를 2개 이상 짚고 정확한 첫 토핑이 된 이유를 4문장 이상으로 설명하세요.
- 4문단은 반사광·작은 빛·색의 여운처럼 뒤늦게 발견되는 단서를 2개 이상 짚고 정확한 두 번째 토핑이 된 이유를 4문장 이상으로 설명하세요.
- 5문단은 사진 전체에서 느껴지는 여행자의 시선과 오래 기억될 순간을 2~3문장으로 돌아보세요. 6문단은 네 재료가 차례로 숨어 있는 정확한 Flavor로 구워졌다는 결론을 2문장으로 쓰세요. 7문단은 나중에 사진을 다시 펼쳤을 때 떠오를 감정과 Cookie:Ro의 다정한 한 문장, 쿠키 이모지로 끝내세요.
- 장소와 사물을 맞힌 사실은 재료를 설명하기 위한 근거로만 짧게 쓰고, 문장의 대부분을 감정·기억·맛의 질감을 연결하는 데 사용하세요. 첫 문단은 '사진 속 여행은 밝은 풍경보다 밤이 깊어진 뒤의 도시를 오래 바라본 순간들을 더 많이 품고 있어요.'처럼 사진 여러 장을 관통하는 감정으로 시작하세요. 문단 전환은 '그 위에는 초콜릿 가나슈를 두껍게 채웠어요.', '그런데 이 사진들은 마냥 차분하고 어둡지만은 않아요.', '마지막에는 솔트 크리스털을 조금 흩뿌렸어요.'처럼 자연스럽게 이어가세요.
- 마크다운을 사용하지 마세요. Flavor나 장소 이름 앞뒤에 별표 두 개, 밑줄, 제목 기호를 붙이지 말고 일반 문장으로만 작성하세요.
- 재료 이름을 합치거나 새로 만들지 마세요. 예를 들어 Lemon Cream의 '레몬 크림'과 '레몬 제스트'를 '레몬 제스트 글레이즈'로 바꾸면 안 됩니다. 베이스·크림·첫 토핑·두 번째 토핑은 반드시 서로 독립된 네 재료여야 합니다.
- closing_message는 결과 요약을 반복하지 말고 '오늘의 반짝임은 바삭한 가장자리까지 잘 구워서 jar에 담아둘게요.'처럼 Cookie:Ro가 직접 쿠키를 건네는 말로 끝내세요.
- 표현은 실행마다 조금 달라도 괜찮지만 specific_place_observation, visual_ingredients, why_this_flavor, closing_message의 사실 근거와 핵심 메시지는 서로 모순되지 않아야 합니다.`;
  const content=[{type:'input_text',text:prompt},...images.map(image_url=>({type:'input_image',image_url,detail:'auto'}))];
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5.6-luna',store:false,max_output_tokens:7000,input:[{role:'user',content}],text:{format:{type:'json_schema',name:'cookiero_travel_analysis',strict:true,schema}}})});
    const data=await response.json();
    if(!response.ok)return res.status(response.status).json({error:'AI analysis failed',detail:data?.error?.message||'Unknown error'});
    const text=data.output?.flatMap(x=>x.content||[]).find(x=>x.type==='output_text')?.text;
    if(!text)throw new Error('No structured output');
    return res.status(200).json({analysis:keepTheMagic(JSON.parse(text))});
  }catch(error){return res.status(500).json({error:'Analysis unavailable',detail:error.message});}
}
