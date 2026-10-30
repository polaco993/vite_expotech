const row = (p,on) => `<button class="row ${on?"on":""}" data-pid="${p.id}" aria-pressed="${!!on}">
  <span class="t"><b>${p.nome}</b><small>${p.leito} · ${p.motivo}</small></span>${badge(p.status)}</button>`;
const listHtml = () => {
  const l = PATIENTS.filter(p => p.nome.toLowerCase().includes(S.q.toLowerCase()));
  return l.length ? l.map(p => row(p, p.id === S.sel)).join("") : `<div class="empty">Nenhum paciente encontrado.</div>`;
};
const histHtml = items => items.length ? items.map(h => `<div class="hist">
  <div class="head"><b>${h.nome} <small>às ${h.hora}</small></b><span>${badge(h.status)}<button class="btn sm" data-pid="${h.pid}">Abrir paciente</button></span></div><p>${esc(h.adapted)}</p></div>`).join("")
  : `<div class="empty">Nenhuma atualização registrada ainda.</div>`;

function composer(){
  const steps = `<div class="steps"><span class="${S.step==="write"?"on":""}">Registrar</span><span class="${S.step!=="write"?"on":""}">Adaptar e revisar</span></div>`;
  if (S.step === "write") return steps + `<label for="nota">Atualização clínica</label>
    <textarea id="nota">${esc(S.text)}</textarea>
    <div class="actions"><button class="btn pri" data-act="adapt">Adaptar linguagem</button></div>`;
  if (S.step === "loading") return steps + `<div class="loading" role="status"><span class="spin"></span>Adaptando o texto (simulação local)…</div>`;
  return steps + `<div class="ai-tag">Adaptação simulada localmente. Revise antes de aprovar.</div>
    <div class="compare">
      <div><label for="orig">Texto original</label><textarea id="orig" readonly>${esc(S.text)}</textarea></div>
      <div><label for="adp">Versão adaptada (editável)</label><textarea id="adp">${esc(S.adapted)}</textarea></div>
    </div>
    <div class="actions">
      <button class="btn" data-act="back">Editar original</button>
      <button class="btn bad" data-act="reject">Rejeitar</button>
      <button class="btn pri" data-act="approve">Aprovar</button>
    </div>`;
}

const TITLES = {
  painel:["Bom dia, Dra. Camila", new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"})],
  pacientes:["Pacientes","Escolha um paciente e registre uma atualização."],
  historico:["Histórico","Atualizações registradas nesta demonstração."]
};
const VIEWS = {
  painel(){
    const aten = PATIENTS.filter(p => p.status !== "Estável");
    const aprov = S.hist.filter(h => h.status === "Aprovada").length;
    return `<div class="stats">
      <div class="stat"><b>${PATIENTS.length}</b><span>Pacientes acompanhados</span></div>
      <div class="stat"><b>${aten.length}</b><span>Em atenção ou observação</span></div>
      <div class="stat"><b>${aprov}</b><span>Mensagens aprovadas</span></div>
      <div class="stat"><b>${S.hist.length - aprov}</b><span>Mensagens rejeitadas</span></div></div>
    <div class="cols">
      <section><h2>Precisam da sua atenção</h2><div class="list">${aten.map(p => row(p)).join("")}</div></section>
      <section><h2>Atualizações recentes</h2><div class="list">${histHtml(S.hist.slice(0,3))}</div></section></div>`;
  },
  pacientes(){
    const p = pat();
    const detail = p ? `<div class="head"><h3>${p.nome}</h3>${badge(p.status)}</div>
      <div class="meta"><div><small>Idade</small>${p.idade} anos</div><div><small>Local</small>${p.leito}</div>
      <div><small>Destinatário autorizado</small>${p.resp}</div></div>${composer()}`
      : `<div class="empty">Selecione um paciente para registrar uma atualização.</div>`;
    return `<div class="split"><div><div class="search"><input id="q" aria-label="Buscar paciente" placeholder="Buscar paciente" value="${esc(S.q)}"></div>
      <div class="list" id="plist">${listHtml()}</div></div><div class="panel">${detail}</div></div>`;
  },
  historico(){
    const chips = [["todas","Todas"],["Aprovada","Aprovadas"],["Rejeitada","Rejeitadas"]].map(([k,l]) =>
      `<button class="chip ${S.f===k?"on":""}" data-filter="${k}" aria-pressed="${S.f===k}">${l} <small>${k==="todas"?S.hist.length:S.hist.filter(h => h.status===k).length}</small></button>`).join("");
    return `<div class="toolbar"><div class="chips">${chips}</div><div class="search"><input id="hq" aria-label="Buscar no histórico" placeholder="Buscar por paciente" value="${esc(S.hq)}"></div></div>
      <div class="list" id="hlist">${histHtml(hFilter())}</div>`;
  }
};

const hFilter = () => S.hist.filter(h => (S.f === "todas" || h.status === S.f) && h.nome.toLowerCase().includes(S.hq.toLowerCase()));
