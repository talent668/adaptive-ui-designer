const test=require('node:test'),assert=require('node:assert/strict');
require('./helpers.cjs');
const cases=require('./fixtures/domain-cases.json'),caseInput=require('./case-input.cjs');
for(const fixture of cases)test(`domain ${fixture.id}: task structure, recommendation and manual choices`,()=>{
 const {input,rec}=caseInput(fixture);
 assert.equal(rec.primary,fixture.expectedScheme);assert.equal(input.design.selected.material,fixture.expectedMaterial);
 for(const [key,value] of Object.entries(fixture.adjustments))assert.equal(input.design.selected[key],value);
 for(const lang of ['zh-CN','en']){
  const doc=new DOMParser().parseFromString(input.scenes[lang],'text/html');
  for(const selector of fixture.requiredSelectors)assert(doc.querySelector(selector),`${lang}: ${selector}`);
  for(const button of doc.querySelectorAll('button'))assert(button.textContent.trim()||button.getAttribute('aria-label'),'unnamed button');
  assert(doc.querySelector('h2'));assert(!doc.querySelector('iframe'));
 }
});
module.exports={caseInput};
