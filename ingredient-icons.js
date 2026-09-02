(()=>{
  const icons={
    'pink cloud base':'🌸','fresh morning base':'🌅','sun kissed base':'☀️','mellow base':'🍵','deep night base':'🌙',
    'blue cloud cream':'☁️','white chocolate cream':'🤍','soda cream':'🫧','matcha cream':'🍵','chocolate ganache':'🍫',
    'marshmellow cubes':'⬜','marshmallow cubes':'⬜','cheese cubes':'🧀','mango cubes':'🥭','white chocolate cubes':'🤍','brownie cubes':'🟫',
    'rainbow sprinkles':'🌈','lemon zest':'🍋','popping candy':'🍬','roasted choco pearls':'🟤','crunchy chocolate balls':'🍫'
  };
  const normalize=value=>String(value||'').toLowerCase().replace(/[_-]+/g,' ').replace(/\s+/g,' ').trim();
  const sync=()=>document.querySelectorAll('.recipe-part').forEach(row=>{
    const name=normalize(row.querySelector('.recipe-copy h4')?.textContent),icon=row.querySelector('.recipe-icon'),symbol=icons[name];
    if(icon&&symbol){icon.textContent=symbol;icon.setAttribute('aria-label',`${name} 아이콘`)}
  });
  const start=()=>{sync();new MutationObserver(sync).observe(document.body,{subtree:true,childList:true,characterData:true})};
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',start,{once:true}):start();
})();
