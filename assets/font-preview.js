window.addEventListener('DOMContentLoaded',()=>{
 const kit=window.AdaptiveUIFontKit,$=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
 if(!kit){$('#fontStatus').textContent='字体资源未加载，请将预览与 assets 文件夹一起打开。';return;}
 const key='adaptive-ui-designer-font-preview-v1';let preference=kit.read(key),epoch=0;
 function makeOptions(items,target,kind){for(const item of items){const b=document.createElement('button');b.className='font-option';b.type='button';b.dataset[kind]=item.id;b.setAttribute('aria-pressed','false');const label=document.createElement('span');label.textContent=item.label;const check=document.createElement('span');check.className='check';check.textContent='✓';check.setAttribute('aria-hidden','true');b.append(label,check);b.addEventListener('click',()=>{preference={...preference,[kind]:item.id};$('#feedback').textContent='已更新预览，保存后下次可恢复。';refresh()});$(target).append(b)}}
 function availability(result){return result.label+'：'+result.reason;}
 async function refresh(){
  const ticket=++epoch;document.querySelector('#uiSelect').value=preference.ui;document.querySelector('#monoSelect').value=preference.mono;kit.apply($('#preview'),preference);kit.apply($('#customPreview'),preference);
  $$('[data-ui]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.ui===preference.ui));$$('[data-mono]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mono===preference.mono));
  $('#codeSample').textContent='const view = { ready: true };\nrender(view); // 16.70 ms';
  const s=kit.stack(preference);$('#configText').textContent=JSON.stringify(preference,null,2)+'\n\n:root {\n  --font-ui: '+s.ui+';\n  --font-mono: '+s.mono+';\n}';
  $('#fontStatus').textContent='正在检查所选字体…';$('#fontStatus').dataset.state='loading';
  try{const state=await kit.status(preference);if(ticket!==epoch)return;const lines=[availability(state.latin),availability(state.cjk)+(state.cjkFallback?' → 使用 '+state.cjkFallback.label+' 回退':''),availability(state.code)+(state.monoFallback?' → 使用 '+state.monoFallback.label+' 回退':'')];$('#fontStatus').replaceChildren();['英文 / 界面','中文','等宽'].forEach((label,i)=>{const p=document.createElement('p'),strong=document.createElement('strong');strong.textContent=label+'　';p.append(strong,document.createTextNode(lines[i]));$('#fontStatus').append(p)});$('#fontStatus').dataset.state='ready';}
  catch{if(ticket!==epoch)return;$('#fontStatus').textContent='未能确认字体状态，当前使用可用回退字体。';$('#fontStatus').dataset.state='error';}
 }
 makeOptions(kit.catalog.uiPresets,'#uiOptions','ui');makeOptions(kit.catalog.monoPresets,'#monoOptions','mono');
for(const [kind,list] of [['ui',kit.catalog.uiPresets],['mono',kit.catalog.monoPresets]]){const select=document.querySelector('#'+kind+'Select');for(const item of list)select.add(new Option(item.label,item.id));select.addEventListener('change',()=>{preference={...preference,[kind]:select.value};document.querySelector('#feedback').textContent='已更新预览，保存后下次可恢复。';refresh()})}
 $('#save').addEventListener('click',()=>{$('#feedback').textContent=kit.save(key,preference)?'偏好已保存，下次打开本页会恢复。':'浏览器无法保存；当前预览仍然有效。'});
 $('#reset').addEventListener('click',()=>{preference=kit.normalize(null);const saved=kit.save(key,preference);$('#feedback').textContent=saved?'已恢复并保存默认字体搭配。':'已恢复默认搭配，当前浏览器无法持久保存。';refresh()});
 $('#theme').addEventListener('click',()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';$('#theme').setAttribute('aria-pressed',dark);$('#theme').textContent=dark?'切换日间':'切换夜间'});
 $('#size').addEventListener('input',()=>{const size=$('#size').value+'px';$('#sizeValue').textContent=size;$('#preview').style.setProperty('--sample-size',size);$('#customPreview').style.setProperty('--sample-size',size)});
 $('#more').addEventListener('click',()=>{const open=$('#extra').hidden;$('#extra').hidden=!open;$('#more').setAttribute('aria-expanded',open);$('#more').textContent=open?'收起样本':'更多样本'});
 $('#sampleText').addEventListener('input',()=>{$('#customPreview').textContent=$('#sampleText').value});$('#customPreview').textContent=$('#sampleText').value;refresh();
});
