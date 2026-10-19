/* Synthetic lab data and transactions, not a production business model. */
(function(root){
'use strict';
const cases={
 support:{name:['客服工单','Support inbox'],categoryLabel:['渠道','Channel'],categories:{web:['网站','Web'],email:['电子邮件','Email']},pendingLabel:['等待专家确认','Awaiting specialist confirmation'],completeLabel:['已解决','Resolved'],action:['解决工单','Resolve ticket'],palette:'blue',records:[
  ['SUP-101',['登录问题','Sign-in issue'],'web',['已确认问题。','Issue confirmed.']],
  ['SUP-102',['资料更新','Profile update'],'email',['等待补充资料。','Waiting for details.']],
  ['SUP-103',['通知设置','Notification settings'],'web',['客户希望分别管理邮件提醒和站内通知，需要先确认偏好再提供具体设置步骤，并核对修改后是否符合预期。','The customer needs separate preferences for email and in-app notifications. Confirm the requested behavior, provide the appropriate steps, and verify the resulting settings before resolving the ticket.']],
  ['SUP-104',['账单资料','Billing details'],'email',['核对资料中。','Checking the details.']]]},
 inventory:{name:['库存补货','Stock replenishment'],categoryLabel:['库区','Zone'],categories:{north:['北区','North warehouse'],south:['南区','South warehouse']},pendingLabel:['等待库存复核','Awaiting inventory reconciliation'],completeLabel:['已复核','Reviewed'],action:['完成复核','Complete review'],palette:'sage',records:[
  ['SKU-41',['便携支架','Portable stand'],'north',['需要复核。','Review required.']],
  ['SKU-42',['收纳盒','Storage box'],'south',['数量已记录。','Count recorded.']],
  ['SKU-43',['连接线套装','Cable bundle'],'north',['本批次包含多个包装规格。请核对实物数量、包装单位和库位记录，确认差异原因后再结束本地示例中的复核。','This batch has several pack sizes. Compare physical quantities, units per pack and location records, then document the discrepancy before completing the local sample review.']],
  ['SKU-44',['桌面底座','Desktop base'],'south',['待盘点。','Awaiting count.']]]},
 editorial:{name:['内容审核','Editorial review'],categoryLabel:['栏目','Section'],categories:{guide:['指南','Guides'],news:['动态','Updates']},pendingLabel:['等待终稿复核','Awaiting final editorial review'],completeLabel:['已审核','Reviewed'],action:['完成审核','Finish review'],palette:'violet',records:[
  ['ED-18',['入门指南','Getting started'],'guide',['结构清楚。','Clear structure.']],
  ['ED-19',['版本动态','Release update'],'news',['检查标题。','Check the title.']],
  ['ED-20',['协作指南','Collaboration guide'],'guide',['长文需要核对段落顺序、术语和说明图引用，同时保留作者的表达意图。这里只完成本地示例审核，不会向外发布内容。','Check section order, terminology and illustration references while retaining the author’s intent. This demonstration records a local review decision and does not publish content anywhere.']],
  ['ED-21',['团队动态','Team update'],'news',['措辞已核对。','Wording checked.']]]}
};
function create(caseId){const c=cases[caseId];if(!c)throw Error('Unknown demo case');return {caseId,records:c.records.map(([id,title,category,description])=>({id,title:[...title],category,description:[...description],note:null,pending:true})),revision:0};}
function visible(state,filters={},locale='en'){
 const index=locale==='zh-CN'?0:1,q=String(filters.query||'').trim().toLocaleLowerCase();
 return state.records.filter(r=>(!q||[r.id,r.title[index],r.note||r.description[index]].join(' ').toLocaleLowerCase().includes(q))&&(!filters.category||filters.category==='all'||r.category===filters.category)&&(!filters.status||filters.status==='all'||(filters.status==='pending'?r.pending:filters.status==='done'?!r.pending:false)));
}
function commit(state,operation,persist){
 let rows,affected=[];
 if(operation.type==='edit'){
  if(!state.records.some(r=>r.id===operation.id)||typeof operation.note!=='string'||!operation.note.trim()||operation.note.trim().length>320)return {ok:false,error:'invalid',state};
  affected=[operation.id];rows=state.records.map(r=>r.id===operation.id?{...r,note:operation.note.trim()}:r);
 }else if(operation.type==='complete'){
  const ids=new Set(operation.ids||[]);if(!ids.size||[...ids].some(id=>!state.records.some(r=>r.id===id)))return {ok:false,error:'invalid',state};
  affected=state.records.filter(r=>ids.has(r.id)&&r.pending).map(r=>r.id);
  if(!affected.length)return {ok:false,error:'nothing',state};
  rows=state.records.map(r=>ids.has(r.id)?{...r,pending:false}:r);
 }else return {ok:false,error:'invalid',state};
 const next={...state,records:rows,revision:state.revision+1};
 try{persist(next);}catch{return {ok:false,error:'storage',state};}
 return {ok:true,state:next,affected};
}
const api={cases,create,visible,commit};root.AdaptiveContentTaskDemo=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
