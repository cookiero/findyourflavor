const layerOptions={base:['pink cloud base','fresh morning base','sun_kissed base','mellow base','deep night base'],cream:['blue cloud cream','white chocolate cream','soda cream','matcha cream','chocolate ganache'],cube:['marshmellow cubes','cheese cubes','mango cubes','white chocolate cubes','brownie cubes'],topping:['rainbow sprinkles','lemon zest','popping candy','roasted choco pearls','crunchy chocolate balls']};
const layers=Object.keys(layerOptions),stringFields=Object.fromEntries(layers.map(key=>[key,{type:'string'}])),keywordFields=Object.fromEntries(layers.map(key=>[key,{type:'array',minItems:3,maxItems:3,items:{type:'string'}}]));
const schema={type:'object',additionalProperties:false,properties:{matches:{type:'object',additionalProperties:false,properties:Object.fromEntries(Object.entries(layerOptions).map(([key,values])=>[key,{type:'string',enum:values}])),required:layers},reasons:{type:'object',additionalProperties:false,properties:stringFields,required:layers},keywords:{type:'object',additionalProperties:false,properties:keywordFields,required:layers},narrative:{type:'string'},tagline:{type:'string'}},required:['matches','reasons','keywords','narrative','tagline']};
const instructions=`당신은 Cookie:Ro의 여행 베이커다. 사용자가 고른 객관식과 직접 쓴 메모를 이해한 뒤 그 여행을 네 가지 쿠키 레이어로 번역한다. 심리검사 보고서가 아니라 여행 사진을 함께 넘겨보는 다정한 친구처럼 쓴다.

절대 규칙:
- 제공되지 않은 사람, 장소, 날씨, 행동, 사건, 감정, 사진 장면을 만들지 않는다. 사진은 제공되지 않으므로 사진을 봤다고 말하지 않는다.
- 메모를 따옴표로 인용하거나 문장만 바꿔 복창하지 않는다. 그 뒤의 여행 의미와 감정적 흐름을 소화해 표현한다.
- 객관식만 있으면 선택이 허용하는 추상적 해석까지만 쓰며 구체적 에피소드를 상상하지 않는다.
- '~을 선택하셨기 때문에', '응답을 분석한 결과', '~한 특성을 나타냅니다', '~을 의미합니다' 같은 보고서 말투와 성격 단정을 피한다.
- '이번 여행은 ~했던 것 같아요', '그래서 여기에는 ~를 골랐어요', '~도 같이 담고 싶었거든요'처럼 부드럽고 비단정적으로 쓴다.

matches: 자유서술이 있으면 selected와 note를 함께 보고 options 중 의미와 정서적 결이 가장 가까운 재료를 고른다. 자유서술이 없으면 selected를 그대로 유지한다.

reasons: 각 값은 자연스러운 한국어 4~6문장이다. BASE는 여행의 정서적 온도 해석 → 왜 BASE인지 → 다음 CREAM과의 관계. CREAM은 시각적 분위기 해석 → 왜 CREAM인지 → 앞 BASE와 뒤 CUBE를 잇는 관계. CUBE는 기억이 남은 방식 해석 → 왜 CUBE인지 → CREAM 안에서 드러나 TOPPING으로 이어지는 관계. TOPPING은 여행의 속도와 움직임 해석 → 왜 TOPPING인지 → 앞 세 레이어에 남기는 마지막 리듬과 여운. 재료의 일반 설명보다 사용자의 여행이 중심이어야 한다.

keywords: 레이어마다 해당 사용자 답에서만 도출한 짧은 한국어 구절 정확히 3개(각 최대 14자). 재료별 고정 문구를 반복하거나 답에 없는 사건을 넣지 않는다.

narrative: reasons나 재료 네 개를 다시 나열하지 않는다. 여행의 시작 → 변화나 대비 → 기억으로 남은 방식 → 돌아본 뒤의 여운을 하나의 흐름으로 엮은 한국어 5~8문장이다. 재료 이름은 꼭 필요할 때만 비유로 연결하고 여백이 남는 비단정적 문장으로 끝낸다.

tagline: 전체 여행의 흐름을 담은 따뜻한 한국어 한 문장. 재료 나열이나 유형 판정처럼 쓰지 않는다.`;
export default async function handler(req,res){
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:'AI is not configured'});
  const memory=req.body?.memory||{};
  const safe=Object.fromEntries(layers.map(layer=>[layer,{selected:String(memory[layer]||'').slice(0,100),note:String(memory[`${layer}Note`]||'').slice(0,500),options:layerOptions[layer]}]));
  try{
    const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:'gpt-5.6-luna',store:false,instructions,input:JSON.stringify(safe),text:{format:{type:'json_schema',name:'cookiero_journey_interpretation',strict:true,schema}}})});
    const data=await response.json();if(!response.ok)return res.status(response.status).json({error:'AI classification failed'});
    const text=data.output?.flatMap(item=>item.content||[]).find(item=>item.type==='output_text')?.text;if(!text)throw new Error('No output');
    return res.status(200).json(JSON.parse(text));
  }catch(error){return res.status(500).json({error:'Classification unavailable'});}
}
