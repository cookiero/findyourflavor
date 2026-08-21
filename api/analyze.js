const schema={
  type:'object',additionalProperties:false,
  properties:{
    flavor:{type:'string',enum:['Cotton Candy','Lemon Cream','Mango Soda','Matcha Latte','Midnight Choco']},
    location_guess:{type:'string'},location_confidence:{type:'string',enum:['confirmed_by_user','supported_by_exif','visual_guess','unknown']},
    photo_mood:{type:'string'},scene_observation:{type:'string'},warm_observation:{type:'string'},why_this_flavor:{type:'string'},travel_style:{type:'string'},season_note:{type:'string'},local_food_question:{type:'string'},closing_message:{type:'string'},
    base_keywords:{type:'array',items:{type:'string'},minItems:2,maxItems:3},cream_keywords:{type:'array',items:{type:'string'},minItems:2,maxItems:3},cube_keywords:{type:'array',items:{type:'string'},minItems:2,maxItems:3},topping_keywords:{type:'array',items:{type:'string'},minItems:2,maxItems:3},
    base_analysis:{type:'string'},cream_analysis:{type:'string'},cube_analysis:{type:'string'},topping_analysis:{type:'string'},final_bake:{type:'string'}
  },
  required:['flavor','location_guess','location_confidence','photo_mood','scene_observation','warm_observation','why_this_flavor','travel_style','season_note','local_food_question','closing_message','base_keywords','cream_keywords','cube_keywords','topping_keywords','base_analysis','cream_analysis','cube_analysis','topping_analysis','final_bake']
};

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI is not configured'});
  const {destination,date,images,palette,exif,curated,selectedFlavor,memory}=req.body||{};
  const allowedFlavors=['Cotton Candy','Lemon Cream','Mango Soda','Matcha Latte','Midnight Choco'];
  if(!destination||!date||!allowedFlavors.includes(selectedFlavor)||!Array.isArray(images)||images.length<1||images.length>3)return res.status(400).json({error:'Invalid request'});
  if(images.some(x=>typeof x!=='string'||x.length>4_000_000||!x.startsWith('data:image/')))return res.status(413).json({error:'Image is too large'});
  const prompt=`당신은 Cookie:Ro의 따뜻하고 세심한 여행 사진 큐레이터입니다. 사용자 입력과 사진을 함께 분석해 한국어로 답하세요.

사용자 입력 여행지: ${destination}
여행 시기: ${date}
사진 EXIF(없을 수 있음): ${JSON.stringify(exif||{})}
브라우저가 실제 픽셀로 계산한 색상 비율: ${JSON.stringify(palette||[])}
검수된 여행지 정보(있을 수 있음): ${JSON.stringify(curated||{})}
사진 색상 점수표로 이미 확정된 Flavor: ${selectedFlavor}
사용자가 직접 알려준 여행 기억(빈 값은 답하지 않은 항목): ${JSON.stringify(memory||{})}

규칙:
- 사진에서 실제로 보이는 장면, 빛, 구도, 활동만 근거로 쓰고 보이지 않는 사실은 꾸며내지 마세요.
- 사용자가 직접 고르거나 쓴 여행 목적·출발과 귀환의 기분·사진을 찍던 순간의 기분·공기·바람은 그 사람의 확정된 기억입니다. 비어 있지 않은 답은 사진 관찰과 자연스럽게 연결하되, 사진에서 그 답을 알아냈다고 말하지 마세요.
- BASE에는 여행 목적과 출발의 기분, CREAM에는 공기·바람과 반복되는 색, CUBE에는 사진을 찍던 순간의 기분, TOPPING에는 귀환의 기분과 여행의 리듬을 우선 활용하세요. 답하지 않은 항목은 억지로 채우지 마세요.
- 행복이나 감정은 단정하지 말고 '편안해 보여요', '즐거운 분위기가 느껴져요'처럼 조심스럽게 표현하세요.
- GPS가 없으면 장소를 확정하지 마세요. 사용자 입력은 confirmed_by_user, EXIF GPS는 supported_by_exif, 시각 추정은 visual_guess로 구분하세요.
- 계절은 여행지의 실제 기후와 입력 월을 기준으로 쓰세요. 북반구 기준 표현을 열대·남반구에 적용하지 마세요.
- 검수된 여행지 정보가 있으면 음식과 풍경에 우선 활용하세요. 없으면 필요할 때 웹 검색을 사용하되 불확실한 사실을 만들지 마세요.
- local_food_question은 그 지역의 구체적인 대표 음식 이름을 넣어 사람에게 다정하게 묻는 한두 문장이어야 합니다.
- 사진 픽셀 색상 비율은 이미 계산되었으므로 새 비율을 추측하지 마세요.
- 인종, 건강, 종교, 성적 지향, 정치 성향 같은 민감한 특성을 추정하지 마세요.
- Flavor는 이미 사진 픽셀의 고정 점수표로 ${selectedFlavor}로 확정되었습니다. 다른 Flavor를 고르거나 제안하지 말고 flavor 필드에도 반드시 정확히 ${selectedFlavor}를 쓰세요. 이후 모든 재료 분석은 이 Flavor의 고정 레시피만 사용하세요.
- 사용자에게 보여주는 글에는 AI, 분석, EXIF, GPS, 좌표, 메타데이터 같은 기술 용어나 정보 출처를 쓰지 마세요.
  - base_keywords, cream_keywords, cube_keywords, topping_keywords는 각각 긴 분석문을 3초 안에 훑어볼 수 있도록 요약하는 2~3개의 짧은 한국어 구절입니다. 각 구절은 공백 포함 2~10자, 문장부호·이모지·재료명 없이 작성하세요.
  - 키워드는 해당 분석문의 실제 근거와 정확히 일치해야 하며 서로 같은 표현을 반복하지 마세요. BASE는 여행의 온도와 태도, CREAM은 빛·색·공기, CUBE는 기억에 남은 장면, TOPPING은 움직임·속도·여운을 요약하세요.
  - base_analysis, cream_analysis, cube_analysis, topping_analysis가 결과의 핵심입니다. 절대로 짧은 요약으로 쓰지 마세요. 각 필드는 공백 포함 220~700자, 4~6개의 자연스러운 한국어 문장으로 작성하세요.
  - 각 필드마다 반드시 ① 어느 사진에서 무엇이 보였는지 알 수 있을 정도의 구체적인 시각 근거 2개 이상 ② 그 빛·색·질감·구도·움직임에서 받은 느낌과 여행 방식에 대한 해석 ③ 왜 다른 재료가 아니라 해당 재료의 맛·색·질감과 연결했는지를 충분히 설명하세요.
  - “밝아서 레몬”, “어두워서 초콜릿”처럼 단순하게 연결하지 마세요. 예를 들어 어두운 사진이라면 젖은 바닥의 반사, 건물 재질, 창문의 불빛, 인물의 움직임처럼 서로 다른 근거가 어떻게 코코아의 쌉싸름함이나 가나슈의 온기로 번역되는지 설명하세요.
  - 사진이 여러 장이면 한 장만 설명하지 말고 서로 다른 사진에서 반복되는 요소와 대비되는 요소를 함께 읽으세요. 단, 사진에 실제로 없는 사물·옷차림·표정·날씨·행동은 절대 만들지 마세요.
  - base_analysis는 여행 전체를 감싼 온도와 첫인상을 베이스의 굽기·묵직함·산뜻함으로, cream_analysis는 반복되는 색과 장면 사이의 온도 대비를 크림의 질감으로, cube_analysis는 유독 또렷하게 남은 구체적인 순간을 작은 맛의 포인트로, topping_analysis는 사진 사이에서 움직이고 멈추는 여행의 리듬과 마지막 여운으로 해석하세요. 같은 근거나 색을 네 필드에서 반복하지 마세요.
  - 모든 문장은 “사진을 설명했다”에서 끝나지 않고 “Cookie:Ro가 여행을 쿠키 레시피로 번역했다”는 인상을 주어야 합니다. 다정하지만 상투적이지 않고, 사용자가 자기 사진을 세심히 들여다봤다고 느낄 만큼 구체적으로 쓰세요.
  - final_bake는 앞의 네 분석만 압축해 여행 전체를 기억하게 만드는 3~4문장의 총정리입니다. 새로운 관찰은 추가하지 말고 베이스·크림·기억의 조각·토핑이 한 쿠키로 완성되는 흐름을 자연스럽게 엮으세요. 마지막 문장은 반드시 “이 여행의 맛은 [선택한 Flavor]예요.”로 끝내세요.
  - why_this_flavor는 이전 화면과의 호환성을 위한 2문장 이내의 짧은 요약으로만 작성하세요.
- Flavor별 고정 레시피는 다음과 같습니다. Cotton Candy: Pink Cloud Base, Blue Cloud Cream, Marshmallow Cubes, Rainbow Sprinkles. Lemon Cream: Fresh Morning Base, Cream Glaze, White Choco Cubes, Lemon Zest. Mango Soda: Sun-Kissed Base, Soda Cream, Mango Cubes, Popping Candy. Matcha Latte: Mellow Base, Latte Cream, White Choco Cubes, Roasted Choco Pearls. Midnight Choco: Deep Night Base, Chocolate Ganache, Brownie Cubes, Berry Popping Candy.
- 재료 이름을 합치거나 새로 만들지 말고 선택한 Flavor의 네 재료를 정확히 사용하세요. 같은 색 하나를 네 재료의 이유로 반복하지 말고, 사진에 없는 표정·옷차림·행동은 꾸며내지 마세요.
  - 마크다운, 제목, 번호, 별표를 필드 값에 쓰지 말고 따뜻하고 구체적인 한국어 분석문으로 작성하세요.`;
  const content=[{type:'input_text',text:prompt},...images.map(image_url=>({type:'input_image',image_url,detail:'auto'}))];
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5.6-luna',store:false,input:[{role:'user',content}],tools:[{type:'web_search'}],text:{format:{type:'json_schema',name:'cookiero_travel_analysis',strict:true,schema}}})});
    const data=await response.json();
    if(!response.ok)return res.status(response.status).json({error:'AI analysis failed',detail:data?.error?.message||'Unknown error'});
    const text=data.output?.flatMap(x=>x.content||[]).find(x=>x.type==='output_text')?.text;
    if(!text)throw new Error('No structured output');
    const analysis=JSON.parse(text);analysis.flavor=selectedFlavor;
    return res.status(200).json({analysis});
  }catch(error){return res.status(500).json({error:'Analysis unavailable',detail:error.message});}
}
