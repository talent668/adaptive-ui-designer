(async()=>{
 const catalog=await (await fetch('../assets/font-catalog.json')).json(),M=window.AdaptiveStudioModel;
 const language=document.querySelector('#language'),theme=document.querySelector('#theme'),save=document.querySelector('[data-save]'),feedback=document.querySelector('#feedback');
 const originals=new Map(Array.from(document.querySelectorAll('[data-zh]'),e=>[e,e.textContent]));
 let timer,phase='idle';
 function render(){const zh=language.value==='zh-CN';document.documentElement.lang=language.value;document.documentElement.dataset.theme=theme.value;for(const [k,v] of Object.entries(M.tokens({...M.defaults,palette:'sage'},theme.value,catalog)))document.documentElement.style.setProperty(k,v);for(const [el,en] of originals)el.textContent=zh?el.dataset.zh:en;
  feedback.textContent=({idle:['',''],saving:['Saving this local sample…','正在保存此本地示例…'],saved:['Sample saved. No server request was sent.','示例已保存，未发送服务器请求。'],deleted:['Sample removed. Use Reset to restore it.','示例已删除，可用重置恢复。']})[phase][zh?1:0];
  save.disabled=phase==='saving'||phase==='deleted';save.setAttribute('aria-busy',String(phase==='saving'));if(phase==='saving')save.textContent=zh?'正在保存…':'Saving…';window.AUISelect?.refreshAll();
 }
 language.addEventListener('change',render);theme.addEventListener('change',render);
 document.querySelectorAll('[data-toggle]').forEach(b=>b.addEventListener('click',()=>b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true'))));
 save.addEventListener('click',()=>{phase='saving';render();timer=setTimeout(()=>{phase='saved';render();},1000);});
 document.querySelector('[data-reset]').addEventListener('click',()=>{clearTimeout(timer);phase='idle';render();});
 document.querySelectorAll('[data-detail]').forEach(b=>b.addEventListener('click',()=>document.querySelector('#detail').showModal()));
 document.querySelector('[data-remove]').addEventListener('click',()=>document.querySelector('#remove').showModal());
 document.querySelector('#remove').addEventListener('close',e=>{if(e.target.returnValue==='delete'){clearTimeout(timer);phase='deleted';render();}});
 window.addEventListener('pagehide',()=>clearTimeout(timer));render();window.AUISelect.enhanceAll(document);
})().catch(()=>{document.querySelector('#feedback').textContent='Could not load local assets. Serve the skill directory over HTTP.';});
