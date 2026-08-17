const flavors = [
  {id:'cotton-candy',name:'Cotton Candy',file:'assets/cotton-candy.png',jar:'assets/cotton-candy-jar.png',tagline:'낯선 순간도 다정한 추억으로 바꾸는 맛',reason:'사람과 표정, 작고 귀여운 장면을 자주 담았어요. 어디서든 금세 마음을 열고 여행의 모든 순간에 색을 더하는 여행자예요.',traits:['#다정한 발견','#분위기 수집가','#함께라서 좋아'],colors:[['Strawberry Pink','#ef7fa9',38],['Cloud Cream','#f7deb0',32],['Soda Blue','#70c7d9',18],['Cocoa Dot','#6b3f25',12]]},
  {id:'lemon-cream',name:'Lemon Cream',file:'assets/lemon-cream.png',jar:'assets/lemon-cream-jar.png',tagline:'가볍고 선명하게 하루를 깨우는 맛',reason:'빛이 맑고 여백이 편안한 장면이 많아요. 복잡한 계획보다 꼭 보고 싶은 것을 또렷하게 고르는 산뜻한 여행자예요.',traits:['#맑은 취향','#가벼운 발걸음','#선명한 기억'],colors:[['Lemon Glow','#f3c947',44],['Butter Cream','#ffe7a2',31],['Vanilla Milk','#fff3d5',17],['Cocoa Dot','#80603a',8]]},
  {id:'mango-soda',name:'Mango Soda',file:'assets/mango-soda.png',jar:'assets/mango-soda-jar.png',tagline:'햇살을 발견하면 망설임 없이 뛰어드는 맛',reason:'밝은 색과 탁 트인 장면이 많아요. 계획보다는 그날의 기분을 따라 움직이고, 작은 순간도 축제로 만드는 여행자예요.',traits:['#즉흥 한 스푼','#햇살 수집가','#기분 좋은 에너지'],colors:[['Mango Orange','#f4a51c',48],['Golden Soda','#ffc94f',27],['Cream Foam','#fff0ce',16],['Lime Zest','#78933d',9]]},
  {id:'matcha-latte',name:'Matcha Latte',file:'assets/matcha-latte.png',jar:'assets/matcha-latte-jar.png',tagline:'느린 호흡으로 오래 머무는 맛',reason:'자연스러운 색과 차분한 시선이 느껴져요. 많이 보기보다 깊게 머물며 장소의 결을 기억하는 여행자예요.',traits:['#느린 여행','#고요한 관찰자','#취향의 깊이'],colors:[['Deep Matcha','#6f7629',46],['Moss Green','#9a9d48',25],['Latte Cream','#e7dca5',18],['Cocoa Pearl','#50351e',11]]},
  {id:'midnight-choco',name:'Midnight Choco',file:'assets/midnight-choco.png',jar:'assets/midnight-choco-jar.png',tagline:'밤이 깊어질수록 이야기가 진해지는 맛',reason:'명암이 깊고 예상 밖의 순간을 담았어요. 남들이 지나치는 시간에 더 선명하게 깨어나는 호기심 많은 여행자예요.',traits:['#밤의 탐험가','#반전 매력','#진한 여운'],colors:[['Dark Cocoa','#452015',51],['Brownie','#74361f',27],['Berry Night','#713eb4',13],['Cherry Spark','#bf2338',9]]}
];

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
let photos=[]; let friendPhotos=[]; let currentFlavor=flavors[2]; let friendBase=null; let photoPalette=null; let photoExif=[]; let aiInsight=null; let friendPalette=null; let friendExif=[]; let friendAi=null;

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
function syncFindButton(){const btn=document.getElementById('findButton');const ready=photos[0]&&document.getElementById('destinationInput').value.trim()&&document.getElementById('dateInput').value;btn.disabled=!ready;btn.textContent=ready?'Find my flavor →':'여행지·시기·사진을 알려 주세요'}
function syncFriendButton(){const btn=document.getElementById('friendFindButton'),ready=friendPhotos[0]&&document.getElementById('friendDestinationInput').value.trim()&&document.getElementById('friendDateInput').value;btn.disabled=!ready;btn.textContent=ready?'내 Flavor 찾기 →':'여행지·시기·사진을 알려 주세요'}
['destinationInput','dateInput'].forEach(id=>document.getElementById(id).addEventListener('input',syncFindButton));
['friendDestinationInput','friendDateInput'].forEach(id=>document.getElementById(id).addEventListener('input',syncFriendButton));
document.querySelectorAll('.photo-slot input[data-slot]').forEach(input=>input.addEventListener('change',()=>previewFile(input,Number(input.dataset.slot))));
document.querySelectorAll('.photo-slot input[data-friend-slot]').forEach(input=>input.addEventListener('change',()=>previewFile(input,Number(input.dataset.friendSlot),true)));

