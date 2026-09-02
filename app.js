const flavors = [
  {id:'cotton-candy',name:'Cotton Candy',file:'assets/cotton-candy.png',jar:'assets/cotton-candy-jar.png',tagline:'낯선 순간도 다정한 추억으로 바꾸는 맛',reason:'사람과 표정, 작고 귀여운 장면을 자주 담았어요. 어디서든 금세 마음을 열고 여행의 모든 순간에 색을 더하는 여행자예요.',traits:['#다정한 발견','#분위기 수집가','#함께라서 좋아'],colors:[['Strawberry Pink','#ef7fa9',38],['Cloud Cream','#f7deb0',32],['Soda Blue','#70c7d9',18],['Cocoa Dot','#6b3f25',12]]},
  {id:'lemon-cream',name:'Lemon Cream',file:'assets/lemon-cream.png',jar:'assets/lemon-cream-jar.png',tagline:'가볍고 선명하게 하루를 깨우는 맛',reason:'빛이 맑고 여백이 편안한 장면이 많아요. 복잡한 계획보다 꼭 보고 싶은 것을 또렷하게 고르는 산뜻한 여행자예요.',traits:['#맑은 취향','#가벼운 발걸음','#선명한 기억'],colors:[['Lemon Glow','#f3c947',44],['Butter Cream','#ffe7a2',31],['Vanilla Milk','#fff3d5',17],['Cocoa Dot','#80603a',8]]},
  {id:'mango-soda',name:'Mango Soda',file:'assets/mango-soda.png',jar:'assets/mango-soda-jar.png',tagline:'햇살을 발견하면 망설임 없이 뛰어드는 맛',reason:'밝은 색과 탁 트인 장면이 많아요. 계획보다는 그날의 기분을 따라 움직이고, 작은 순간도 축제로 만드는 여행자예요.',traits:['#즉흥 한 스푼','#햇살 수집가','#기분 좋은 에너지'],colors:[['Mango Orange','#f4a51c',48],['Golden Soda','#ffc94f',27],['Cream Foam','#fff0ce',16],['Lime Zest','#78933d',9]]},
  {id:'matcha-latte',name:'Matcha Latte',file:'assets/matcha-latte.png',jar:'assets/matcha-latte-jar.png',tagline:'느린 호흡으로 오래 머무는 맛',reason:'자연스러운 색과 차분한 시선이 느껴져요. 많이 보기보다 깊게 머물며 장소의 결을 기억하는 여행자예요.',traits:['#느린 여행','#고요한 관찰자','#취향의 깊이'],colors:[['Deep Matcha','#6f7629',46],['Moss Green','#9a9d48',25],['Matcha Cream','#e7dca5',18],['Cocoa Pearl','#50351e',11]]},
  {id:'midnight-choco',name:'Midnight Choco',file:'assets/midnight-choco.png',jar:'assets/midnight-choco-jar.png',tagline:'밤이 깊어질수록 이야기가 진해지는 맛',reason:'명암이 깊고 예상 밖의 순간을 담았어요. 남들이 지나치는 시간에 더 선명하게 깨어나는 호기심 많은 여행자예요.',traits:['#밤의 탐험가','#반전 매력','#진한 여운'],colors:[['Dark Cocoa','#452015',51],['Brownie','#74361f',27],['Berry Night','#713eb4',13],['Cherry Spark','#bf2338',9]]}
];

const recipes={
  'cotton-candy':[['BASE','여행의 온도','☁️','Pink Cloud Base'],['CREAM','여행의 색','🩵','Blue Cloud Cream'],['CUBE','기억의 조각','⬜','Marshmallow Cubes'],['TOPPING','여행의 리듬','🌈','Rainbow Sprinkles']],
  'lemon-cream':[['BASE','여행의 온도','🌅','Fresh Morning Base'],['CREAM','여행의 색','🤍','White chocolate cream'],['CUBE','기억의 조각','🧀','Cheesecake Cubes'],['TOPPING','여행의 리듬','🍋','Lemon Zest']],
  'mango-soda':[['BASE','여행의 온도','☀️','Sun-Kissed Base'],['CREAM','여행의 색','🫧','Soda Cream'],['CUBE','기억의 조각','🥭','Mango Cubes'],['TOPPING','여행의 리듬','🍬','Popping Candy']],
  'matcha-latte':[['BASE','여행의 온도','🌿','Mellow Base'],['CREAM','여행의 색','🍵','Matcha Cream'],['CUBE','기억의 조각','⬜','White Choco Cubes'],['TOPPING','여행의 리듬','🟤','Roasted Choco Pearls']],
  'midnight-choco':[['BASE','여행의 온도','🌙','Deep Night Base'],['CREAM','여행의 색','🍫','Chocolate Ganache'],['CUBE','기억의 조각','🟫','Brownie Cubes'],['TOPPING','여행의 리듬','🟤','Crunchy chocolate balls']]
};

