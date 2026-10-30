// Registro de páginas + rotas por hash (#/perfil/pagina).
// Adicionar uma página = chamar registerPage(perfil, {id,label,title,sub,render,icon?,count?}).
const PAGES = {medico:[], paciente:[], familiar:[]};
const registerPage = (role, page) => { (PAGES[role] = PAGES[role] || []).push(page); };
const val = x => typeof x === "function" ? x() : x;
const IC_DEFAULT = '<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>';
function go(role, view = ""){
  const h = `#/${role}/${view}`;
  location.hash === h ? route() : (location.hash = h);
}
function route(){
  const [, role, view] = location.hash.split("/");
  S.role = PAGES[role] ? role : "medico";
  const pg = PAGES[S.role].find(p => p.id === view) || PAGES[S.role][0];
  S.view = pg ? pg.id : "";
  render();
}
const AREA = {medico:"Área do médico", paciente:"Área do paciente", familiar:"Área do familiar"};
const WHO = () => { const f = famPat(), q = pacPat();
  return {medico:["Dra. Camila Reis","Médica"], paciente:[q.nome,"Paciente"], familiar:[f.resp.split(" (")[0],"Familiar de " + f.nome]}; };
const initials = n => n.replace(/^Dra?\.\s/,"").split(" ").slice(0,2).map(w => w[0]).join("");


function render(){
  if (S.role === "medico" && S.view === "pacientes" && !S.sel) { S.sel = PATIENTS[0].id; S.text = PATIENTS[0].nota; S.step = "write"; }
  document.body.dataset.theme = S.role;
  document.querySelectorAll(".switch button").forEach(b => {
    const on = b.dataset.role === S.role;
    b.classList.toggle("on", on); b.setAttribute("aria-pressed", on);
  });
  $("#area").textContent = AREA[S.role];
  $("#nav").innerHTML = PAGES[S.role].map(p => {
    const n = p.count ? `<span class="cnt">${p.count()}</span>` : "", on = p.id === S.view;
    return `<button class="nav ${on?"on":""}" data-view="${p.id}" ${on?'aria-current="page"':""}><svg viewBox="0 0 24 24" aria-hidden="true">${p.icon || IC_DEFAULT}</svg>${p.label}${n}</button>`;
  }).join("");
  const pg = PAGES[S.role].find(p => p.id === S.view), w = WHO()[S.role];
  $("#who").innerHTML = `<span class="av">${initials(w[0])}</span><span><b>${w[0]}</b><small>${w[1]}</small></span>`;
  $("#main").innerHTML = pg
    ? `<header class="top"><h1>${val(pg.title)}</h1><p class="sub">${val(pg.sub)}</p></header>` + pg.render()
    : `<div class="empty">Esta área ainda não tem páginas.</div>`;
}
function decide(status){
  if (!S.adapted.trim()) return say("A versão adaptada não pode ficar vazia.");
  S.hist.unshift({pid:S.sel, nome:pat().nome, hora:hora(), status, adapted:S.adapted});
  S.step = "write";
  say(status === "Aprovada" ? "Aprovada. Já aparece para o paciente e o familiar (demonstração, nada foi enviado)." : "Mensagem rejeitada. Nada foi enviado ou gravado.");
  render();
}


document.addEventListener("click", e => {
  const c = s => e.target.closest(s);
  const ro = c("[data-role]"), v = c("[data-view]"), r = c("[data-pid]"), fl = c("[data-filter]"), a = c("[data-act]");
  if (ro) go(ro.dataset.role);
  else if (v) go(S.role, v.dataset.view);
  else if (r) { S.sel = +r.dataset.pid; S.step = "write"; S.text = pat().nota; go("medico", "pacientes"); }
  else if (fl) { S.f = fl.dataset.filter; render(); }
  else if (a) {
    const act = a.dataset.act;
    if (act === "adapt") {
      if (!S.text.trim()) return say("Escreva a atualização antes de adaptar.");
      S.step = "loading"; render();
      setTimeout(() => { S.adapted = adapt(S.text); S.step = "review"; render(); }, 1400);
    }
    if (act === "back") { S.step = "write"; render(); }
    if (act === "approve") decide("Aprovada");
    if (act === "reject") decide("Rejeitada");
  }
});
document.addEventListener("change", e => {
  if (e.target.id === "fam") { S.fam = +e.target.value; render(); }
  if (e.target.id === "pac") { S.pac = +e.target.value; render(); }
});
document.addEventListener("input", e => {
  if (e.target.id === "nota") S.text = e.target.value;
  if (e.target.id === "adp") S.adapted = e.target.value;
  if (e.target.id === "q") { S.q = e.target.value; $("#plist").innerHTML = listHtml(); }
  if (e.target.id === "hq") { S.hq = e.target.value; $("#hlist").innerHTML = histHtml(hFilter()); }
});
