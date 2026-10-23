const {model:M,catalog,snapshot}=require('./helpers.cjs'),scenes=require('../assets/design-scenes.js');
module.exports=function(fixture,stack='html'){
 const initial=M.normalize({...fixture,stack},catalog),rec=M.recommend(initial),state={...M.applyScheme(initial,rec.primary,rec),...fixture.adjustments,stack};
 const input=snapshot(state,Object.fromEntries(['zh-CN','en'].map(language=>[language,scenes.render({...state,language})])));
 input.titles=Object.fromEntries(['zh-CN','en'].map((lang,i)=>[lang,scenes.scenarios[state.project].name[i]]));
 const prompt=require('../assets/design-prompt.js').build(input.design);input.design=prompt.snapshot;input.designPrompt=prompt.text;
 return {input,rec};
};
