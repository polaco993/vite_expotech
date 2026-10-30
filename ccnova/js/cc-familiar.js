// Visão do familiar: mensagens APROVADAS + resumo do paciente.
const famPat = () => PATIENTS.find(p => p.id === S.fam);
const famMsgs = () => S.hist.filter(h => h.pid === S.fam && h.status === "Aprovada");
const SITU = {"Estável":"Estável","Atenção":"Em acompanhamento próximo","Observação":"Em observação"};
const FTITLES = () => { const p = famPat(); return {
  atualizacoes:["Olá, " + p.resp.split(" (")[0], "Atualizações sobre " + p.nome + " aprovadas pela equipe."],
  historico:["Histórico","Todas as mensagens aprovadas sobre " + p.nome + "."],
  privacidade:["Privacidade","O que você pode ver e por quê."] }; };
const msgHtml = m => `<div class="hist"><div class="head"><b>Equipe médica <small>às ${m.hora}</small></b></div><p>${esc(m.adapted)}</p></div>`;
const FVIEWS = {
  atualizacoes(){
    const p = famPat(), m = famMsgs();
    const left = m.length
      ? `<section class="hero"><small>Última atualização · ${m[0].hora}</small><p>${esc(m[0].adapted)}</p><small>Mensagem revisada e aprovada pela equipe médica.</small></section>` +
        (m.length > 1 ? `<h2>Mensagens anteriores</h2><div class="list">${m.slice(1).map(msgHtml).join("")}</div>` : "")
      : `<div class="list"><div class="empty">Ainda não há atualização aprovada para ${p.nome}. Quando a equipe aprovar uma mensagem, ela aparece aqui.</div></div>`;
    return demoSelect("fam","Entrar como (demonstração)",S.fam,x => x.resp) +
      `<div class="fgrid"><div>${left}</div><aside class="aside"><h2>${p.nome}</h2><dl>
        <dt>Local</dt><dd>${p.leito}</dd><dt>Situação geral</dt><dd>${SITU[p.status]}</dd>
        <dt>Seu vínculo</dt><dd>${p.resp.match(/\((.*)\)/)[1]}</dd></dl></aside></div>`;
  },
  historico(){ const m = famMsgs(); return m.length ? `<div class="list">${m.map(msgHtml).join("")}</div>`
    : `<div class="list"><div class="empty">Nenhuma mensagem aprovada ainda.<br><br><button class="btn" data-view="atualizacoes">Voltar às atualizações</button></div></div>`; },
  privacidade(){ return `<div class="two">
    <section><h2>Você vê</h2><ul><li>Mensagens revisadas e aprovadas pela equipe médica</li><li>Local e situação geral do paciente</li><li>Linguagem simples, sem termos técnicos</li></ul></section>
    <section><h2>Você não vê</h2><ul><li>Anotações clínicas originais</li><li>Mensagens rejeitadas pela equipe</li><li>Informações de outros pacientes</li></ul></section></div>`; }
};
