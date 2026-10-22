const test=require('node:test'),assert=require('node:assert/strict');
const {model:M,catalog,snapshot}=require('./helpers.cjs'),G=require('../assets/design-guidance.js'),S=require('../assets/design-scenes.js');
test('project preparation presents domain-specific coherent directions and preserves context',()=>{
 const profile=G.profile({id:'courtyard',revision:'2',context:{project:'showcase',stack:'vue',projectName:'Courtyard',constraints:'Keep Vue router'},recommended:'glass',identity:['庭院空间与编辑节奏','Courtyard spaces and editorial rhythm'],directions:{glass:{name:['纸上空间','Spaces on paper'],values:{palette:'amber',radius:'compact',material:'solid',stack:'html'}}}},catalog);
 const r=G.recommend(profile.initial,profile);assert.equal(r.primary,'glass');assert.equal(r.values.palette,'amber');assert.equal(r.values.material,'solid');assert.equal(profile.initial.stack,'vue');assert(!('stack' in profile.directions.glass.values));
 assert.equal(G.direction('glass',profile.initial,profile).name[1],'Spaces on paper');assert.match(G.rationale(profile.initial,profile).identity[0],/庭院/);
 const ops=G.rationale({...profile.initial,project:'workspace'},G.profile(null,catalog));assert.notDeepEqual(ops,G.rationale(profile.initial,profile));
});
test('freeform feedback preserves negation and constraints without inferring a keyword patch',()=>{
 const design=snapshot({projectKey:'test-project',palette:'blue',stack:'react'}).design;
 const request=G.request('不要改蓝色。更像杂志，但保留导航与现有 React 路由。',design,{id:'r1',createdAt:'2026-10-22T00:00:00Z'});
 assert.equal(request.message,'不要改蓝色。更像杂志，但保留导航与现有 React 路由。');assert.equal(request.design.selected.palette,'blue');assert.equal(request.design.selected.stack,'react');assert(Object.isFrozen(request.design.selected));
 design.selected.palette='coral';assert.equal(request.design.selected.palette,'blue');assert.equal(G.request('   ',design),null);
});
test('agent responses require matching project and current state; stack changes and stale edits are rejected',()=>{
 const design=snapshot({projectKey:'p',projectRevision:'1'}).design,current=design.selected,request=G.request('更有杂志感，保留蓝色',design,{id:'r'});
 const response={status:'apply',requestId:'r',baseSignature:request.baseSignature,patch:{composition:'editorial',typeScale:'editorial',spacing:'airy'},summary:['重新编排标题和内容，保留蓝色。','Recomposed type and content, keeping blue.']};
 const applied=G.resolve(request,response,current,catalog);assert.equal(applied.status,'applied');assert.equal(applied.state.palette,'blue');assert.equal(applied.state.stack,current.stack);assert.equal(applied.state.composition,'editorial');
 for(const [input,expected]of [[{...response,requestId:'other'},'unmatched'],[{...response,baseSignature:'wrong'},'stale'],[{...response,patch:{stack:'vue'}},'invalid'],[{...response,patch:{radius:'unknown'}},'invalid'],[{...response,patch:{palette:'blue'}},'invalid'],[{...response,status:'failed'},'invalid']])assert.equal(G.resolve(request,input,current,catalog).status,expected);
 assert.equal(G.resolve(request,response,{...current,spacing:'tight'},catalog).status,'stale');assert.equal(G.resolve(request,response,{...current,projectKey:'other'},catalog).status,'stale');
 const clarify=G.resolve(request,{...response,status:'needs-clarification',summary:['导航要保留原位置吗？','Keep navigation in its current position?']},current,catalog);assert.equal(clarify.status,'needs-clarification');assert.deepEqual(clarify.state,current);
});
test('domain artwork and navigation reflect the content, not a common dashboard vocabulary',()=>{
 const brand=S.render({...M.defaults,project:'showcase',composition:'editorial',language:'en'}),learning=S.render({...M.defaults,project:'learning',language:'en'}),travel=S.render({...M.defaults,project:'travel',language:'en'});
 assert(brand.includes('Fieldwork architecture'));assert(brand.includes('Approach'));assert(brand.includes('CONCEPT / SPACE'));assert(!brand.includes('>Settings<'));
 assert(learning.includes('Learning plan'));assert(learning.includes('FIELD NOTES'));assert(travel.includes('JOURNEY / STUDY'));assert(travel.includes('Places'));
});

test('prepared project candidates take precedence without filling gaps from generic presets',()=>{
 const raw=require('../assets/project-examples.js').operations,project=G.profile(raw,catalog),r=G.recommend(project.initial,project);
 assert.deepEqual(r.ids,['precise','clear','soft']);assert.deepEqual(G.candidates(r,project,true),['precise','clear','soft']);
 for(const id of G.candidates(r,project))assert.equal(G.values(id,r,project).palette,'blue');
 const single=G.profile({id:'one',context:{project:'showcase'},directions:{soft:{values:{palette:'amber'}}}},catalog),one=G.recommend(single.initial,single);
 assert.equal(one.primary,'soft');assert.deepEqual(one.ids,['soft']);assert.deepEqual(G.candidates(one,single,true),['soft']);
 const generic=G.profile(null,catalog),g=G.recommend(generic.initial,generic);assert.equal(g.ids.length,3);assert.equal(G.candidates(g,generic,true).length,4);
});
