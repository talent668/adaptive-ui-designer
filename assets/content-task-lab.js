(async()=>{
'use strict';
const D=window.AdaptiveContentTaskDemo,M=window.AdaptiveStudioModel,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const catalog=await (await fetch('../assets/font-catalog.json')).json();
const copy={en:{title:'Content that fits. Actions that follow through.',intro:'Synthetic examples for layout and workflow validation.',back:'Design studio',scenario:'Scenario',panelWidth:'Panel width',language:'Language',appearance:'Appearance',light:'Light',dark:'Dark',reset:'Reset sample',scope:'Panel width is independent of browser width. Only synthetic local data changes; no service is contacted.',demo:'LOCAL SAMPLE',searchLabel:'Search records',searchPlaceholder:'Search title or ID',status:'Status',all:'All items',allCategories:'All categories',clearFilters:'Clear filters',clearSelection:'Clear selection',queue:'Pending queue',alignment:'Rows align repeated actions. A short record beside a long record still has alignment space.',testHelp:'Validation notes and recovery test',testCopy:'Try short and long notes, review successive queue items, then filter and complete a selected batch. Editing retains current filters; reload restores notes and completion only. Simulation is not a real-user study.',failNext:'Simulate the next write failing',failureNote:'This switch deliberately rejects one local write. It does not change browser permissions.',close:'Close',cancel:'Cancel',edit:'Edit note',note:'Note',save:'Save note',saving:'Saving…',saved:'Note saved on this device.',failed:'The write failed. Input and previous data are retained; retry when ready.',invalid:'Enter a note of 1–320 characters.',complete:'Completed locally.',select:'Select',details:'Details',empty:'No matching records.',nonePending:'No pending items.',selected:'selected',hidden:'outside this filter',matches:'matching records',resetDone:'This scenario’s sample was reset.',nothing:'No pending selected items.'},'zh-CN':{title:'让内容适配空间，让操作真正完成。',intro:'用合成场景验证布局与任务流程。',back:'返回设计预览台',scenario:'场景',panelWidth:'内容面板宽度',language:'语言',appearance:'外观',light:'日间',dark:'夜间',reset:'重置示例',scope:'面板宽度独立于浏览器宽度。只修改本地合成数据，不连接真实业务服务。',demo:'本地示例',searchLabel:'搜索记录',searchPlaceholder:'搜索标题或编号',status:'状态',all:'全部记录',allCategories:'全部分类',clearFilters:'清除筛选',clearSelection:'取消选择',queue:'待处理队列',alignment:'同排操作保持对齐，短内容旁边出现长内容时仍会保留对齐空位。',testHelp:'验证说明与失败恢复测试',testCopy:'尝试短文、长文、连续处理队列以及筛选后的批量操作。编辑期间保留筛选；刷新只恢复已保存的文字与完成状态。模拟流程不等于真人可用性研究。',failNext:'模拟下一次写入失败',failureNote:'此开关只故意拒绝一次本地写入，不修改浏览器权限。',close:'关闭',cancel:'取消',edit:'编辑备注',note:'备注',save:'保存备注',saving:'正在保存…',saved:'备注已保存在本机。',failed:'写入失败，输入和原有数据已保留，请重试。',invalid:'请填写 1–320 字的备注。',complete:'已完成本地处理。',select:'选择',details:'详情',empty:'没有符合筛选的记录。',nonePending:'暂无待处理事项。',selected:'项已选',hidden:'项不在当前筛选内',matches:'条匹配记录',resetDone:'已重置当前场景的示例。',nothing:'所选记录中没有待处理项。'}};
let caseId='support',locale='en',appearance='light',state,filters={query:'',category:'all',status:'all'},selected=new Set(),context=null,busy=false,saveEpoch=0;
const t=k=>copy[locale][k],local=v=>v[locale==='zh-CN'?0:1],esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),key=()=>`adaptive-content-task-${caseId}-v1`;
function load(){const fresh=D.create(caseId);try{const saved=JSON.parse(sessionStorage.getItem(key())||'null');if(saved?.caseId===caseId)for(const row of fresh.records){const prior=saved.records?.find(r=>r.id===row.id);if(typeof prior?.note==='string'&&prior.note.trim().length<=320)row.note=prior.note.trim()||null;if(typeof prior?.pending==='boolean')row.pending=prior.pending;}}catch{}return fresh;}
function persist(next){if($('#failNext').checked){$('#failNext').checked=false;throw Error('Simulated write failure');}sessionStorage.setItem(key(),JSON.stringify(next));}
function transact(operation){try{return D.commit(state,operation,persist);}catch{return {ok:false,error:'storage',state};}}
function announce(text){$('#notice').textContent=text;}
function setOptions(el,items,value){el.replaceChildren(...items.map(([id,label])=>new Option(label,id)));el.value=value;}
function localize(){
 document.documentElement.lang=locale;document.documentElement.dataset.theme=appearance;
 for(const [key,value] of Object.entries(M.tokens({...M.defaults,palette:D.cases[caseId].palette,ui:'plex-source-han',mono:'jetbrains-mono',buttonShape:'rounded'},appearance,catalog)))document.documentElement.style.setProperty(key,value);
 $$('[data-msg]').forEach(el=>el.textContent=t(el.dataset.msg));
 setOptions($('#scenario'),Object.entries(D.cases).map(([id,c])=>[id,local(c.name)]),caseId);
 setOptions($('#appearance'),[['light',t('light')],['dark',t('dark')]],appearance);$('#language').value=locale;
 $('#search').placeholder=t('searchPlaceholder');$('#search').setAttribute('aria-label',t('searchLabel'));
 $('#categoryLabel').textContent=local(D.cases[caseId].categoryLabel);$('#status').setAttribute('aria-label',t('status'));
 setOptions($('#category'),[['all',t('allCategories')],...Object.entries(D.cases[caseId].categories).map(([id,v])=>[id,local(v)])],filters.category);
 setOptions($('#status'),[['all',t('all')],['pending',local(D.cases[caseId].pendingLabel)],['done',local(D.cases[caseId].completeLabel)]],filters.status);
 window.AUISelect?.refreshAll();
}
function note(row){return row.note||local(row.description);}
function render(){
 $('#batchError').textContent='';$('#batchError').hidden=true;
 const c=D.cases[caseId],rows=D.visible(state,filters,locale),visibleIds=new Set(rows.map(r=>r.id)),pending=state.records.filter(r=>r.pending);
 $('#caseTitle').textContent=local(c.name);$('#resultCount').textContent=`${rows.length} ${t('matches')}`;
 $('#clearFilters').hidden=!filters.query&&filters.category==='all'&&filters.status==='all';
 $('#records').innerHTML=rows.length?rows.map(r=>`<article class="aui-content-card" data-record="${r.id}"><div class="card-heading"><div><button class="record-title" type="button" data-open="${r.id}" data-entry="records">${esc(local(r.title))}</button><p class="record-id">${r.id} · ${esc(local(c.categories[r.category]))}</p></div><input class="select-record" type="checkbox" data-select="${r.id}" aria-label="${esc(t('select')+' '+local(r.title))}" ${selected.has(r.id)?'checked':''}></div><p class="aui-content-copy">${esc(note(r))}</p><div class="aui-content-tail"><span class="state-label ${r.pending?'':'done'}">${esc(r.pending?local(c.pendingLabel):local(c.completeLabel))}</span><div class="card-actions"><button type="button" class="p-action p-action--text" data-size="small" data-open="${r.id}" data-entry="records">${esc(t('details'))}</button><button type="button" class="p-action p-action--soft" data-size="small" data-edit="${r.id}">${esc(t('edit'))}</button></div></div></article>`).join(''):`<p class="empty">${esc(t('empty'))}</p>`;
 $('#pendingCount').textContent=String(pending.length);$('#queue').innerHTML=pending.length?pending.map(r=>`<div class="queue-item"><div><strong>${esc(local(r.title))}</strong><p class="record-id">${r.id}</p></div><button type="button" class="p-action p-action--secondary" data-size="small" data-open="${r.id}" data-entry="queue">${esc(t('details'))}</button></div>`).join(''):`<p class="sample-note">${esc(t('nonePending'))}</p>`;
 const hidden=[...selected].filter(id=>!visibleIds.has(id)).length;
 $('#batchBar').hidden=!selected.size;$('#selectionCount').textContent=`${selected.size} ${t('selected')}${hidden?' · '+hidden+' '+t('hidden'):''}`;
 $('#completeSelected').textContent=`${local(c.action)} (${selected.size})`;$('#completeSelected').disabled=!state.records.some(r=>selected.has(r.id)&&r.pending)||busy;
 window.AUISelect?.refreshAll();
}
function restoreFocus(){
 if($('#detailsDialog').open||$('#editDialog').open)return;
 const find=(selector,id)=>$$(selector).find(el=>(el.dataset.open||el.dataset.edit)===id);
 const recordSelector=context?.action==='title'?'#records .record-title':context?.action==='details'?'#records .card-actions [data-open]':'#records [data-edit]';
 const target=context?.entry==='queue'?find('#queue [data-open]',context.id)||$('#queue [data-open]'):find(recordSelector,context?.id)||find('#records [data-edit]',context?.id);
 (target||$('#search')).focus({preventScroll:true});
}
function details(id,entry,action='details'){
 const row=state.records.find(r=>r.id===id);if(!row)return;context={id,entry,action};
 $('#detailError').textContent='';$('#detailError').hidden=true;
 $('#detailsTitle').textContent=local(row.title);$('#detailId').textContent=row.id;$('#detailNote').textContent=note(row);
 const edit=`<button type="button" class="p-action ${entry==='queue'&&row.pending?'p-action--secondary':''}" data-edit="${id}">${esc(t('edit'))}</button>`;
 const finish=row.pending?`<button type="button" class="p-action ${entry==='queue'?'':'p-action--secondary'}" data-complete="${id}">${esc(local(D.cases[caseId].action))}</button>`:'';
 $('#detailActions').innerHTML=entry==='queue'?edit+finish:finish+edit;$('#detailsDialog').showModal();
}
function edit(id){const row=state.records.find(r=>r.id===id);if(!row)return;if(!$('#detailsDialog').open)context={id,entry:'records',action:'edit'};else $('#detailsDialog').close();$('#editingRecord').textContent=local(row.title)+' · '+row.id;$('#noteInput').value=note(row);$('#editError').textContent='';syncSave();$('#editDialog').showModal();}
function syncSave(){$('#saveNote').disabled=busy||!$('#noteInput').value.trim();$('#saveNote').textContent=t(busy?'saving':'save');$('#saveNote').setAttribute('aria-busy',String(busy));}
const paint=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
async function finish(ids,button){
 if(busy)return;const startingState=state,errorTarget=$('#detailsDialog').open?$('#detailError'):$('#batchError');let failed=false;
 errorTarget.textContent='';errorTarget.hidden=true;busy=true;button.disabled=true;button.setAttribute('aria-busy','true');
 try{await paint();if(state!==startingState)return;const result=transact({type:'complete',ids});if(!result.ok){failed=true;errorTarget.textContent=t(result.error==='nothing'?'nothing':'failed');errorTarget.hidden=false;return;}state=result.state;selected.clear();$('#detailsDialog').close();render();restoreFocus();announce(`${t('complete')} ${result.affected.length}`);}
 finally{busy=false;button.disabled=false;button.setAttribute('aria-busy','false');$('#completeSelected').disabled=!state.records.some(r=>selected.has(r.id)&&r.pending);if(failed&&button.isConnected)button.focus();}
}
document.addEventListener('click',e=>{const opener=e.target.closest('[data-open]'),editor=e.target.closest('[data-edit]'),complete=e.target.closest('[data-complete]'),close=e.target.closest('[data-close]');if(opener)details(opener.dataset.open,opener.dataset.entry,opener.classList.contains('record-title')?'title':'details');if(editor)edit(editor.dataset.edit);if(complete)finish([complete.dataset.complete],complete);if(close)$('#'+close.dataset.close).close();});
$('#records').addEventListener('change',e=>{const id=e.target.dataset.select;if(!id)return;e.target.checked?selected.add(id):selected.delete(id);render();$$('[data-select]').find(el=>el.dataset.select===id)?.focus({preventScroll:true});});
$('#search').addEventListener('input',e=>{filters.query=e.target.value;render();});
for(const id of ['category','status'])$('#'+id).addEventListener('change',e=>{filters[id]=e.target.value;render();});
$('#clearFilters').addEventListener('click',()=>{filters={query:'',category:'all',status:'all'};$('#search').value='';localize();render();$('#search').focus();});
$('#clearSelection').addEventListener('click',()=>{selected.clear();render();$('#search').focus();});
$('#completeSelected').addEventListener('click',()=>{context={entry:'records',id:null};finish([...selected],$('#completeSelected'));});
$('#editForm').addEventListener('submit',async e=>{
 e.preventDefault();if(busy)return;const value=$('#noteInput').value;if(!value.trim()||value.trim().length>320){$('#editError').textContent=t('invalid');return;}
 const epoch=++saveEpoch,id=context.id;$('#editError').textContent='';busy=true;syncSave();$('#noteInput').disabled=true;
 try{await paint();if(epoch!==saveEpoch||!$('#editDialog').open)return;const result=transact({type:'edit',id,note:value});if(!result.ok){$('#editError').textContent=t('failed');return;}state=result.state;$('#editDialog').close();render();restoreFocus();announce(t('saved'));}
 finally{busy=false;$('#noteInput').disabled=false;syncSave();if($('#editError').textContent)$('#saveNote').focus();}
});
$('#noteInput').addEventListener('input',()=>{$('#editError').textContent='';syncSave();});
$('#editDialog').addEventListener('cancel',()=>{saveEpoch++;});$('#editDialog').addEventListener('close',()=>{saveEpoch++;restoreFocus();});$('#detailsDialog').addEventListener('close',restoreFocus);
$('#language').addEventListener('change',e=>{locale=e.target.value;localize();render();});$('#appearance').addEventListener('change',e=>{appearance=e.target.value;localize();render();});
$('#scenario').addEventListener('change',e=>{caseId=e.target.value;state=load();filters={query:'',category:'all',status:'all'};selected.clear();$('#search').value='';context=null;localize();render();announce('');});
$('#panelWidth').addEventListener('change',e=>$('#samplePanel').style.width=e.target.value+'px');
$('#resetSample').addEventListener('click',()=>{const fresh=D.create(caseId);try{sessionStorage.removeItem(key());}catch{announce(t('failed'));return;}state=fresh;selected.clear();filters={query:'',category:'all',status:'all'};$('#search').value='';localize();render();announce(t('resetDone'));});
new ResizeObserver(entries=>$('#panelMeasure').textContent=Math.round(entries[0].contentRect.width)+' px').observe($('#samplePanel'));
state=load();localize();render();window.AUISelect.enhanceAll(document);window.AUISelect.refreshAll();
})().catch(error=>{document.querySelector('#notice').textContent='Local assets unavailable. Serve the complete skill folder over HTTP.';console.error(error);});
