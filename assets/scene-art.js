/* Original code-native illustrative artwork. Replace with real project media when available. */
(function(root){
function render(project,index=0){
 const label=project==='showcase'?'CONCEPT / SPACE':project==='learning'?'FIELD NOTES':'JOURNEY / STUDY';
 const frame=body=>`<svg class="p-scene-art" viewBox="0 0 420 270" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="1.3">${body}</g><text x="22" y="248" fill="currentColor" font-size="10" font-family="monospace" letter-spacing="2">${label} — 0${index+1}</text></svg>`;
 if(project==='showcase'){
  const studies=[
   '<path d="M34 207h352 M70 199V96l113-48 163 45v106z M70 96l163 49 113-52 M233 145v54 M183 48v106 M96 108v75l111 33 M116 114v73 M136 120v73 M156 126v73 M176 132v73 M196 138v73 M257 143v49l65-27v-49 M268 139v49 M283 132v49 M298 125v49 M313 118v49"/><path d="m65 75 112-48 174 48 M53 88v123 M358 87v124" opacity=".3"/><circle cx="53" cy="211" r="3"/><circle cx="358" cy="211" r="3"/>',
   '<path d="M32 208h356 M62 200V104h296v96 M49 104l85-55h170l67 55z M80 121h260v62H80z M123 121v62 M166 121v62 M209 121v62 M252 121v62 M295 121v62 M70 200l-16 15 M350 200l16 15 M134 49v55 M304 49v55"/><path d="M62 81h296 M46 63v142 M374 63v142" opacity=".3"/><path d="M200 184v16 M220 184v16"/>',
   '<path d="M36 212h350 M90 201V100l115-55 119 53v103 M72 108l133-64 139 64 M205 45v157 M113 113l69-32v100l-69 20z M228 82l73 33v84l-73-29z M239 88v88 M251 94v87 M263 100v87 M275 106v86 M287 112v85 M128 108v88 M145 100v88 M162 92v88"/><path d="M57 210c-9-28 6-54 14-60 12 18 12 41 4 60 M347 210c-9-24-4-43 7-55 13 20 14 36 6 55" opacity=".5"/>'
  ];return frame(studies[index%3]);
 }
 if(project==='learning')return frame(`<path d="M90 58h133l42 24h65v139h-80l-27-18H90z" fill="currentColor" opacity=".06"/><path d="M90 58h133v145H90z M223 58l27 24v139l-27-18 M250 82h80v139h-80 M108 82h69 M108 91h49 M108 103h85 M108 173h90 M108 183h60 M267 107h45 M267 119h35"/><path d="M169 124v30 M154 139h30" stroke-width="2"/><circle cx="169" cy="139" r="31"/><text x="267" y="178" stroke="none" fill="currentColor" font-size="26" font-family="monospace">0${index+1}</text>`);
 const views=[
  '<path d="M22 190c60-75 121 25 187-28s124-44 189-81 M22 213c60-75 121 25 187-28s124-44 189-81 M22 167c60-75 121 25 187-28s124-44 189-81" opacity=".6"/><path d="m80 143 23-55 26 35 37-74 54 69 38-22 47 20"/><circle cx="314" cy="54" r="19"/><path d="m260 187 41-18 19 15 41-22"/>',
  '<path d="m26 213 108-143 67 84 63-113 130 172z" fill="currentColor" opacity=".04"/><path d="m26 213 108-143 67 84 63-113 130 172 M111 100l22 14 19-17 M239 85l23 20 23-26 M64 199l72-74 51 55 74-59 84 79"/><path d="M51 224h339 M93 214l21-24 M286 214l24-35" opacity=".6"/>',
  '<path d="M28 208h365 M52 207V98h65v109 M129 207V62h75v145 M216 207V117h61v90 M291 207V83h63v124 M66 115h36 M66 132h36 M66 149h36 M144 81h44 M144 99h44 M144 117h44 M144 135h44 M230 134h33 M230 153h33 M305 102h35 M305 120h35 M305 138h35"/><path d="M34 227c63-22 114-8 177-20s111-9 171-3" stroke-dasharray="4 5"/>'
 ];return frame(views[index%3]);
}
const api={render};root.AdaptiveSceneArt=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