async function fingerprint(file){
  if(!file)return Date.now(); const data=new Uint8Array(await file.arrayBuffer()); let hash=2166136261;
  for(let i=0;i<data.length;i+=Math.max(1,Math.floor(data.length/1500))) hash=Math.imul(hash^data[i],16777619);
  return Math.abs(hash);
}
function colorName([r,g,b]){const max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min,v=max/255,s=max?d/max:0;let h=0;if(d){if(max===r)h=((g-b)/d)%6;else if(max===g)h=(b-r)/d+2;else h=(r-g)/d+4;h=(h*60+360)%360}if(v<.2)return'깊은 먹빛';if(v>.9&&s<.12)return'맑은 크림빛';if(s<.16)return v>.68?'포근한 회백빛':'차분한 회갈빛';if(h<15||h>=345)return v>.72?'코랄 레드':'딥 레드';if(h<45)return v>.78?'햇살 오렌지':'따뜻한 브라운';if(h<70)return'골든 옐로';if(h<165)return s<.42?'세이지 그린':'싱그러운 그린';if(h<205)return'민트 블루';if(h<255)return v>.7?'하늘 블루':'딥 오션 블루';if(h<290)return'라벤더 퍼플';if(h<345)return'로지 핑크';return'여행의 색'}
async function sampleImage(file){return new Promise((resolve,reject)=>{const img=new Image(),url=URL.createObjectURL(file);img.onload=()=>{const scale=Math.min(1,180/Math.max(img.width,img.height)),w=Math.max(1,Math.round(img.width*scale)),h=Math.max(1,Math.round(img.height*scale));const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0,w,h);const d=ctx.getImageData(0,0,w,h).data,out=[];for(let i=0;i<d.length;i+=16){if(d[i+3]>180)out.push([d[i],d[i+1],d[i+2]])}URL.revokeObjectURL(url);resolve(out)};img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('image read failed'))};img.src=url})}
async function analyzePhotoColors(files){let pixels=(await Promise.all(files.map(sampleImage))).flat();if(!pixels.length)return null;if(pixels.length>12000)pixels=pixels.filter((_,i)=>i%Math.ceil(pixels.length/12000)===0);const picks=[.08,.34,.62,.9].map(q=>pixels[Math.min(pixels.length-1,Math.floor(pixels.length*q))].slice());let groups=[];for(let step=0;step<9;step++){groups=picks.map(()=>({sum:[0,0,0],n:0}));for(const p of pixels){let bi=0,bd=Infinity;picks.forEach((c,i)=>{const d=(p[0]-c[0])**2+(p[1]-c[1])**2+(p[2]-c[2])**2;if(d<bd){bd=d;bi=i}});const g=groups[bi];g.sum[0]+=p[0];g.sum[1]+=p[1];g.sum[2]+=p[2];g.n++}groups.forEach((g,i)=>{if(g.n)picks[i]=g.sum.map(v=>Math.round(v/g.n))})}const total=groups.reduce((s,g)=>s+g.n,0);let result=groups.map((g,i)=>({rgb:picks[i],raw:g.n/total*100})).filter(x=>x.raw>.15).sort((a,b)=>b.raw-a.raw);const floors=result.map(x=>Math.floor(x.raw));let remaining=100-floors.reduce((a,b)=>a+b,0);for(let i=0;i<remaining;i++)floors[i%floors.length]++;return result.map((x,i)=>{const hex='#'+x.rgb.map(v=>v.toString(16).padStart(2,'0')).join('');return[colorName(x.rgb),hex,floors[i]]})}
async function imageForAi(file){return new Promise((resolve,reject)=>{const img=new Image(),url=URL.createObjectURL(file);img.onload=()=>{const scale=Math.min(1,1280/Math.max(img.width,img.height)),c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);resolve(c.toDataURL('image/jpeg',.78))};img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('사진을 읽지 못했어요.'))};img.src=url})}
async function readPhotoExif(file){const fallback={file_name:file.name,file_modified:new Date(file.lastModified).toISOString()};if(!window.exifr)return fallback;try{const data=await window.exifr.parse(file,{tiff:true,exif:true,gps:true});return{...fallback,taken_at:data?.DateTimeOriginal||data?.CreateDate||null,latitude:Number.isFinite(data?.latitude)?data.latitude:null,longitude:Number.isFinite(data?.longitude)?data.longitude:null,camera:[data?.Make,data?.Model].filter(Boolean).join(' ')||null}}catch{return fallback}}
async function requestAiAnalysis(files,context){
  if(location.protocol==='file:')return null;
  const {destination,date,palette,exif}=context,place=findPlace(destination);
  const images=await Promise.all(files.map(imageForAi));
  const curated=place?{name:place.name,climate:place.climate,scene:place.scene,food:place.food,foodQuestion:place.foodQuestion,experience:place.experience,source:place.source}:null;
  const response=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({destination,date,images,palette,exif,curated})});
  if(!response.ok)throw new Error('AI server unavailable');
  return (await response.json()).analysis;
}
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let bakingAudio=null;
function prepareBakingAudio(){
  try{const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)return;bakingAudio=bakingAudio||new AudioContext();if(bakingAudio.state==='suspended')bakingAudio.resume()}catch{}
}
function playBakingChime(kind='oven'){
  if(!bakingAudio||bakingAudio.state!=='running')return;
  const now=bakingAudio.currentTime,notes=kind==='jar'?[[1174,0,.08],[1568,.08,.13]]:[[784,0,.13],[1047,.12,.34]];
  notes.forEach(([frequency,offset,duration])=>{const oscillator=bakingAudio.createOscillator(),gain=bakingAudio.createGain();oscillator.type=kind==='jar'?'sine':'triangle';oscillator.frequency.setValueAtTime(frequency,now+offset);gain.gain.setValueAtTime(.0001,now+offset);gain.gain.exponentialRampToValueAtTime(kind==='jar'?.08:.13,now+offset+.018);gain.gain.exponentialRampToValueAtTime(.0001,now+offset+duration);oscillator.connect(gain).connect(bakingAudio.destination);oscillator.start(now+offset);oscillator.stop(now+offset+duration+.03)});
}
function startBaking(){
  const stage=document.getElementById('bakingStage'),cookie=document.getElementById('bakingCookie'),copy=document.getElementById('loadingText');
  const messages=['사진에서 여행의 재료를 찾는 중...','그날의 빛을 반죽에 섞는 중...','여행의 온도로 굽는 중...'];
  let index=0;stage.dataset.phase='dough';cookie.src='assets/cookie-ring.png';copy.textContent=messages[0];
  const phaseOne=setTimeout(()=>{stage.dataset.phase='mix';copy.textContent=messages[1]},1300);
  const phaseTwo=setTimeout(()=>{stage.dataset.phase='bake';copy.textContent=messages[2]},2800);
  const messageLoop=setInterval(()=>{if(stage.dataset.phase==='bake'){index=(index+1)%3;copy.textContent=messages[index]}},1900);
  return()=>{clearTimeout(phaseOne);clearTimeout(phaseTwo);clearInterval(messageLoop)};
}
async function finishBaking(flavor,next){
  const stage=document.getElementById('bakingStage'),cookie=document.getElementById('bakingCookie'),copy=document.getElementById('loadingText'),title=document.getElementById('loadingTitle');
  cookie.src=flavor.file;stage.dataset.phase='top';copy.textContent='마지막 토핑을 올리는 중...';playBakingChime('oven');await pause(850);
  title.textContent='띵— 오늘의 맛이 구워졌어요.';copy.textContent='완성된 쿠키를 Jar에 담는 중...';stage.dataset.phase='drop';await pause(850);
  stage.dataset.phase='done';copy.textContent='오늘의 맛을 담아두었어요.';playBakingChime('jar');await pause(850);next();
}
function renderResult(flavor){
  currentFlavor=flavor;
  document.getElementById('resultName').textContent=flavor.name;
  document.getElementById('resultTagline').textContent=flavor.tagline;
  document.getElementById('resultReason').textContent=flavor.reason;
  const cookie=document.getElementById('resultCookie');cookie.src=flavor.file;cookie.alt=flavor.name+' Cookie';
  const jar=document.getElementById('filledJar');jar.src=flavor.jar;jar.alt=`${flavor.name} Cookie가 담긴 Cookie:Ro 유리 jar`;
  document.getElementById('traitRow').innerHTML=flavor.traits.map(t=>`<i>${t}</i>`).join('');
  document.getElementById('analysisMode').textContent='BAKED FROM YOUR PHOTOS';
  renderTripLetter(flavor);
}
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
  document.getElementById('resultReason').textContent=place?`${place.scene}에서 무엇을 바라보고 머물렀는지가 사진에 보여요. ${flavor.reason}`:flavor.reason;
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
    document.getElementById('resultReason').textContent=aiInsight.why_this_flavor;
    document.getElementById('photoStory').textContent=[aiInsight.specific_place_observation,aiInsight.capture_time_note,aiInsight.scene_observation,aiInsight.warm_observation].filter(Boolean).join(' ');
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
  showScreen('loading');document.getElementById('loadingTitle').innerHTML='여행을 쿠키로 굽는 중<span class="loading-dots"></span>';const stopBaking=startBaking(),minimum=pause(4300);
  if(!fromFriend){const selected=photos.filter(Boolean);try{[photoPalette,photoExif]=await Promise.all([analyzePhotoColors(selected),Promise.all(selected.map(readPhotoExif))])}catch{photoPalette=null;photoExif=[]}try{aiInsight=await requestAiAnalysis(selected,{destination:document.getElementById('destinationInput').value.trim(),date:document.getElementById('dateInput').value,palette:photoPalette,exif:photoExif})}catch{aiInsight=null}}
  const hash=await fingerprint(file); let flavor=flavors[hash%flavors.length];
  if(!fromFriend&&aiInsight)flavor=flavors.find(f=>f.name===aiInsight.flavor)||flavor;
  if(fromFriend&&friendBase&&flavor.id===friendBase.id&&hash%3!==0) flavor=flavors[(flavors.indexOf(flavor)+1)%flavors.length];
  await minimum;stopBaking();await finishBaking(flavor,()=>{if(fromFriend)renderCompare(friendBase,flavor);else{renderResult(flavor);showScreen('result')}});
}
document.getElementById('findButton').addEventListener('click',()=>{prepareBakingAudio();beginFinding(photos[0])});
async function beginFriendFinding(){
  showScreen('loading');document.getElementById('loadingTitle').innerHTML='친구의 여행을 굽는 중<span class="loading-dots"></span>';const selected=friendPhotos.filter(Boolean),stopBaking=startBaking(),minimum=pause(4300);
  try{[friendPalette,friendExif]=await Promise.all([analyzePhotoColors(selected),Promise.all(selected.map(readPhotoExif))])}catch{friendPalette=null;friendExif=[]}
  try{friendAi=await requestAiAnalysis(selected,{destination:document.getElementById('friendDestinationInput').value.trim(),date:document.getElementById('friendDateInput').value,palette:friendPalette,exif:friendExif})}catch{friendAi=null}
  const hash=await fingerprint(selected[0]);let flavor=friendAi?flavors.find(f=>f.name===friendAi.flavor):flavors[hash%flavors.length];if(!flavor)flavor=flavors[hash%flavors.length];
  await minimum;stopBaking();await finishBaking(flavor,()=>{renderCompare(friendBase,flavor);renderFriendAnalysis(flavor)});
}
document.getElementById('friendFindButton').addEventListener('click',()=>{prepareBakingAudio();beginFriendFinding()});

