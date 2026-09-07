const options={
  base:['pink cloud base','fresh morning base','sun_kissed base','mellow base','deep night base'],
  cream:['blue cloud cream','white chocolate cream','soda cream','matcha cream','chocolate ganache'],
  cube:['marshmellow cubes','cheese cubes','mango cubes','white chocolate cubes','brownie cubes'],
  topping:['rainbow sprinkles','lemon zest','popping candy','roasted choco pearls','crunchy chocolate balls']
};
const enumFields=Object.fromEntries(Object.entries(options).map(([key,values])=>[key,{type:'string',enum:values}]));
const keywords=Object.fromEntries(Object.keys(options).map(key=>[key,{type:'array',items:{type:'string'},minItems:2,maxItems:3}]));
const reasons=Object.fromEntries(Object.keys(options).map(key=>[key,{type:'string'}]));
const schema={type:'object',additionalProperties:false,properties:{matches:{type:'object',additionalProperties:false,properties:enumFields,required:Object.keys(options)},keywords:{type:'object',additionalProperties:false,properties:keywords,required:Object.keys(options)},reasons:{type:'object',additionalProperties:false,properties:reasons,required:Object.keys(options)},narrative:{type:'string'},tagline:{type:'string'}},required:['matches','keywords','reasons','narrative','tagline']};

export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI is not configured'});
  const memory=req.body?.memory||{},visualSignals=req.body?.visualSignals||null;
  const input={layers:Object.fromEntries(Object.keys(options).map(layer=>[layer,{selected:String(memory[layer]||'').slice(0,100),note:String(memory[`${layer}Note`]||'').slice(0,240),options:options[layer]}])),creamPhotoColors:visualSignals};
  const instructions=`Cookie:Ro의 여행 레이어 분류기입니다. 네 레이어에서 정확히 한 재료씩 골라 625개 조합 중 하나를 만드세요.
BASE는 base 답만, CUBE는 cube 답만, TOPPING은 topping 답만 근거로 고릅니다. CREAM만 cream 답과 creamPhotoColors의 실제 색 비율·밝기·채도·대비를 함께 반영합니다. 사진 색을 다른 세 레이어 판단이나 설명에 절대 섞지 마세요.
자유서술은 인용하거나 복창하지 말고 그 뒤의 의미를 친구처럼 한 단계 해석하세요. 객관식에 없는 사람·장소·사건·행동·날씨는 만들지 마세요. 자유서술이 비어 있으면 선택값에 맞는 재료를 유지하세요.
각 reason은 4~6문장으로 응답에서 읽은 여행의 결, 왜 이 재료인지, 앞뒤 레이어와의 관계를 부드럽고 비단정적으로 설명하세요. CREAM reason에만 사진에서 계산된 상위 2~3개 색과 비율을 자연스럽게 언급합니다. 재료보다 여행 해석이 중심이어야 합니다.
keywords는 답변 기반의 짧은 한국어 구절 2~3개이며 재료별 고정 문구를 쓰지 마세요. narrative는 재료 목록을 다시 말하지 말고 여행의 시작, 변화나 대비, 기억이 남은 방식, 돌아온 뒤 여운을 6~8문장의 하나의 이야기로 엮으세요. 심리검사처럼 단정하지 말고 사진을 같이 넘겨보는 친구의 말투를 유지하세요.`;
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5.6-luna',store:false,instructions,input:JSON.stringify(input),text:{format:{type:'json_schema',name:'cookiero_layer_matches',strict:true,schema}}})});
    const data=await response.json();if(!response.ok)return res.status(response.status).json({error:'AI classification failed'});
    const text=data.output?.flatMap(item=>item.content||[]).find(item=>item.type==='output_text')?.text;if(!text)throw new Error('No output');
    return res.status(200).json(JSON.parse(text));
  }catch{return res.status(500).json({error:'Classification unavailable'});}
}