const legacyPlaces=[
  {keys:['푸에르토리코','푸에르토 리코','puerto rico','산후안','san juan'],food:'모퐁고와 바삭한 토스토네스, 천천히 구운 레촌 아사도',foodQuestion:'풋플랜틴을 으깨 마늘과 함께 빚은 푸에르토리코의 대표 음식 모퐁고도 드셔보셨나요?',scene:'카리브해의 푸른 물빛과 올드 산후안의 알록달록한 골목 사이',climate:'puerto-rico',source:'https://www.discoverpuertorico.com/island/food-drinks'},
  {keys:['제주','jeju'],food:'고소한 흑돼지와 따뜻한 고기국수, 바다 향이 짙은 해산물',scene:'바람이 길을 바꾸어 놓는 해안과 돌담 사이'},
  {keys:['부산','busan'],food:'돼지국밥과 밀면, 씨앗호떡',scene:'바다와 도시의 활기가 맞닿는 골목 사이'},
  {keys:['강릉','gangneung'],food:'초당순두부와 감자옹심이, 향 좋은 커피',scene:'솔숲과 파도가 번갈아 나타나는 길 위'},
  {keys:['서울','seoul'],food:'따뜻한 설렁탕과 시장의 빈대떡, 골목 디저트',scene:'오래된 골목과 반짝이는 야경 사이'},
  {keys:['경주','gyeongju'],food:'황남빵과 찰보리빵, 따뜻한 한정식',scene:'천 년의 돌담과 고분 곁'},
  {keys:['교토','kyoto','京都'],food:'말차 디저트와 유도후, 교토식 화과자',scene:'낮은 처마와 조용한 골목 사이'},
  {keys:['오사카','osaka','大阪'],food:'타코야키와 오코노미야키, 갓 튀긴 쿠시카츠',scene:'간판 불빛과 웃음소리가 가득한 거리'},
  {keys:['도쿄','tokyo','東京'],food:'스시와 몬자야키, 작은 카페의 디저트',scene:'빠른 교차로와 고요한 동네 사이'},
  {keys:['파리','paris'],food:'바삭한 크루아상과 크레페, 치즈 한 조각',scene:'센 강과 오래된 건물의 부드러운 빛 사이'},
  {keys:['런던','london'],food:'피시 앤 칩스와 스콘, 따뜻한 애프터눈 티',scene:'붉은 벽돌과 흐린 하늘이 멋진 거리'},
  {keys:['방콕','bangkok'],food:'팟타이와 똠얌, 달콤한 망고 스티키 라이스',scene:'시장 향신료와 늦은 밤의 불빛 사이',climate:'bangkok'},
  {keys:['다낭','danang','đà nẵng'],food:'미꽝과 반미, 진한 베트남 커피',scene:'긴 해변과 활기찬 시장 사이',climate:'danang'}
];
const places=[...(window.COOKIE_RO_DESTINATIONS||[]),...legacyPlaces];
document.getElementById('destinationList').innerHTML=(window.COOKIE_RO_DESTINATIONS||[]).map(p=>`<option value="${p.name}"></option>`).join('');
function findPlace(value){const query=value.trim().toLowerCase();if(!query)return null;const curated=window.COOKIE_RO_DESTINATIONS||[];return curated.find(p=>p.keys.some(k=>k.toLowerCase()===query))||curated.find(p=>[...p.keys].sort((a,b)=>b.length-a.length).some(k=>k.length>2&&query.includes(k.toLowerCase())))||legacyPlaces.find(p=>p.keys.some(k=>query.includes(k.toLowerCase())))}
const seasons={1:['한겨울','차가운 공기 덕분에 풍경의 선이 더 또렷하고, 따뜻한 한 끼가 오래 기억되는 때'],2:['늦겨울','조용한 거리와 포근한 실내를 번갈아 즐기기 좋은 때'],3:['초봄','가벼워진 햇빛과 막 피어나는 색을 먼저 발견할 수 있는 때'],4:['봄','걷는 길마다 꽃과 연둣빛이 여행의 배경이 되어주는 때'],5:['초여름','해가 길어 천천히 걷고 저녁 풍경까지 넉넉히 누릴 수 있는 때'],6:['여름의 시작','싱그러운 공기와 한층 선명해진 풍경을 만날 수 있는 때'],7:['한여름','강한 햇살과 시원한 음료, 늦은 밤의 활기가 특별해지는 때'],8:['늦여름','뜨거운 낮과 선선해지는 저녁을 함께 담을 수 있는 때'],9:['초가을','공기가 가벼워지고 음식과 산책이 모두 풍성해지는 때'],10:['가을','빛이 낮고 부드러워 어떤 장면도 영화처럼 남는 때'],11:['늦가을','짙어진 색과 한적한 길을 천천히 누릴 수 있는 때'],12:['초겨울','연말의 불빛과 따뜻한 음식이 여행을 더 다정하게 만드는 때']};
function localSeason(place,month){
  if(place?.climate==='puerto-rico') return month===12||month<=4?['따뜻한 건기','비가 비교적 적고 카리브해의 햇살과 바닷바람을 편안하게 즐기기 좋은 때']:['초록이 짙은 우기','짧고 굵은 비 뒤에 섬의 색과 열대 풍경이 한층 선명해지는 때'];
  if(place?.climate==='bangkok') return month>=11||month<=2?['선선한 건기','습도가 비교적 낮아 사원과 골목, 야시장을 오래 걷기 좋은 때']:month<=5?['더운 계절','강한 햇살 뒤 시원한 음료와 늦은 저녁의 활기가 더욱 반가운 때']:['우기','스콜이 지나간 뒤 반짝이는 거리와 짙은 열대의 색을 만날 수 있는 때'];
  if(place?.climate==='danang') return month>=2&&month<=8?['맑은 건기','해변과 야외 풍경을 길게 즐기기 좋은 때']:['비가 잦은 시기','비가 머문 도시의 차분한 분위기와 따뜻한 현지 음식을 누리기 좋은 때'];
  if(['equatorial','equatorial-monsoon'].includes(place?.climate)) return ['따뜻한 열대의 계절','사계절 내내 온화하지만 짧은 스콜 전후로 빛과 초록이 더욱 짙어지는 때'];
  if(place?.climate==='tropical-monsoon') return month>=5&&month<=10?['초록이 짙은 우기','스콜이 지나간 뒤 풍경이 맑아지고 열대의 색이 깊어지는 때']:['따뜻한 건기','비가 비교적 적어 바다와 야외 일정을 길게 즐기기 좋은 때'];
  if(place?.climate==='subtropical-monsoon') return month>=5&&month<=9?['덥고 생기로운 우기','짧은 비와 짙은 초록, 활기찬 저녁 풍경을 함께 만나는 때']:['온화한 건기','습도가 비교적 낮아 골목과 야외 풍경을 편안히 걷기 좋은 때'];
  if(['subtropical','subtropical-us'].includes(place?.climate)) return month<=2||month===12?['온화한 겨울','매서운 추위보다 선선한 공기 속에서 야외 시간을 길게 보내기 좋은 때']:month<=5?['따뜻한 봄','햇빛과 초록이 빠르게 풍성해져 산책이 즐거운 때']:month<=9?['덥고 생기로운 여름','강한 햇살과 소나기 뒤 시원한 저녁이 반가운 때']:['부드러운 가을','더위가 누그러져 도시와 자연을 함께 즐기기 좋은 때'];
  if(place?.climate==='mediterranean') return month<=2||month===12?['온화하고 차분한 겨울','여름보다 한적한 골목과 부드러운 빛을 오래 누리기 좋은 때']:month<=5?['햇살 좋은 봄','꽃과 길어진 낮 덕분에 걷는 즐거움이 커지는 때']:month<=9?['뜨겁고 건조한 여름','늦게까지 이어지는 햇빛과 지중해의 저녁을 즐기기 좋은 때']:['포근한 가을','열기가 누그러지고 음식과 산책이 풍성해지는 때'];
  if(place?.climate==='mediterranean-continental') return seasons[month];
  if(place?.climate==='oceanic') return seasons[month];
  if(place?.climate==='alpine') return month<=3||month===12?['눈이 깊은 겨울','설경과 따뜻한 지역 음식을 가장 선명하게 즐길 수 있는 때']:month<=5?['늦게 깨어나는 봄','눈 녹은 물과 새 초록이 풍경을 바꾸는 때']:month<=8?['짧고 선명한 여름','맑은 공기와 넓은 들판을 오래 걷기 좋은 때']:['색이 깊은 가을','단풍과 차가운 공기가 풍경의 밀도를 높이는 때'];
  if(place?.climate==='finland-arctic') return month<=3||month===12?['깊고 푸른 북유럽의 겨울','라플란드의 긴 밤과 설원, 맑은 날의 오로라를 기다리며 사우나의 온기를 깊이 느끼는 때']:month<=5?['빛이 빠르게 돌아오는 봄','녹기 시작한 호수와 길어진 낮, 아직 남은 북쪽의 눈을 함께 만나는 때']:month<=8?['백야가 이어지는 짧은 여름','밤에도 사라지지 않는 빛 아래 호수와 숲, 늦은 산책을 마음껏 누리는 때']:['루스카와 오로라의 가을','숲이 금빛과 붉은빛으로 물들고 어두워진 밤에 오로라 시즌이 시작되는 때'];
  if(place?.climate==='banff-alpine') return month<=3||month>=11?['눈 덮인 로키의 겨울','얼어붙은 호수와 설원, 스키와 따뜻한 롯지의 시간을 온전히 즐기는 때']:month<=5?['겨울과 여름이 만나는 산악의 봄','계곡의 눈이 녹아 폭포가 힘차지고 높은 길에는 아직 눈이 남아 있는 때']:month<=8?['짧고 맑은 로키의 여름','고산 야생화가 피고 호수가 가장 선명한 청록빛을 띠어 하이킹하기 좋은 때']:['황금빛으로 바뀌는 산악의 가을','선선한 공기와 노랗게 물든 낙엽송이 로키의 능선을 또렷하게 보여주는 때'];
  if(place?.climate==='desert') return month<=2||month===12?['쾌적한 사막의 겨울','낮에는 포근하고 저녁에는 선선해 야외 활동과 사막을 즐기기 좋은 때']:month<=4||month>=10?['따뜻한 전환기','낮의 햇빛과 선선한 저녁을 함께 누리기 좋은 때']:['뜨거운 여름','한낮의 강한 열기를 피해 실내와 늦은 저녁 풍경이 특별해지는 때'];
  if(place?.climate==='hawaii') return month>=5&&month<=10?['따뜻하고 맑은 건기','바다와 트레킹, 긴 노을을 즐기기 좋은 때']:['포근한 우기','짧은 비 뒤 무지개와 짙어진 섬의 초록을 만날 수 있는 때'];
  if(place?.climate==='southern-oceanic') return seasons[((month+5)%12)+1];
  if(!place) return ['그곳만의 계절','입력한 여행지의 실제 기후를 확인하면 그 시기에만 가능한 장면을 더 정확히 이야기할 수 있는 때'];
  return seasons[month];
}

