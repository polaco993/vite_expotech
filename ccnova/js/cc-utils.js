const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const hora = () => new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});
const badge = s => `<span class="badge ${TONE[s]}">${s}</span>`;
const pat = () => PATIENTS.find(p => p.id === S.sel);
let tt;
function say(m){const t=$("#toast");t.textContent=m;t.style.display="block";clearTimeout(tt);tt=setTimeout(()=>t.style.display="none",4000);}
