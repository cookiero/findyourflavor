const schema={
  type:'object',additionalProperties:false,
  properties:{
    flavor:{type:'string',enum:['Cotton Candy','Lemon Cream','Mango Soda','Matcha Latte','Midnight Choco']},
    location_guess:{type:'string'},location_confidence:{type:'string',enum:['confirmed_by_user','supported_by_exif','visual_guess','unknown']},
    photo_mood:{type:'string'},scene_observation:{type:'string'},warm_observation:{type:'string'},why_this_flavor:{type:'string'},travel_style:{type:'string'},season_note:{type:'string'},local_food_question:{type:'string'},closing_message:{type:'string'},
    base_analysis:{type:'string'},cream_analysis:{type:'string'},cube_analysis:{type:'string'},topping_analysis:{type:'string'},final_bake:{type:'string'}
  },
  required:['flavor','location_guess','location_confidence','photo_mood','scene_observation','warm_observation','why_this_flavor','travel_style','season_note','local_food_question','closing_message','base_analysis','cream_analysis','cube_analysis','topping_analysis','final_bake']
};

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI is not configured'});
  const {destination,date,images,palette,exif,curated}=req.body||{};
  if(!destination||!date||!Array.isArray(images)||images.length<1||images.length>3)return res.status(400).json({error:'Invalid request'});
  if(images.some(x=>typeof x!=='string'||x.length>4_000_000||!x.startsWith('data:image/')))return res.status(413).json({error:'Image is too large'});
  const prompt=`당신은 Cookie:Ro의 따뜻하고 세심한 여행 사진 큐레이터입니다. 사용자 입력과 사진을 함께 분석해 한국어로 답하세요.

사용자 입력 여행지: ${destination}
여행 시기: ${date}
사진 EXIF(없을 수 있음): ${JSON.stringify(exif||{})}
브라우저가 실제 픽셀로 계산한 색상 비율: ${JSON.stringify(palette||[])}
검수된 여행지 정보(있을 수 있음): ${JSON.stringify(curated||{})}

규칙:
- 사진에서 실제로 보이는 장면, 빛, 구도, 활동만 근거로 쓰고 보이지 않는 사실은 꾸며내지 마세요.
- 행복이나 감정은 단정하지 말고 '편안해 보여요', '즐거운 분위기가 느껴져요'처럼 조심스럽게 표현하세요.
- GPS가 없으면 장소를 확정하지 마세요. 사용자 입력은 confirmed_by_user, EXIF GPS는 supported_by_exif, 시각 추정은 visual_guess로 구분하세요.
- 계절은 여행지의 실제 기후와 입력 월을 기준으로 쓰세요. 북반구 기준 표현을 열대·남반구에 적용하지 마세요.
- 검수된 여행지 정보가 있으면 음식과 풍경에 우선 활용하세요. 없으면 필요할 때 웹 검색을 사용하되 불확실한 사실을 만들지 마세요.
- local_food_question은 그 지역의 구체적인 대표 음식 이름을 넣어 사람에게 다정하게 묻는 한두 문장이어야 합니다.
- 사진 픽셀 색상 비율은 이미 계산되었으므로 새 비율을 추측하지 마세요.
- 인종, 건강, 종교, 성적 지향, 정치 성향 같은 민감한 특성을 추정하지 마세요.
- 다섯 Flavor 중 사진과 여행의 분위기에 가장 잘 맞는 하나를 고르세요.
- 사용자에게 보여주는 글에는 AI, 분석, EXIF, GPS, 좌표, 메타데이터 같은 기술 용어나 정보 출처를 쓰지 마세요.
  - base_analysis, cream_analysis, cube_analysis, topping_analysis가 결과의 핵심입니다. 각 필드는 반드시 2~3개의 자연스러운 한국어 문장으로 쓰고, 최소한 ① 사진에서 관찰한 구체적 근거 ② 그 근거가 보여주는 여행의 온도·색·기억·리듬에 대한 해석 ③ 그 해석이 해당 재료와 연결되는 이유를 모두 포함하세요.
  - base_analysis는 여행의 온도, cream_analysis는 여행의 색, cube_analysis는 기억의 조각, topping_analysis는 여행의 리듬을 해석하세요. 같은 근거나 색을 네 필드에서 반복하지 마세요.
  - final_bake는 앞의 네 분석만 압축해 여행 전체를 기억하게 만드는 2문장 이내의 총정리입니다. 새로운 관찰이나 분석을 추가하지 말고 반드시 마지막을 “이 여행의 맛은 [선택한 Flavor]예요.”로 끝내세요.
  - why_this_flavor는 이전 화면과의 호환성을 위한 2문장 이내의 짧은 요약으로만 작성하세요.
- Flavor별 고정 레시피는 다음과 같습니다. Lemon Cream: 버터 쿠키 베이스, 레몬 크림, 레몬 제스트, 슈가 크럼. Mango Soda: 망고 쿠키 베이스, 소다 크림, 망고 큐브, 팝핑 캔디. Cotton Candy: 바닐라 쿠키 베이스, 솜사탕 크림, 핑크 슈가, 별 스프링클. Midnight Choco: 다크 코코아 쿠키 베이스, 초콜릿 가나슈, 베리 크럼, 솔트 크리스털. Matcha Latte: 말차 쿠키 베이스, 밀크 크림, 피스타치오 크럼, 잎사귀 슈가.
- 재료 이름을 합치거나 새로 만들지 말고 선택한 Flavor의 네 재료를 정확히 사용하세요. 같은 색 하나를 네 재료의 이유로 반복하지 말고, 사진에 없는 표정·옷차림·행동은 꾸며내지 마세요.
  - 마크다운, 제목, 번호, 별표를 필드 값에 쓰지 말고 따뜻하고 구체적인 한국어 분석문으로 작성하세요.`;
  const content=[{type:'input_text',text:prompt},...images.map(image_url=>({type:'input_image',image_url,detail:'auto'}))];
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5.6-luna',store:false,input:[{role:'user',content}],tools:[{type:'web_search'}],text:{format:{type:'json_schema',name:'cookiero_travel_analysis',strict:true,schema}}})});
    const data=await response.json();
    if(!response.ok)return res.status(response.status).json({error:'AI analysis failed',detail:data?.error?.message||'Unknown error'});
    const text=data.output?.flatMap(x=>x.content||[]).find(x=>x.type==='output_text')?.text;
    if(!text)throw new Error('No structured output');
    return res.status(200).json({analysis:JSON.parse(text)});
  }catch(error){return res.status(500).json({error:'Analysis unavailable',detail:error.message});}
}