const screens=[...document.querySelectorAll('.screen')];
const dots=[...document.querySelectorAll('.progress-dots i')];
let photos=[]; let friendPhotos=[]; let currentFlavor=flavors[2]; let friendBase=null; let photoPalette=null; let photoExif=[]; let aiInsight=null; let friendPalette=null; let friendExif=[]; let friendAi=null; let sharedData=null; let currentCookieId=null; let friendCookieId=null;
let currentLayerMemory=null;let currentLayerStages=[];
const layerFolders={base:'base',cream:'cream',cube:'cubes',topping:'toppings'};
const layerDefaults={base:'fresh morning base',cream:'white chocolate cream',cube:'cheese cubes',topping:'lemon zest'};
const layerCatalog={base:['pink cloud base','fresh morning base','sun_kissed base','mellow base','deep night base'],cream:['blue cloud cream','white chocolate cream','soda cream','matcha cream','chocolate ganache'],cube:['marshmellow cubes','cheese cubes','mango cubes','white chocolate cubes','brownie cubes'],topping:['rainbow sprinkles','lemon zest','popping candy','roasted choco pearls','crunchy chocolate balls']};
const footprintFiles={'pink cloud base':'paw_pink_cloud.png','fresh morning base':'paw_fresh_morning.png','sun_kissed base':'paw_sun_kissed.png','mellow base':'paw_mellow.png','deep night base':'paw_deep_night.png'};
const normalizedName=value=>String(value||'').toLowerCase().replace('marshmallow','marshmellow').replace('white choco cubes','white chocolate cubes').replace('white chocolate cream','white chocolate').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
function chosenLayers(memory=currentLayerMemory){return Object.fromEntries(['base','cream','cube','topping'].map(layer=>[layer,memory?.resolvedChoices?.[layer]||memory?.[layer]||layerDefaults[layer]]))}
function cookieNameFor(memory=currentLayerMemory){const chosen=chosenLayers(memory),row=(window.COOKIE_RO_NAMES||[]).find(item=>normalizedName(item.base)===normalizedName(chosen.base)&&normalizedName(item.cream)===normalizedName(chosen.cream)&&normalizedName(item.cube)===normalizedName(chosen.cube)&&normalizedName(item.topping)===normalizedName(chosen.topping));return row?.name||'COOKIE:RO JOURNEY COOKIE'}
function layerAsset(layer,name){return `assets/layers/${layerFolders[layer]}/${encodeURIComponent(name||layerDefaults[layer])}.png`}
function loadLayerImage(src){return new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src=src})}
function cleanLayer(image){const temp=document.createElement('canvas');temp.width=1254;temp.height=1254;const t=temp.getContext('2d',{willReadFrequently:true});t.drawImage(image,0,0,1254,1254);const pixels=t.getImageData(0,0,1254,1254),d=pixels.data;for(let i=0;i<d.length;i+=4){const max=Math.max(d[i],d[i+1],d[i+2]),min=Math.min(d[i],d[i+1],d[i+2]);if(d[i+3]&&max-min<10&&min>205)d[i+3]=0}t.putImageData(pixels,0,0);return temp}
async function buildLayerStages(memory){const selected=chosenLayers(memory),canvas=document.createElement('canvas');canvas.width=1254;canvas.height=1254;const ctx=canvas.getContext('2d'),stages=[],base=cleanLayer(await loadLayerImage(layerAsset('base',selected.base)));ctx.drawImage(base,0,0);stages.push(canvas.toDataURL('image/png'));for(const layer of ['cream','cube','topping']){const overlay=cleanLayer(await loadLayerImage(layerAsset(layer,selected[layer]))),masked=document.createElement('canvas');masked.width=1254;masked.height=1254;const m=masked.getContext('2d');m.drawImage(overlay,0,0);m.globalCompositeOperation='destination-in';m.drawImage(base,0,0);m.globalCompositeOperation='source-over';ctx.drawImage(masked,0,0);stages.push(canvas.toDataURL('image/png'))}const footprint=cleanLayer(await loadLayerImage(`assets/layers/footprint/${footprintFiles[selected.base]||footprintFiles[layerDefaults.base]}`));ctx.drawImage(footprint,0,0);stages[3]=canvas.toDataURL('image/png');return stages}

function initMemoryQuestions(){
  const main=document.querySelector('[data-memory="main"]'),friend=document.querySelector('[data-memory="friend"]');
  if(main&&friend&&!friend.children.length){friend.innerHTML=main.innerHTML;friend.querySelector('[id="memoryTitle"]')?.removeAttribute('id');friend.querySelectorAll('[name^="main-"]').forEach(input=>input.name=input.name.replace('main-','friend-'))}
  document.querySelectorAll('[data-memory]').forEach(section=>section.addEventListener('change',event=>{if(event.target.matches('[data-memory-check="photoMoods"]')&&section.querySelectorAll('[data-memory-check="photoMoods"]:checked').length>2){event.target.checked=false;toast('사진을 찍던 순간의 기분은 두 개까지 골라주세요.')}}));
}
function getJourneyMemory(flow='main'){
  const section=document.querySelector(`[data-memory="${flow}"]`);if(!section)return{};
  const chosen=name=>section.querySelector(`input[name="${flow}-${name}"]:checked`)?.value||'';
  const field=name=>section.querySelector(`[data-memory-field="${name}"]`)?.value.trim()||'';
  return{base:chosen('base'),baseNote:field('baseNote'),cream:chosen('cream'),creamNote:field('creamNote'),cube:chosen('cube'),cubeNote:field('cubeNote'),topping:chosen('topping'),toppingNote:field('toppingNote'),answerVersion:4};
}
initMemoryQuestions();
function initLayerWizards(){
  document.querySelectorAll('.layer-questions').forEach(section=>{const steps=[...section.querySelectorAll('[data-layer]')];if(!steps.length)return;let current=0;const nav=document.createElement('div');nav.className='layer-wizard-nav';nav.innerHTML='<div class="layer-wizard-progress"><i></i></div><span>1 / 4</span><button type="button">다음 레이어 →</button>';section.querySelector('.memory-privacy').before(nav);const render=()=>{steps.forEach((step,index)=>step.hidden=index!==current);nav.querySelector('i').style.width=`${(current+1)*25}%`;nav.querySelector('span').textContent=`${current+1} / ${steps.length}`;nav.querySelector('button').textContent=current===steps.length-1?'네 가지 재료 담기 ✓':'다음 레이어 →'};nav.querySelector('button').addEventListener('click',()=>{const step=steps[current],answered=step.querySelector('input:checked')||step.querySelector('textarea')?.value.trim();if(!answered){toast('하나를 고르거나 직접 이야기를 적어주세요.');return}if(current<steps.length-1){current++;render();step.scrollIntoView({behavior:'smooth',block:'center'})}else{section.classList.add('layers-complete');syncFindButton();document.getElementById('findButton')?.scrollIntoView({behavior:'smooth',block:'center'})}});render()});
}
initLayerWizards();

function createCookieId(){return globalThis.crypto?.randomUUID?.()||`cookie_${Date.now()}_${Math.random().toString(36).slice(2,10)}`}

function analyticsSessionId(){
  const key='cookiero-analytics-session';
  try{let id=sessionStorage.getItem(key);if(!id){id=globalThis.crypto?.randomUUID?.()||`session_${Date.now()}_${Math.random().toString(36).slice(2,10)}`;sessionStorage.setItem(key,id)}return id}catch{return`session_${Date.now()}_${Math.random().toString(36).slice(2,10)}`}
}

const sessionId=analyticsSessionId();

function trackEvent(name,properties={}){
  try{
    window.dispatchEvent(new CustomEvent('cookiero:analytics',{detail:{name,properties}}));
    const friendFlow=['friend_landing_viewed','friend_flavor_completed'].includes(name)||properties.flow==='shared_friend';
    const destination=String(properties.destination||document.getElementById(friendFlow?'friendDestinationInput':'destinationInput')?.value||'').trim().slice(0,80);
    fetch('/api/analytics',{method:'POST',headers:{'Content-Type':'application/json'},keepalive:true,body:JSON.stringify({session_id:sessionId,event_name:name,flavor:properties.flavor||'',source:properties.source||(friendFlow?'friend_share':'direct'),destination,referrer:document.referrer||''})}).catch(()=>{});
  }catch(error){console.debug('Analytics unavailable',error)}
}

function showScreen(id){
  screens.forEach(s=>s.classList.toggle('active',s.id===id));
  const target=document.getElementById(id); const step=Number(target?.dataset.step||0);
  dots.forEach((dot,i)=>dot.classList.toggle('active',i===step));
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>showScreen(b.dataset.go)));
document.querySelector('.brand-button').addEventListener('click',()=>{history.replaceState({},'',location.pathname);showScreen('home')});

function previewFile(input,index,isFriend=false){
  const file=input.files?.[0]; if(!file)return;
  const label=input.closest('.photo-slot'); const img=label.querySelector('img');
  img.src=URL.createObjectURL(file); label.classList.add('has-image');
  if(isFriend){friendPhotos[index]=file;syncFriendButton()}
  else{photos[index]=file;syncFindButton()}
}
function previewBatch(input,isFriend=false){const files=[...(input.files||[])].filter(file=>file.type.startsWith('image/')).slice(0,3);if(!files.length)return;const selector=isFriend?'input[data-friend-slot]':'input[data-slot]',inputs=[...document.querySelectorAll(selector)],target=isFriend?friendPhotos:photos;target.length=0;files.forEach((file,index)=>{target[index]=file;const label=inputs[index].closest('.photo-slot'),img=label.querySelector('img');img.src=URL.createObjectURL(file);label.classList.add('has-image')});if(isFriend)syncFriendButton();else syncFindButton()}
function syncFindButton(){const btn=document.getElementById('findButton'),layers=document.querySelector('[data-memory="main"]');const ready=photos[0]&&document.getElementById('destinationInput').value.trim()&&document.getElementById('dateInput').value&&layers?.classList.contains('layers-complete');btn.disabled=!ready;btn.textContent=ready?'Find my flavor →':photos[0]?'네 가지 레이어를 완성해 주세요':'여행지·시기·사진을 알려 주세요'}
function syncFriendButton(){const btn=document.getElementById('friendFindButton'),ready=friendPhotos[0]&&document.getElementById('friendDestinationInput').value.trim()&&document.getElementById('friendDateInput').value;btn.disabled=!ready;btn.textContent=ready?'내 Flavor 찾기 →':'여행지·시기·사진을 알려 주세요'}
['destinationInput','dateInput'].forEach(id=>document.getElementById(id).addEventListener('input',syncFindButton));
['friendDestinationInput','friendDateInput'].forEach(id=>document.getElementById(id).addEventListener('input',syncFriendButton));
document.querySelectorAll('.photo-slot input[data-slot]').forEach(input=>input.addEventListener('change',()=>input.multiple?previewBatch(input):previewFile(input,Number(input.dataset.slot))));
document.querySelectorAll('.photo-slot input[data-friend-slot]').forEach(input=>input.addEventListener('change',()=>input.multiple?previewBatch(input,true):previewFile(input,Number(input.dataset.friendSlot),true)));