function shareUrl(){const url=new URL(location.href);url.search='';url.hash=`friend=${currentFlavor.id}`;return url.toString()}
document.getElementById('shareButton').addEventListener('click',async()=>{
  const data={title:'Cookie:Ro — Find the Flavor',text:`내 여행은 ${currentFlavor.name} 맛! 우리 여행도 같은 맛일까?`,url:shareUrl()};
  try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(data.url);document.getElementById('shareStatus').textContent='링크를 복사했어요. 친구에게 보내 보세요!'}}catch(e){if(e.name!=='AbortError')toast('공유 링크를 복사하지 못했어요.')}
});
function initFriend(){const id=location.hash.match(/friend=([\w-]+)/)?.[1];if(!id)return;friendBase=flavors.find(f=>f.id===id);if(!friendBase)return;document.getElementById('friendCookie').src=friendBase.file;document.getElementById('friendFlavor').textContent=friendBase.name;showScreen('friend')}
function renderFriendAnalysis(flavor){
  const destination=document.getElementById('friendDestinationInput').value.trim(),date=document.getElementById('friendDateInput').value,month=Number(date.split('-')[1]),place=findPlace(destination),[season,seasonNote]=localSeason(place,month),palette=friendPalette||flavor.colors;
  document.getElementById('friendResultTitle').textContent=flavor.name;
  document.getElementById('friendResultTagline').textContent=flavor.tagline;
  document.getElementById('friendDestinationTitle').textContent=`${destination}에서 보낸 시간`;
  document.getElementById('friendScene').textContent=place?.scene||`${destination}에서 발견한 빛과 표정`;
  document.getElementById('friendExperience').textContent=place?.experience||'사진 속 장면을 자신의 속도로 천천히 즐긴 여행';
  document.getElementById('friendFood').textContent=place?.foodQuestion||`${destination}에서 가장 기억에 남은 음식은 무엇이었나요?`;
  document.getElementById('friendLetterTitle').textContent=`${destination}에서 가져온 다정한 한 조각`;
  document.getElementById('friendPhotoStory').textContent=friendAi?[friendAi.specific_place_observation,friendAi.capture_time_note,friendAi.scene_observation,friendAi.warm_observation].filter(Boolean).join(' '):`${place?.scene||destination}의 분위기 속에서 편안하게 여행을 즐긴 모습이 느껴져요. 사진 밖에서도 좋은 이야기가 이어졌을 것 같아요.`;
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
  document.getElementById('matchCopy').textContent=same?'같은 순간에 마음이 가는 두 사람. 여행의 속도도, 기억하는 장면도 닮아 있어요. 다음 여행의 기억도 같은 jar에 담길 것 같아요.':`${a.name}의 시선과 ${b.name}의 리듬이 만나 여행이 더 입체적이에요. 같은 곳을 보고도 서로 다른 이야기를 가져오는, 맛있는 차이를 가진 조합이에요.`;
  showScreen('compare');
}
function toast(message){const t=document.getElementById('toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
document.querySelectorAll('[data-waitlist-form]').forEach(form=>form.addEventListener('submit',async event=>{
  event.preventDefault();const button=form.querySelector('button'),status=form.querySelector('.waitlist-status'),data=new FormData(form);
  if(data.get('company'))return;
  button.disabled=true;button.textContent='반죽을 준비하는 중...';status.textContent='';
  const source=location.hash.includes('friend=')?'friend_share':'find_your_flavor';
  try{
    const response=await fetch('/api/waitlist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:data.get('name'),email:data.get('email'),source,flavor:currentFlavor?.name||friendBase?.name||null,page_url:location.href})});
    const result=await response.json().catch(()=>({}));if(!response.ok)throw new Error(result.error||'등록하지 못했어요.');
    form.classList.add('is-complete');status.innerHTML='<strong>반죽해두었어요. 🍪</strong><br>Cookie:Ro Bakery가 문을 여는 날 가장 먼저 알려드릴게요.';
  }catch(error){status.textContent=error.message||'잠시 후 다시 시도해 주세요.';button.disabled=false;button.textContent='🍪 첫 쿠키 예약해두기'}
}));
window.addEventListener('hashchange',initFriend);initFriend();
