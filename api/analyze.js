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
  const {destination,date,palette,curated,selectedFlavor,memory}=req.body||{};
  const allowedFlavors=['Cotton Candy','Lemon Cream','Mango Soda','Matcha Latte','Midnight Choco'];
  if(!destination||!date||!allowedFlavors.includes(selectedFlavor)||!Array.isArray(palette)||!palette.length)return res.status(400).json({error:'Invalid request'});
  const prompt=`당신은 Cookie:Ro의 다정한 여행 베이커입니다. 사용자 입력과 브라우저가 사진에서 계산한 색상 신호를 함께 살펴 여행을 쿠키의 네 레이어로 번역해 한국어로 답하세요. 심리검사 보고서가 아니라 여행에서 돌아온 친구와 사진을 같이 넘겨보며 건네는 말처럼 부드럽고 비단정적으로 쓰세요.

사용자 입력 여행지: ${destination}
여행 시기: ${date}
브라우저가 실제 픽셀로 계산한 색상 비율: ${JSON.stringify(palette||[])}
검수된 여행지 정보(있을 수 있음): ${JSON.stringify(curated||{})}
사진 색상 점수표로 이미 확정된 Flavor: ${selectedFlavor}
사용자가 직접 알려준 여행 기억(빈 값은 답하지 않은 항목): ${JSON.stringify(memory||{})}

규칙:
- 사진 원본은 제공되지 않습니다. 색상 비율에서 실제로 확인되는 대표색과 밝고 어두운 정도만 근거로 쓰고, 사진 속 사물·사람·장소·구도·활동·날씨를 추측하지 마세요.
- 사용자의 자유서술을 따옴표로 인용하거나 어순만 바꿔 복창하지 마세요. 문장 뒤에 담긴 여행의 의미와 감정적 흐름을 소화해 자연스럽게 이야기하세요.
- 객관식에서만 받은 정보는 그 선택이 허용하는 추상적인 해석까지만 사용하세요. 사용자나 사진이 제공하지 않은 사람·사건·장소·날씨·행동·감정을 만들어내지 마세요.
- 사용자가 각 레이어에서 직접 고르거나 쓴 기억과 resolvedChoices는 그 사람의 확정된 입력입니다. 비어 있지 않은 답은 사진 관찰과 자연스럽게 연결하되, 사진에서 그 답을 알아냈다고 말하지 마세요.
- BASE에는 base와 baseNote, CREAM에는 cream과 creamNote, CUBE에는 cube와 cubeNote, TOPPING에는 topping과 toppingNote를 우선 활용하세요. resolvedChoices가 있으면 자유서술을 네 선택지 중 가장 가까운 결로 분류한 결과이므로 해당 레이어 해석에 함께 반영하세요.
- 행복이나 감정은 단정하지 말고 '편안해 보여요', '즐거운 분위기가 느껴져요'처럼 조심스럽게 표현하세요.
- 여행지는 사용자가 직접 입력한 정보로만 다루고 location_confidence는 confirmed_by_user로 쓰세요.
- 계절은 여행지의 실제 기후와 입력 월을 기준으로 쓰세요. 북반구 기준 표현을 열대·남반구에 적용하지 마세요.
- 검수된 여행지 정보가 있으면 음식과 풍경에 우선 활용하세요. 없으면 필요할 때 웹 검색을 사용하되 불확실한 사실을 만들지 마세요.
- local_food_question은 그 지역의 구체적인 대표 음식 이름을 넣어 사람에게 다정하게 묻는 한두 문장이어야 합니다.
- 사진 픽셀 색상 비율은 이미 계산되었으므로 새 비율을 추측하지 마세요.
- 인종, 건강, 종교, 성적 지향, 정치 성향 같은 민감한 특성을 추정하지 마세요.
- Flavor는 이미 사진 픽셀의 고정 점수표로 ${selectedFlavor}로 확정되었습니다. 다른 Flavor를 고르거나 제안하지 말고 flavor 필드에도 반드시 정확히 ${selectedFlavor}를 쓰세요. 이후 모든 재료 분석은 이 Flavor의 고정 레시피만 사용하세요.
- 사용자에게 보여주는 글에는 AI, 분석, EXIF, GPS, 좌표, 메타데이터 같은 기술 용어나 정보 출처를 쓰지 마세요.
  - base_keywords, cream_keywords, cube_keywords, topping_keywords는 각각 사용자의 해당 답과 제공된 색상 신호를 소화해 만든 2~3개의 짧은 한국어 구절입니다. 각 구절은 공백 포함 2~10자, 문장부호·이모지·재료명 없이 작성하세요. 재료마다 정해진 고정 키워드를 반복하지 마세요.
  - 키워드는 해당 분석문의 실제 근거와 정확히 일치해야 하며 서로 같은 표현을 반복하지 마세요. BASE는 여행의 온도와 태도, CREAM은 빛·색·공기, CUBE는 기억에 남은 장면, TOPPING은 움직임·속도·여운을 요약하세요.
  - base_analysis, cream_analysis, cube_analysis, topping_analysis가 결과의 핵심입니다. 절대로 짧은 요약으로 쓰지 마세요. 각 필드는 공백 포함 220~700자, 4~6개의 자연스러운 한국어 문장으로 작성하세요.
  - 각 필드는 반드시 ① 사용자 응답과 색상 신호에서 읽은 여행의 성격 ② 왜 그 성격을 해당 재료로 옮겼는지 ③ 앞뒤 레이어와 만났을 때 어떤 역할을 하는지를 자연스럽게 이어 쓰세요. 시각 근거는 대표색과 비율 안에서만 필요한 만큼 사용하고 재료 설명만 길게 늘어놓지 마세요.
  - “밝아서 레몬”, “어두워서 초콜릿”처럼 단순하게 연결하지 마세요. 예를 들어 어두운 사진이라면 젖은 바닥의 반사, 건물 재질, 창문의 불빛, 인물의 움직임처럼 서로 다른 근거가 어떻게 코코아의 쌉싸름함이나 가나슈의 온기로 번역되는지 설명하세요.
  - 색상 비율은 업로드한 사진 전체를 합쳐 계산한 값입니다. 특정 사진이나 장면을 보았다고 말하지 말고 전체 색감의 반복과 대비만 이야기하세요.
  - base_analysis는 여행의 정서적 온도를 해석하고 왜 이 BASE인지 설명한 뒤 다음 CREAM이 더하는 색과 깊이로 이어가세요.
  - cream_analysis는 브라우저가 계산한 대표색·비율과 사용자의 답을 함께 해석하고 왜 이 CREAM인지 설명한 뒤 앞 BASE와 뒤 CUBE 사이를 어떻게 잇는지 이야기하세요.
  - cube_analysis는 기억이 남은 방식을 해석하고 왜 이 CUBE인지 설명한 뒤 CREAM 안에서 어떤 기억의 조각으로 드러나 TOPPING으로 이어지는지 이야기하세요.
  - topping_analysis는 여행의 속도와 움직임을 해석하고 왜 이 TOPPING인지 설명한 뒤 앞 세 레이어에 남기는 마지막 리듬과 여운으로 마무리하세요. 같은 근거나 색을 네 필드에서 반복하지 마세요.
  - 모든 문장은 색상 설명에서 끝나지 않고 “Cookie:Ro가 여행을 쿠키 레시피로 번역했다”는 인상을 주어야 합니다. 다정하지만 상투적이지 않게 쓰세요.
  - final_bake는 네 재료나 앞의 분석을 다시 요약하는 곳이 아닙니다. 여행의 시작 → 그 안에서 생긴 변화나 대비 → 기억으로 남은 방식 → 돌아본 뒤의 여운을 하나의 이야기로 엮어 5~7문장으로 쓰세요. 재료 이름은 꼭 필요할 때만 비유로 사용하고, 마지막은 “아마 이번 여행은 그런 맛으로 오래 남지 않을까요?”처럼 여백이 있는 비단정적인 문장으로 끝내세요.
  - “~을 선택하셨기 때문에”, “응답을 분석한 결과”, “~한 특성을 나타냅니다”, “~을 의미합니다” 같은 보고서 말투를 쓰지 마세요.
  - why_this_flavor는 이전 화면과의 호환성을 위한 2문장 이내의 짧은 요약으로만 작성하세요.
- Flavor별 고정 레시피는 다음과 같습니다. Cotton Candy: Pink Cloud Base, Blue Cloud Cream, Marshmallow Cubes, Rainbow Sprinkles. Lemon Cream: Fresh Morning Base, White chocolate cream, Cheesecake Cubes, Lemon Zest. Mango Soda: Sun-Kissed Base, Soda Cream, Mango Cubes, Popping Candy. Matcha Latte: Mellow Base, Matcha Cream, White Choco Cubes, Roasted Choco Pearls. Midnight Choco: Deep Night Base, Chocolate Ganache, Brownie Cubes, Crunchy chocolate balls.
- 재료 이름을 합치거나 새로 만들지 말고 선택한 Flavor의 네 재료를 정확히 사용하세요. 같은 색 하나를 네 재료의 이유로 반복하지 말고, 사진에 없는 표정·옷차림·행동은 꾸며내지 마세요.
  - 마크다운, 제목, 번호, 별표를 필드 값에 쓰지 말고 따뜻하고 구체적인 한국어 분석문으로 작성하세요.`;
  const content=[{type:'input_text',text:prompt}];
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5.6-luna',store:false,input:[{role:'user',content}],text:{format:{type:'json_schema',name:'cookiero_travel_analysis',strict:true,schema}}})});
    const data=await response.json();
    if(!response.ok)return res.status(response.status).json({error:'AI analysis failed',detail:data?.error?.message||'Unknown error'});
    const text=data.output?.flatMap(x=>x.content||[]).find(x=>x.type==='output_text')?.text;
    if(!text)throw new Error('No structured output');
    const analysis=JSON.parse(text);analysis.flavor=selectedFlavor;
    return res.status(200).json({analysis});
  }catch(error){return res.status(500).json({error:'Analysis unavailable',detail:error.message});}
}
