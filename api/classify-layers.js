const layerOptions={
  base:['BUTTER','PINK','SUN','MELLOW','NIGHT'],
  cream:['TOGETHER','DISCOVERY','SCENE','STILL','AFTERGLOW'],
  topping:['SOFT','CRISP','PLAYFUL','SLOW','INTENSE']
};
const meanings={
  base:{BUTTER:'익숙하고 편안하며 안정적인 여행',PINK:'포근하고 다정하며 감정적 온기가 있는 여행',SUN:'따뜻하고 생기 있으며 에너지 넘치는 여행',MELLOW:'차분하고 느긋하며 오래 머문 여행',NIGHT:'짙고 몰입감 있으며 강한 대비와 내밀한 기억이 있는 여행'},
  cream:{TOGETHER:'함께한 시간이 남음',DISCOVERY:'예상 밖의 순간이 남음',SCENE:'하나의 장면이 또렷함',STILL:'조용히 오래 머문 순간',AFTERGLOW:'돌아온 뒤 감정이 깊어짐'},
  topping:{SOFT:'부드럽고 편안함',CRISP:'가볍고 또렷함',PLAYFUL:'통통 튀고 즉흥적임',SLOW:'천천히 고르게 이어짐',INTENSE:'강렬하고 오래 남음'}
};
const schema={type:'object',additionalProperties:false,properties:{matches:{type:'object',additionalProperties:false,properties:Object.fromEntries(Object.entries(layerOptions).map(([key,values])=>[key,{type:'string',enum:values}])),required:Object.keys(layerOptions)}},required:['matches']};
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI is not configured'});
  const memory=req.body?.memory||{};
  const safe=Object.fromEntries(['base','cream','topping'].map(layer=>[layer,{selected:String(memory[layer]||'').slice(0,40),note:String(memory[`${layer}Note`]||'').slice(0,240),meanings:meanings[layer]}]));
  const instructions='Cookie:Ro 125개 레시피의 의미 코드 분류기입니다. BASE는 여행 전체의 기본 온도, CREAM은 가장 기억에 남은 순간과 돌아온 뒤의 잔상, TOPPING은 감각과 움직임을 뜻합니다. 자유서술을 읽고 각 레이어에서 제공된 5개 의미 코드 중 가장 가까운 코드 하나를 고르세요. selected와 note가 함께 있으면 note의 구체적인 기억을 우선하되 과도한 추론은 하지 마세요. 사진 색이나 사진 내용은 사용하지 않습니다.';
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5.6-luna',store:false,instructions,input:JSON.stringify(safe),text:{format:{type:'json_schema',name:'cookiero_125_recipe_codes',strict:true,schema}}})});
    const data=await response.json();if(!response.ok)return res.status(response.status).json({error:'AI classification failed'});
    const text=data.output?.flatMap(item=>item.content||[]).find(item=>item.type==='output_text')?.text;if(!text)throw new Error('No output');
    return res.status(200).json(JSON.parse(text));
  }catch{return res.status(500).json({error:'Classification unavailable'});}
}
