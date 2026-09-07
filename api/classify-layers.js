const layerOptions={
  base:['포근하고 다정한 온도','맑고 산뜻한 온도','생기 있고 뜨거운 온도','차분하고 깊은 온도'],
  cream:['부드러운 파스텔빛','투명하고 밝은 빛','선명하고 강한 색','그윽하고 낮은 채도'],
  cube:['사람과 함께한 순간','처음 발견한 풍경','맛과 촉감 같은 감각','혼자 오래 머문 장면'],
  topping:['천천히 머문 리듬','계획대로 흐른 리듬','즉흥적으로 튄 리듬','밤까지 이어진 진한 리듬']
};
const schema={type:'object',additionalProperties:false,properties:{matches:{type:'object',additionalProperties:false,properties:Object.fromEntries(Object.entries(layerOptions).map(([key,values])=>[key,{type:'string',enum:values}])),required:Object.keys(layerOptions)}},required:['matches']};
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI is not configured'});
  const memory=req.body?.memory||{};
  const safe=Object.fromEntries(['base','cream','cube','topping'].map(layer=>[layer,{selected:String(memory[layer]||'').slice(0,100),note:String(memory[`${layer}Note`]||'').slice(0,240),options:layerOptions[layer]}]));
  const instructions='Cookie:Ro 여행 기억 분류기입니다. 각 레이어의 자유서술을 읽고 반드시 제공된 네 선택지 중 의미와 정서적 결이 가장 가까운 하나를 고르세요. 자유서술이 비어 있으면 selected를 그대로 사용하고, selected도 비어 있으면 가장 중립적인 선택지를 고르세요. 문장을 창작하거나 민감한 특성을 추론하지 마세요.';
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5.6-luna',store:false,instructions,input:JSON.stringify(safe),text:{format:{type:'json_schema',name:'cookiero_layer_matches',strict:true,schema}}})});
    const data=await response.json();if(!response.ok)return res.status(response.status).json({error:'AI classification failed'});
    const text=data.output?.flatMap(item=>item.content||[]).find(item=>item.type==='output_text')?.text;if(!text)throw new Error('No output');
    return res.status(200).json(JSON.parse(text));
  }catch(error){return res.status(500).json({error:'Classification unavailable'});}
}
