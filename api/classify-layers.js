const layerOptions={
  base:['pink cloud base','fresh morning base','sun_kissed base','mellow base','deep night base'],
  cream:['blue cloud cream','white chocolate cream','soda cream','matcha cream','chocolate ganache'],
  cube:['marshmellow cubes','cheese cubes','mango cubes','white chocolate cubes','brownie cubes'],
  topping:['rainbow sprinkles','lemon zest','popping candy','roasted choco pearls','crunchy chocolate balls']
};
const schema={type:'object',additionalProperties:false,properties:{matches:{type:'object',additionalProperties:false,properties:Object.fromEntries(Object.entries(layerOptions).map(([key,values])=>[key,{type:'string',enum:values}])),required:Object.keys(layerOptions)}},required:['matches']};
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI is not configured'});
  const memory=req.body?.memory||{};
  const safe=Object.fromEntries(['base','cream','cube','topping'].map(layer=>[layer,{selected:String(memory[layer]||'').slice(0,100),note:String(memory[`${layer}Note`]||'').slice(0,240),options:layerOptions[layer]}]));
  const instructions='Cookie:Ro 여행 기억 분류기입니다. 각 레이어의 자유서술을 읽고 반드시 제공된 다섯 레이어 재료 중 의미와 정서적 결이 가장 가까운 하나를 고르세요. 자유서술이 비어 있으면 selected를 그대로 사용하세요. 문장을 창작하거나 민감한 특성을 추론하지 마세요.';
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5.6-luna',store:false,instructions,input:JSON.stringify(safe),text:{format:{type:'json_schema',name:'cookiero_layer_matches',strict:true,schema}}})});
    const data=await response.json();if(!response.ok)return res.status(response.status).json({error:'AI classification failed'});
    const text=data.output?.flatMap(item=>item.content||[]).find(item=>item.type==='output_text')?.text;if(!text)throw new Error('No output');
    return res.status(200).json(JSON.parse(text));
  }catch(error){return res.status(500).json({error:'Classification unavailable'});}
}
