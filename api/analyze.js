const schema={
  type:'object',additionalProperties:false,
  properties:{
    flavor:{type:'string',enum:['Cotton Candy','Lemon Cream','Mango Soda','Matcha Latte','Midnight Choco']},
    location_guess:{type:'string'},location_confidence:{type:'string',enum:['confirmed_by_user','supported_by_exif','visual_guess','unknown']},
    photo_mood:{type:'string'},scene_observation:{type:'string'},warm_observation:{type:'string'},why_this_flavor:{type:'string'},travel_style:{type:'string'},season_note:{type:'string'},local_food_question:{type:'string'},closing_message:{type:'string'}
  },
  required:['flavor','location_guess','location_confidence','photo_mood','scene_observation','warm_observation','why_this_flavor','travel_style','season_note','local_food_question','closing_message']
};

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI is not configured'});
  const {destination,date,images,palette,exif,curated}=req.body||{};
  if(!destination||!date||!Array.isArray(images)||images.length<1||images.length>2)return res.status(400).json({error:'Invalid request'});
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
- 다섯 Flavor 중 사진과 여행의 분위기에 가장 잘 맞는 하나를 고르세요.`;
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