async function fingerprint(file){
  if(!file)return Date.now(); const data=new Uint8Array(await file.arrayBuffer()); let hash=2166136261;
  for(let i=0;i<data.length;i+=Math.max(1,Math.floor(data.length/1500))) hash=Math.imul(hash^data[i],16777619);
  return Math.abs(hash);
}
function colorName([r,g,b]){const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min,v=max/255,s=max?d/max:0;let h=0;if(d){if(max===r)h=((g-b)/d)%6;else if(max===g)h=(b-r)/d+2;else h=(r-g)/d+4;h=(h*60+360)%360}if(v<.2)return'깊은 먹빛';if(v>.9&&s<.12)return'맑은 크림빛';if(s<.16)return v>.68?'포근한 회백빛':'차분한 회갈빛';if(h<15||h>=345)return v>.72?'코랄 레드':'딥 레드';if(h<45)return v>.78?'햇살 오렌지':'따뜻한 브라운';if(h<70)return'골든 옐로';if(h<165)return s<.42?'세이지 그린':'싱그러운 그린';if(h<205)return'민트 블루';if(h<255)return v>.7?'하늘 블루':'딥 오션 블루';if(h<290)return'라벤더 퍼플';if(h<345)return'로지 핑크';return'여행의 색'}
async function sampleImage(file){return new Promise((resolve,reject)=>{const img=new Image(),url=URL.createObjectURL(file);img.onload=()=>{const scale=Math.min(1,180/Math.max(img.width,img.height)),w=Math.max(1,Math.round(img.width*scale)),h=Math.max(1,Math.round(img.height*scale));const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,w,h);const d=ctx.getImageData(0,0,w,h).data,out=[];for(let i=0;i<d.length;i+=16){if(d[i+3]>180)out.push([d[i],d[i+1],d[i+2]])}URL.revokeObjectURL(url);resolve(out)};img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('image read failed'))};img.src=url})}
async function analyzePhotoColors(files){let pixels=(await Promise.all(files.map(sampleImage))).flat();if(!pixels.length)return null;if(pixels.length>12000)pixels=pixels.filter((_,i)=>i%Math.ceil(pixels.length/12000)===0);const picks=[.08,.34,.62,.9].map(q=>pixels[Math.min(pixels.length-1,Math.floor(pixels.length*q))].slice());let groups=[];for(let step=0;step<9;step++){groups=picks.map(()=>({sum:[0,0,0],n:0}));for(const p of pixels){let bi=0,bd=Infinity;picks.forEach((c,i)=>{const d=(p[0]-c[0])**2+(p[1]-c[1])**2+(p[2]-c[2])**2;if(d<bd){bd=d;bi=i}});const g=groups[bi];g.sum[0]+=p[0];g.sum[1]+=p[1];g.sum[2]+=p[2];g.n++}groups.forEach((g,i)=>{if(g.n)picks[i]=g.sum.map(v=>Math.round(v/g.n))})}const total=groups.reduce((s,g)=>s+g.n,0);let result=groups.map((g,i)=>({rgb:picks[i],raw:g.n/total*100})).filter(x=>x.raw>.15).sort((a,b)=>b.raw-a.raw);const floors=result.map(x=>Math.floor(x.raw));let remaining=100-floors.reduce((a,b)=>a+b,0);for(let i=0;i<remaining;i++)floors[i%floors.length]++;return result.map((x,i)=>{const hex='#'+x.rgb.map(v=>v.toString(16).padStart(2,'0')).join('');return[colorName(x.rgb),hex,floors[i]]})}
function deterministicFlavor(palette,hash,memory={}){
  if(!palette?.length)return flavors[hash%flavors.length];
  const scores=[0,0,0,0,0];
  palette.forEach(([,hex,percent])=>{const rgb=[1,3,5].map(index=>parseInt(hex.slice(index,index+2),16)/255),max=Math.max(...rgb),min=Math.min(...rgb),delta=max-min,s=max?delta/max:0,v=max;let h=0;if(delta){if(max===rgb[0])h=((rgb[1]-rgb[2])/delta)%6;else if(max===rgb[1])h=(rgb[2]-rgb[0])/delta+2;else h=(rgb[0]-rgb[1])/delta+4;h=(h*60+360)%360}const w=percent/100,pink=h>=315||h<10?1:0,yellow=h>=42&&h<75?1:0,orange=h>=10&&h<42?1:0,green=h>=75&&h<165?1:0,blue=h>=165&&h<265?1:0;scores[0]+=w*(1.1*pink+.55*blue+.5*v+.25*(1-s));scores[1]+=w*(1.2*yellow+.8*v+.35*(1-s));scores[2]+=w*(1.25*orange+.75*yellow+.65*s+.3*v);scores[3]+=w*(1.5*green+.55*(1-s)+.25*(1-v));scores[4]+=w*(1.65*(1-v)+.5*s+.35*blue)});
  scores.forEach((_,index)=>scores[index]+=((hash>>>(index*5))&31)/3100);
  const choiceToFlavor={
    '포근하고 다정한 온도':0,'맑고 산뜻한 온도':1,'생기 있고 뜨거운 온도':2,'차분하고 깊은 온도':3,
    '부드러운 파스텔빛':0,'투명하고 밝은 빛':1,'선명하고 강한 색':2,'그윽하고 낮은 채도':4,
    '사람과 함께한 순간':0,'처음 발견한 풍경':1,'맛과 촉감 같은 감각':2,'혼자 오래 머문 장면':3,
    '천천히 머문 리듬':3,'계획대로 흐른 리듬':1,'즉흥적으로 튄 리듬':2,'밤까지 이어진 진한 리듬':4
  };
  ['base','cream','cube','topping'].forEach(layer=>{const value=memory.resolvedChoices?.[layer]||memory[layer],index=choiceToFlavor[value];if(Number.isInteger(index))scores[index]+=.34});
  return flavors[scores.indexOf(Math.max(...scores))];
}
async function resolveLayerAnswers(memory){
  if(location.protocol==='file:')return memory;
  try{const response=await fetch('/api/classify-layers',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({memory})});if(!response.ok)return memory;const data=await response.json();return{...memory,resolvedChoices:data.matches||{},layerReasons:data.reasons||{},journeyTagline:data.tagline||'',classificationSource:'ai'}}catch{return memory}
}
async function readPhotoExif(file){const fallback={file_name:file.name,file_modified:new Date(file.lastModified).toISOString()};if(!window.exifr)return fallback;try{const data=await window.exifr.parse(file,{tiff:true,exif:true,gps:true});return{...fallback,taken_at:data?.DateTimeOriginal||data?.CreateDate||null,latitude:Number.isFinite(data?.latitude)?data.latitude:null,longitude:Number.isFinite(data?.longitude)?data.longitude:null,camera:[data?.Make,data?.Model].filter(Boolean).join(' ')||null}}catch{return fallback}}
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let bakingAudio=null;
function prepareBakingAudio(){try{const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)return;bakingAudio=bakingAudio||new AudioContext();if(bakingAudio.state==='suspended')bakingAudio.resume()}catch{}}
function playBakingChime(kind='oven'){if(!bakingAudio||bakingAudio.state!=='running')return;const now=bakingAudio.currentTime,notes=kind==='jar'?[[1174,0,.08],[1568,.08,.13]]:[[784,0,.13],[1047,.12,.34]];notes.forEach(([frequency,offset,duration])=>{const oscillator=bakingAudio.createOscillator(),gain=bakingAudio.createGain();oscillator.type=kind==='jar'?'sine':'triangle';oscillator.frequency.setValueAtTime(frequency,now+offset);gain.gain.setValueAtTime(.0001,now+offset);gain.gain.exponentialRampToValueAtTime(kind==='jar'?.08:.13,now+offset+.018);gain.gain.exponentialRampToValueAtTime(.0001,now+offset+duration);oscillator.connect(gain).connect(bakingAudio.destination);oscillator.start(now+offset);oscillator.stop(now+offset+duration+.03)})}
const bakeNames={'cotton-candy':'cotton candy','lemon-cream':'lemon cream','mango-soda':'mango soda','matcha-latte':'matcha latte','midnight-choco':'midnight choco'};
function startBaking(){const stage=document.getElementById('bakingStage'),cookie=document.getElementById('bakingCookie'),copy=document.getElementById('loadingText'),title=document.getElementById('loadingTitle');stage.dataset.phase='dough';title.textContent='COOKIE:RO BAKERY';copy.textContent='여행의 온도를 반죽하는 중…';cookie.src='assets/bake/cookie dough.png';document.getElementById('bakingCrumbs').removeAttribute('src');}
async function runBakeSequence(){const stage=document.getElementById('bakingStage'),cookie=document.getElementById('bakingCookie'),copy=document.getElementById('loadingText'),steps=[['base','여행의 온도를\nBASE로 굽는 중…'],['cream','사진 사이의 색과 공기를\nCREAM으로 잇는 중…'],['cube','오래 남은 기억을\nCUBE로 올리는 중…'],['topping','여행의 마지막 리듬을\nTOPPING으로 뿌리는 중…']];await pause(500);for(let index=0;index<steps.length;index++){const[phase,message]=steps[index];stage.dataset.phase=phase;cookie.src=currentLayerStages[index];copy.textContent=message;await pause(800)}}
async function finishBaking(flavor,next){const stage=document.getElementById('bakingStage'),cookie=document.getElementById('bakingCookie'),copy=document.getElementById('loadingText'),title=document.getElementById('loadingTitle'),stamp=document.getElementById('pawStamp');stage.dataset.phase='stamp';stamp.setAttribute('aria-hidden','false');copy.textContent='Cookie:Ro의 도장을 찍었어요!';playBakingChime('oven');await pause(900);cookie.src=currentLayerStages[3];stage.dataset.phase='final';title.textContent='YOUR COOKIE IS READY.';copy.textContent='네 가지 여행의 재료가 하나의 쿠키로 완성됐어요.';playBakingChime('jar');await pause(900);stamp.setAttribute('aria-hidden','true');next()}
function renderResult(flavor){
  currentFlavor=flavor; const n=flavors.indexOf(flavor)+1;
  const cookieName=cookieNameFor(currentLayerMemory);document.getElementById('resultName').textContent=cookieName;
  prepareWaitlistCard(document.querySelector('#result [data-waitlist]'),cookieName,currentCookieId);
  document.getElementById('resultTagline').textContent='네 가지 여행의 기억으로 구워낸 당신만의 쿠키';
  document.getElementById('flavorNumber').hidden=true;
  const cookie=document.getElementById('resultCookie');cookie.src=currentLayerStages[3];cookie.alt='Base, Cream, Cube, Topping을 조합한 나의 Cookie';
  const jar=document.getElementById('filledJar');jar.src='assets/cookie-jar.png';jar.alt='내 조합 쿠키가 담긴 Cookie:Ro 유리 jar';
  const jarCookie=document.getElementById('jarCompositeCookie');if(jarCookie)jarCookie.src=currentLayerStages[3];
  const mode=document.getElementById('analysisMode');mode.textContent='YOUR 4 LAYER RECIPE';mode.classList.remove('ai');
  renderPhotos('resultPhotos',photos.filter(Boolean));
  renderRecipe('recipeSections','finalBake',flavor,aiInsight);
  const chosen=['base','cream','cube','topping'].map(layer=>currentLayerMemory?.resolvedChoices?.[layer]||currentLayerMemory?.[layer]||layerDefaults[layer]);document.querySelectorAll('#recipeSections .recipe-part h4').forEach((title,index)=>title.textContent=chosen[index]);
  const layers=['base','cream','cube','topping'];document.querySelectorAll('#recipeSections .recipe-part p').forEach((paragraph,index)=>paragraph.textContent=currentLayerMemory?.layerReasons?.[layers[index]]||`${currentLayerMemory?.[`${layers[index]}Note`]||'당신이 고른 여행의 결'}을 ${chosen[index]}의 맛과 질감으로 옮겨 이 레이어에 담았어요.`);
  const tagline=currentLayerMemory?.journeyTagline||'서로 다른 네 가지 기억이 부드럽게 이어져, 오래 꺼내 보고 싶은 한 입이 되었어요.';const summaryLine=document.querySelector('#resultRecipe .taste-summary-line');if(summaryLine)summaryLine.textContent=tagline;const summaryName=document.querySelector('#resultRecipe .taste-summary strong');if(summaryName)summaryName.hidden=true;const recipeFooter=document.querySelector('#resultRecipe footer');if(recipeFooter)recipeFooter.hidden=true;
  renderTripLetter(flavor);
}

function fallbackRecipe(flavor,context={}){
  const parts=recipes[flavor.id],palette=(context.palette||flavor.colors).slice(0,3).map(color=>color[0]).join(', '),destination=context.destination||'그곳';
  const keywords={
    'cotton-candy':[['포근한 시작','다정한 시선','말랑한 온도'],['파스텔 빛','부드러운 공기','몽글한 색'],['귀여운 발견','함께한 순간','작은 설렘'],['가벼운 발걸음','반짝이는 여운','유쾌한 리듬']],
    'lemon-cream':[['산뜻한 시작','맑은 온도','가벼운 마음'],['크림빛 햇살','투명한 색','상쾌한 공기'],['또렷한 장면','작은 디테일','상큼한 기억'],['경쾌한 걸음','깔끔한 여운','톡 튀는 리듬']],
    'mango-soda':[['햇살 가득','탁 트인 마음','따뜻한 시작'],['청량한 색','빛나는 공기','선명한 대비'],['뜻밖의 발견','생생한 장면','작은 모험'],['자유로운 걸음','통통 튀는 순간','신나는 여운']],
    'matcha-latte':[['느긋한 시작','차분한 온도','고요한 마음'],['은은한 초록','부드러운 빛','잔잔한 공기'],['천천히 본 장면','섬세한 발견','깊은 기억'],['여유로운 걸음','고른 리듬','긴 여운']],
    'midnight-choco':[['깊어진 온도','대담한 시작','진한 마음'],['짙은 대비','밤의 빛','포근한 그림자'],['강렬한 장면','비밀스런 발견','선명한 기억'],['느린 긴장감','예상 밖의 전환','오래 남는 여운']]
  }[flavor.id];
  return{
    base_keywords:keywords[0],cream_keywords:keywords[1],cube_keywords:keywords[2],topping_keywords:keywords[3],
    base_analysis:`${destination}에서 가져온 사진 전체를 감싼 빛과 공기의 온도는 ${flavor.tagline}이라는 첫인상을 만들어요. 장면마다 명암과 여백의 크기는 조금씩 다르지만, 사진을 차례로 넘길수록 같은 온도의 하루를 여러 방향에서 바라본 듯한 흐름이 이어져요. 그래서 단순히 밝거나 어둡다는 이유가 아니라, 여행의 첫 장면부터 마지막 장면까지 기분을 단단하게 받쳐 주는 힘을 ${parts[0][3]}에 담았어요. 쿠키의 베이스가 모든 재료를 품고 굽는 동안 맛의 중심을 잡아 주듯, 사진을 고른 시선에서 느껴지는 여행의 태도가 이 레시피의 첫맛이 되었어요.`,
    cream_analysis:`사진에서 실제로 읽힌 중심 색은 ${palette}이고, 이 색들이 서로 다른 풍경을 한 가지 기억으로 부드럽게 이어 주고 있어요. 강한 색이 눈에 들어오는 부분과 조용한 여백이 남은 부분이 번갈아 나타나면서, 여행에는 선명함과 편안함이 함께 머물렀던 것처럼 느껴져요. 이 대비를 단순한 색 조합으로 두지 않고, 장면 사이를 천천히 녹아 연결하는 ${parts[1][3]}의 질감으로 옮겼어요. 한입 안에서 베이스의 온도를 감싸고 다음 재료로 자연스럽게 이어 주는 크림처럼, 사진의 색도 여행의 여러 순간을 하나의 분위기로 묶어 주고 있기 때문이에요.`,
    cube_analysis:`사진들 가운데 유독 대비가 또렷하거나 시선이 오래 머무는 작은 부분들은 여행 전체를 대표하기보다 나중에 한 조각씩 다시 떠올리게 될 기억에 가까워요. 넓은 풍경 속의 작은 색, 화면 한쪽에 남은 빛, 가까이 들여다본 디테일처럼 전체 분위기 안에서 선명하게 튀어나오는 순간들이 있어요. 그런 장면은 여행을 돌아볼 때 가장 먼저 설명하는 이야기는 아니어도, 시간이 지난 뒤 갑자기 생생하게 돌아오는 기억이 되곤 해요. 그래서 오래 씹을수록 존재감이 드러나는 ${parts[2][3]}로 넣어, 부드러운 베이스와 크림 사이에 이 여행만의 구체적인 표정을 남겼어요.`,
    topping_analysis:`사진을 차례로 보면 넓게 바라보다가 작은 장면에 멈추고, 다시 다른 풍경으로 움직이는 시선의 속도가 느껴져요. 모든 순간을 같은 무게로 담기보다 마음이 향하는 곳에서 잠시 멈춘 흔적이 있어, 이 여행은 계획표보다 발견의 리듬으로 기억되는 하루처럼 보여요. 그 움직임을 큰 재료로 덮기보다는 쿠키의 마지막 인상을 깨우는 ${parts[3][3]}으로 흩뿌렸어요. 한입의 끝에서 예상하지 못한 질감과 여운을 남기는 토핑처럼, 사진 사이의 멈춤과 전환이 여행의 방향을 또렷하게 기억하게 해 주기 때문이에요.`,
    final_bake:`${destination}의 빛과 공기는 ${parts[0][3]}의 온도가 되고, 반복된 색은 ${parts[1][3]}처럼 서로 다른 장면을 부드럽게 이어 줬어요. 오래 남을 작은 기억은 ${parts[2][3]}로, 사진 사이를 움직인 시선의 리듬은 ${parts[3][3]}으로 더해졌어요. 그렇게 한 장면의 인상이 아니라 여행 전체의 온도와 색, 기억과 움직임을 차례로 구워 완성한 이 여행의 맛은 ${flavor.name}예요.`
  };
}
function renderRecipe(sectionId,finalId,flavor,analysis){
  const holder=document.getElementById(sectionId),final=document.getElementById(finalId);if(!holder||!final)return;
  const friendResult=sectionId==='friendRecipeSections',context={palette:friendResult?friendPalette:photoPalette,destination:document.getElementById(friendResult?'friendDestinationInput':'destinationInput')?.value.trim()};
  const copy={...fallbackRecipe(flavor,context),...(analysis||{})},fields=['base_analysis','cream_analysis','cube_analysis','topping_analysis'],keywordFields=['base_keywords','cream_keywords','cube_keywords','topping_keywords'];holder.replaceChildren();
  const defaults=fallbackRecipe(flavor,context),stickers=['밀대.png','짤주머니.png','믹스.png','요리사모자.png'];recipes[flavor.id].forEach((part,index)=>{const row=document.createElement('section');row.className='recipe-part';const icon=document.createElement('span');icon.className='recipe-icon';icon.textContent=part[2];const body=document.createElement('div');body.className='recipe-copy';const small=document.createElement('small');small.textContent=`${part[0]} — ${part[1]}`;const title=document.createElement('h4');title.textContent=part[3];const keywords=document.createElement('div');keywords.className='recipe-keywords';keywords.setAttribute('aria-label',`${part[1]} 핵심 키워드`);normalizeKeywords(copy[keywordFields[index]],defaults[keywordFields[index]]).forEach(word=>{const chip=document.createElement('span');chip.textContent=word;keywords.append(chip)});const p=document.createElement('p');p.textContent=copy[fields[index]];const sticker=document.createElement('img');sticker.className='recipe-sticker';sticker.src=`assets/bake/${stickers[index]}`;sticker.alt='';body.append(small,title,keywords,p);row.append(icon,body,sticker);holder.append(row)});final.textContent=copy.final_bake;renderTasteSummary(final.closest('.recipe-story'),copy,flavor);
}
function normalizeKeywords(value,fallback){const clean=Array.isArray(value)?value.map(v=>String(v).trim()).filter(v=>v&&v.length<=14).slice(0,3):[];return clean.length>=2?clean:fallback}
function renderTasteSummary(story,copy,flavor){if(!story)return;story.querySelector('.taste-summary')?.remove();const defaults=fallbackRecipe(flavor),keys=['base_keywords','cream_keywords','cube_keywords','topping_keywords'].map(field=>normalizeKeywords(copy[field],defaults[field])[0]);const summary=document.createElement('div');summary.className='taste-summary';const label=document.createElement('span');label.textContent='A TASTE OF YOUR JOURNEY';const line=document.createElement('div');line.className='taste-summary-line';keys.forEach((word,index)=>{const item=document.createElement('b');item.textContent=word;line.append(item);if(index<keys.length-1){const dot=document.createElement('i');dot.textContent='✦';line.append(dot)}});summary.append(label,line);story.insertBefore(summary,story.querySelector('footer'))}
function renderPhotos(id,sources){const holder=document.getElementById(id);if(!holder)return;holder.replaceChildren();sources.forEach((source,index)=>{const url=source instanceof File?URL.createObjectURL(source):source;if(!url)return;const figure=document.createElement('figure');figure.style.setProperty('--tilt',`${index%2?1.2:-.8}deg`);const img=document.createElement('img');img.src=url;img.alt=`Flavor를 만든 여행 사진 ${index+1}`;const caption=document.createElement('figcaption');caption.textContent=`MOMENT 0${index+1}`;figure.append(img,caption);holder.append(figure)})}
function shareAnalysis(flavor,analysis){const context={palette:photoPalette,destination:document.getElementById('destinationInput')?.value.trim()},copy={...fallbackRecipe(flavor,context),...(analysis||{})};return{base_keywords:copy.base_keywords,cream_keywords:copy.cream_keywords,cube_keywords:copy.cube_keywords,topping_keywords:copy.topping_keywords,base_analysis:copy.base_analysis,cream_analysis:copy.cream_analysis,cube_analysis:copy.cube_analysis,topping_analysis:copy.topping_analysis,final_bake:copy.final_bake}}
function encodeShare(payload){const bytes=new TextEncoder().encode(JSON.stringify(payload));let binary='';bytes.forEach(byte=>binary+=String.fromCharCode(byte));return btoa(binary).replaceAll('+','-').replaceAll('/','_').replaceAll('=','')}
function decodeShare(value){const base64=value.replaceAll('-','+').replaceAll('_','/').padEnd(Math.ceil(value.length/4)*4,'=');const binary=atob(base64),bytes=Uint8Array.from(binary,char=>char.charCodeAt(0));return JSON.parse(new TextDecoder().decode(bytes))}
function renderTripLetter(flavor){
  const destination=document.getElementById('destinationInput').value.trim()||'그곳';
  const date=document.getElementById('dateInput').value;const month=Number(date.split('-')[1])||new Date().getMonth()+1;
  const place=findPlace(destination);
  const [season,seasonNote]=localSeason(place,month);const where=place?.scene||`${destination}만의 빛과 표정이 이어지는 길 위`;
  const food=place?.food||`${destination}에서 오래 사랑받아 온 따뜻한 한 끼와 제철 간식`;
  const flavorStyle={
    'cotton-candy':'눈에 띄는 명소만 좇기보다 함께한 사람의 표정과 우연히 만난 귀여운 장면을 더 오래 바라본 것 같아요.',
    'lemon-cream':'동선을 가볍게 정리하고, 정말 보고 싶었던 장면을 산뜻한 속도로 골라 즐긴 것 같아요.',
    'mango-soda':'좋아 보이는 길이라면 망설이지 않고 방향을 틀며, 계획 밖의 순간까지 신나게 즐긴 것 같아요.',
    'matcha-latte':'많은 곳을 서두르기보다 마음에 든 한 장소에 오래 머물며 공기와 소리까지 기억한 것 같아요.',
    'midnight-choco':'익숙한 낮보다 해가 진 뒤의 골목과 예상하지 못한 장면에서 여행의 진짜 재미를 발견한 것 같아요.'
  }[flavor.id];
  document.getElementById('tripPostmark').textContent=`${destination.toUpperCase()} · ${date.replace('-', '.')}`;
  document.getElementById('destinationKicker').textContent=`CURATED DESTINATION · ${place?'55 PLACES':'UNLISTED'}`;
  document.getElementById('destinationTitle').textContent=`${destination}에서 보낸 시간`;
  document.getElementById('destinationScene').textContent=place?.scene||'아직 저장되지 않은 여행지라 사진에서 느껴지는 분위기만 조심스럽게 읽었어요.';
  document.getElementById('destinationExperience').textContent=place?.experience||'다음 업데이트에서 이 지역만의 여행 방식과 계절을 더 정확히 담을게요.';
  document.getElementById('destinationFood').textContent=place?.foodQuestion||`${destination}에서 가장 기억에 남은 음식은 무엇이었나요?`;
  document.getElementById('letterTitle').textContent=`${destination}에서 가져온 다정한 한 조각`;
  document.getElementById('photoStory').textContent=`사진을 보고 가장 먼저 느껴진 건 ‘참 잘 다녀왔구나’ 하는 마음이었어요. ${where}에서 애써 꾸민 표정보다 순간을 편안하게 누리는 기분이 보여요. 사진 밖에서도 웃음이 이어졌을 것처럼 행복해 보여요.`;
  document.getElementById('travelStyle').textContent=`${flavorStyle} ${place?.experience||''} 그래서 이 여행에는 ${flavor.name}의 맛을 담았어요. 사진 속 색과 여백, 장면을 고른 시선이 ${flavor.tagline.replace(' 맛',' 마음')}과 꼭 닮아 있었거든요.`;
  document.getElementById('seasonStory').textContent=`${month}월의 ${destination}은 ${season}에 가까워요. ${seasonNote}라서 같은 장소라도 지금만의 온도와 색을 더 풍성하게 만났을 거예요. 그 시기에 다녀왔기에 평범한 산책도 조금 더 특별했을 것 같아요.`;
  document.getElementById('foodStory').textContent=place?.foodQuestion?`${place.foodQuestion} ${food}처럼 이 섬의 역사와 생활이 담긴 맛은 여행의 기억을 더 오래 붙잡아 주죠. 사진에는 없더라도 그때 맛있게 먹었던 한 입과 나눈 이야기도 이 Flavor를 완성한 중요한 재료예요.`:`${destination}에서는 ${food}도 빼놓기 어렵죠. 혹시 먹어봤나요? 사진에는 없더라도 여행 중 맛있게 먹었던 한 입과 그때 나눈 이야기가 있다면, 그것도 이 Flavor를 완성한 중요한 재료예요.`;
  const source=document.getElementById('localSource');source.hidden=!place?.source;if(place?.source)source.href=place.source;
  document.getElementById('closingNote').textContent=`당신이 ${destination}에서 보낸 시간은 충분히 즐거웠고, 그 행복이 사진에 다정하게 남아 있어요.`;
  if(aiInsight){
    document.getElementById('photoStory').textContent=`${aiInsight.scene_observation} ${aiInsight.warm_observation}`;
    document.getElementById('travelStyle').textContent=aiInsight.travel_style;
    document.getElementById('seasonStory').textContent=aiInsight.season_note;
    document.getElementById('foodStory').textContent=aiInsight.local_food_question;
    document.getElementById('closingNote').textContent=aiInsight.closing_message;
  }
  const palette=photoPalette||flavor.colors;
  document.getElementById('colorBar').innerHTML=palette.map(c=>`<i style="width:${c[2]}%;background:${c[1]}" title="${c[0]} ${c[2]}%"></i>`).join('');
  document.getElementById('colorLegend').innerHTML=palette.map(c=>`<div><b style="background:${c[1]}"></b><span>${c[0]}</span><em>${c[2]}%</em></div>`).join('');
}
async function beginFinding(file,fromFriend=false){
  showScreen('loading');startBaking();
  const selected=photos.filter(Boolean),hash=await fingerprint(file);let flavor=flavors[hash%flavors.length];
  if(!fromFriend){try{photoPalette=await analyzePhotoColors(selected)}catch{photoPalette=null}currentLayerMemory=await resolveLayerAnswers(getJourneyMemory('main'));currentLayerStages=await buildLayerStages(currentLayerMemory);flavor=deterministicFlavor(photoPalette,hash);aiInsight=null;await runBakeSequence()}
  await finishBaking(flavor,()=>{if(fromFriend)renderCompare(friendBase,flavor);else{renderResult(flavor);showScreen('result');trackEvent('flavor_completed',{flow:'original',flavor:flavor.id})}});
}
document.getElementById('findButton').addEventListener('click',()=>{currentCookieId=createCookieId();trackEvent('flavor_started',{flow:'original',photo_count:photos.filter(Boolean).length});prepareBakingAudio();beginFinding(photos[0])});
async function beginFriendFinding(){
  showScreen('loading');startBaking();const selected=friendPhotos.filter(Boolean);
  try{[friendPalette,friendExif]=await Promise.all([analyzePhotoColors(selected),Promise.all(selected.map(readPhotoExif))])}catch{friendPalette=null;friendExif=[]}
  const hash=await fingerprint(selected[0]),flavor=deterministicFlavor(friendPalette,hash);friendAi=null;currentLayerMemory=await resolveLayerAnswers(getJourneyMemory('friend'));currentLayerStages=await buildLayerStages(currentLayerMemory);await runBakeSequence();
  await finishBaking(flavor,()=>{renderCompare(friendBase,flavor);renderFriendAnalysis(flavor);trackEvent('friend_flavor_completed',{flow:'shared_friend',flavor:flavor.id})});
}
document.getElementById('friendFindButton').addEventListener('click',()=>{friendCookieId=createCookieId();prepareBakingAudio();beginFriendFinding()});

function shareUrl(){const payload={version:2,flavorId:currentFlavor.id,analysis:shareAnalysis(currentFlavor,aiInsight)},url=new URL(location.href);url.search='';url.hash=`share=${encodeShare(payload)}`;return url.toString()}
document.getElementById('shareButton').addEventListener('click',async()=>{
  const button=document.getElementById('shareButton');button.classList.add('is-loading');button.innerHTML='여행을 포장하는 중 <span>↻</span>';
  trackEvent('friend_share_clicked',{flavor:currentFlavor.id,method:navigator.share?'native_share':'clipboard'});
  try{const url=shareUrl(),data={title:'Cookie:Ro — Find the Flavor',text:`내 여행은 ${currentFlavor.name} 맛! 쿠키 레시피를 보고 우리 여행도 비교해 봐.`,url};if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(url);document.getElementById('shareStatus').textContent='사진 없이 Flavor 설명만 담긴 링크를 복사했어요!'}}catch(e){if(e.name!=='AbortError')toast(e.message||'공유 링크를 만들지 못했어요.')}finally{button.classList.remove('is-loading');button.innerHTML='같이 여행한 친구에게 보내기 <span>↗</span>'}
});
let friendLandingTracked=false;
function initFriend(){const shareValue=location.hash.match(/share=([^&]+)/)?.[1],legacyId=location.hash.match(/friend=([\w-]+)/)?.[1];if(!shareValue&&!legacyId)return;if(shareValue){try{sharedData=decodeShare(shareValue)}catch{toast('공유된 Flavor 설명을 읽지 못했어요.');return}}const id=sharedData?.flavorId||legacyId;friendBase=flavors.find(f=>f.id===id);if(!friendBase)return;if(!friendLandingTracked){friendLandingTracked=true;trackEvent('friend_landing_viewed',{flavor:friendBase.id,source:'friend_share'})}document.getElementById('friendCookie').src=friendBase.file;document.getElementById('friendFlavor').textContent=friendBase.name;if(sharedData?.analysis){const story=document.getElementById('sharedStory');story.hidden=false;document.querySelector('.friend-invite').classList.add('has-story');renderRecipe('sharedRecipeSections','sharedFinalBake',friendBase,sharedData.analysis)}showScreen('friend')}
function renderFriendAnalysis(flavor){
  const destination=document.getElementById('friendDestinationInput').value.trim(),date=document.getElementById('friendDateInput').value,month=Number(date.split('-')[1]),place=findPlace(destination),[season,seasonNote]=localSeason(place,month),palette=friendPalette||flavor.colors;
  document.getElementById('friendResultTitle').textContent=flavor.name;
  document.getElementById('friendResultTagline').textContent=flavor.tagline;
  renderPhotos('friendResultPhotos',friendPhotos.filter(Boolean));
  renderRecipe('friendRecipeSections','friendFinalBake',flavor,friendAi);
  document.getElementById('friendDestinationTitle').textContent=`${destination}에서 보낸 시간`;
  document.getElementById('friendScene').textContent=place?.scene||`${destination}에서 발견한 빛과 표정`;
  document.getElementById('friendExperience').textContent=place?.experience||'사진 속 장면을 자신의 속도로 천천히 즐긴 여행';
  document.getElementById('friendFood').textContent=place?.foodQuestion||`${destination}에서 가장 기억에 남은 음식은 무엇이었나요?`;
  document.getElementById('friendLetterTitle').textContent=`${destination}에서 가져온 다정한 한 조각`;
  document.getElementById('friendPhotoStory').textContent=friendAi?`${friendAi.scene_observation} ${friendAi.warm_observation}`:`${place?.scene||destination}의 분위기 속에서 편안하게 여행을 즐긴 모습이 느껴져요. 사진 밖에서도 좋은 이야기가 이어졌을 것 같아요.`;
  document.getElementById('friendTravelStyle').textContent=friendAi?.travel_style||`${place?.experience||'마음에 머무는 장면을 천천히 발견하는 여행'}이었을 것 같아요. 그래서 ${flavor.name}의 맛을 담았어요.`;
  document.getElementById('friendSeasonStory').textContent=friendAi?.season_note||`${month}월의 ${destination}은 ${season}에 가까워요. ${seasonNote}라서 그때만의 빛과 온도를 더 풍성하게 만났을 거예요.`;
  document.getElementById('friendFoodStory').textContent=friendAi?.local_food_question||place?.foodQuestion||`${destination}에서 가장 맛있었던 한 입은 무엇이었나요?`;
  document.getElementById('friendClosing').textContent=friendAi?.closing_message||`당신이 ${destination}에서 보낸 즐거운 시간이 사진에 다정하게 남아 있어요.`;
  document.getElementById('friendFilledJar').src=flavor.jar;
  document.getElementById('friendColorBar').innerHTML=palette.map(c=>`<i style="width:${c[2]}%;background:${c[1]}"></i>`).join('');
  document.getElementById('friendColorLegend').innerHTML=palette.map(c=>`<div><b style="background:${c[1]}"></b><span>${c[0]}</span><em>${c[2]}%</em></div>`).join('');
}
function renderCompare(a,b){
  const same=a.id===b.id;
  [['compareA',a],['compareB',b]].forEach(([id,f])=>document.getElementById(id).src=f.file);
  document.getElementById('compareNameA').textContent=a.name;document.getElementById('compareNameB').textContent=b.name;
  document.getElementById('matchTitle').innerHTML=same?'우리 여행은,<br>같은 맛!':'같은 여행,<br>서로 다른 맛.';
  document.getElementById('matchLabel').textContent=same?'PERFECTLY MATCHED':'A DELICIOUS DIFFERENCE';
  document.getElementById('matchCopy').textContent=same?'같은 순간에 마음이 가는 두 사람.\n여행의 속도도, 기억하는 장면도 닮아 있어요.\n다음 여행의 기억도 같은 Jar에 담길 것 같아요.':`${a.name}의 시선과 ${b.name}의 리듬이 만나 여행이 더 입체적이에요.\n같은 곳을 보고도 서로 다른 이야기를 가져오는, 맛있는 차이를 가진 조합이에요.`;
  prepareWaitlistCard(document.querySelector('#compare [data-waitlist]'),b.name,friendCookieId);
  showScreen('compare');
}
function toast(message){const t=document.getElementById('toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
const waitlistFormMarkup=`<span class="conversion-step">02 · SAVE YOUR COOKIE</span><span class="waitlist-kicker">YOUR FIRST COOKIE IS WAITING.</span><h3>Cookie:Ro Bakery가 문을 열면,<br>가장 먼저 당신의 여행을 구워드릴게요.</h3><p class="waitlist-copy">지금 발견한 <strong data-jar-flavor>쿠키</strong>와 여행의 네 가지 재료를 Cookie Jar에 담아둘게요. 정식 Cookie:Ro가 시작되면 흩어진 여행 사진을 나만의 Crumbook으로 만들어 다시 만나보세요.</p><form class="waitlist-form"><label><span>1. 이름</span><input name="name" type="text" autocomplete="name" maxlength="40" placeholder="이름을 적어주세요" required></label><label><span>2. 연락받을 곳</span><input name="contact" type="text" autocomplete="email" maxlength="120" placeholder="이메일 주소 / 전화번호 / 카카오톡 ID 중 하나" required></label><label class="waitlist-honey" aria-hidden="true"><span>Website</span><input name="website" type="text" tabindex="-1" autocomplete="off"></label><p class="waitlist-note">지금 발견한 쿠키 이름과 네 가지 재료를 Cookie Jar에 보존하고, 정식 서비스 오픈 소식과 초기 이용 안내를 보내드려요. 사진은 저장하지 않아요.</p><button type="submit">🍪 내 쿠키 담아두고 먼저 초대받기</button><p class="waitlist-status" role="status" aria-live="polite"></p></form>`;
const waitlistSuccessMarkup=`<div class="waitlist-success"><span class="cookie-mark" aria-hidden="true">🍪</span><h3>Jar에 담아두었어요.</h3><p><strong data-jar-flavor>이 Flavor</strong>를 기억해둘게요.<br>Cookie:Ro가 문을 열면 가장 먼저 알려드릴게요.</p></div>`;
function syncJarFlavor(name=currentFlavor.name){document.querySelectorAll('[data-jar-flavor]').forEach(node=>node.textContent=name)}
function cookieStorageKey(cookieId){return cookieId?`cookiero-cookie-saved:${cookieId}`:''}
function getCookieRecord(card){
  const friendFlow=!!card.closest('.compare-screen'),flavor=friendFlow?flavors.find(item=>item.name===document.getElementById('compareNameB').textContent):currentFlavor;
  const destination=document.getElementById(friendFlow?'friendDestinationInput':'destinationInput').value.trim(),travelDate=document.getElementById(friendFlow?'friendDateInput':'dateInput').value;
  const context={palette:friendFlow?friendPalette:photoPalette,destination},analysis=friendFlow?friendAi:aiInsight,recipe={...fallbackRecipe(flavor,context),...(analysis||{})};
  const memory=currentLayerMemory||getJourneyMemory(friendFlow?'friend':'main');return{cookieId:friendFlow?friendCookieId:currentCookieId,destination,travelDate,flavorId:'layer-cookie',flavorName:cookieNameFor(memory),tagline:memory.journeyTagline,base:memory.resolvedChoices?.base||memory.base,cream:memory.resolvedChoices?.cream||memory.cream,cube:memory.resolvedChoices?.cube||memory.cube,topping:memory.resolvedChoices?.topping||memory.topping,baseReason:memory.layerReasons?.base,creamReason:memory.layerReasons?.cream,cubeReason:memory.layerReasons?.cube,toppingReason:memory.layerReasons?.topping,baseNote:memory.baseNote,creamNote:memory.creamNote,cubeNote:memory.cubeNote,toppingNote:memory.toppingNote,answerVersion:memory.answerVersion,photosStored:false,storageVersion:6};
}
function markWaitlistComplete(card,cookieId,flavorName){card.innerHTML=waitlistSuccessMarkup;card.querySelectorAll('[data-jar-flavor]').forEach(node=>node.textContent=flavorName);try{if(cookieId)localStorage.setItem(cookieStorageKey(cookieId),'complete')}catch{}}
function prepareWaitlistCard(card,flavorName='Flavor',cookieId=null){
  if(!card)return;
  let complete=false;try{complete=!!cookieId&&localStorage.getItem(cookieStorageKey(cookieId))==='complete'}catch{}
  card.innerHTML=complete?waitlistSuccessMarkup:waitlistFormMarkup;
  card.querySelectorAll('[data-jar-flavor]').forEach(node=>node.textContent=flavorName);
  if(complete)return;
  const form=card.querySelector('form'),status=card.querySelector('.waitlist-status'),button=form.querySelector('button');
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    const data=new FormData(form),name=String(data.get('name')||'').trim(),contact=String(data.get('contact')||'').trim(),source=card.closest('.compare-screen')?'friend-result':'my-result',cookie=getCookieRecord(card);
    if(!name||contact.length<2){status.textContent='이름과 연락받을 곳을 모두 알려주세요.';return}
    if(!cookie.cookieId||!cookie.destination||!cookie.travelDate){status.textContent='여행 기록을 다시 확인한 뒤 저장해 주세요.';return}
    button.disabled=true;button.textContent='Cookie Jar를 준비하는 중…';status.textContent='';
    try{
      const response=await fetch('/api/waitlist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,contact,website:String(data.get('website')||''),source,cookie})}),result=await response.json().catch(()=>null);
      if(!response.ok)throw new Error(result?.message||'오븐 연결이 잠시 느려요. 조금 뒤 다시 시도해 주세요.');
      trackEvent('jar_save_completed',{flow:source,flavor:cookie.flavorId});
      markWaitlistComplete(card,cookie.cookieId,cookie.flavorName);
    }catch(error){status.textContent=error.message;button.disabled=false;button.textContent='🍪 내 쿠키 담아두고 먼저 초대받기'}
  });
}
function initWaitlist(){document.querySelectorAll('[data-waitlist]').forEach(card=>prepareWaitlistCard(card))}
window.addEventListener('hashchange',initFriend);initFriend();
initWaitlist();
