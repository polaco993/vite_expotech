// Visão do paciente: linguagem direta, só mensagens APROVADAS sobre ele.
const pacPat = () => PATIENTS.find(p => p.id === S.pac);
const pacMsgs = () => S.hist.filter(h => h.pid === S.pac && h.status === "Aprovada");
const demoSelect = (id, label, cur, opt) => `<div class="demo"><label for="${id}">${label}</label>
  <select id="${id}">${PATIENTS.map(p => `<option value="${p.id}" ${p.id===cur?"selected":""}>${opt(p)}</option>`).join("")}</select></div>`;
const PTITLES = () => ({
  inicio:["Olá, " + pacPat().nome.split(" ")[0], "Aqui estão as novidades sobre a sua saúde."],
  historico:["Histórico","Todas as mensagens que sua equipe aprovou."],
  privacidade:["Sua privacidade","Quem vê as suas informações."]
});
const PVIEWS = {
  inicio(){
    const p = pacPat(), m = pacMsgs();
    return demoSelect("pac","Entrar como (demonstração)",S.pac,x => x.nome) +
      (m.length ? `<section class="hero"><small>Novidade da sua equipe · ${m[0].hora}</small><p>${esc(m[0].adapted)}</p><small>Revisada e aprovada pelo seu médico.</small></section>`
        : `<section class="hero"><p>Ainda não há novidades. Quando sua equipe aprovar uma mensagem, ela aparece aqui.</p></section>`) +
      `<div class="who-sees"><h2>Quem recebe suas atualizações</h2><p>${p.resp}</p></div>` +
      (m.length > 1 ? `<h2>Mensagens anteriores</h2><div class="list">${m.slice(1).map(msgHtml).join("")}</div>` : "");
  },
  historico(){ const m = pacMsgs(); return m.length ? `<div class="list">${m.map(msgHtml).join("")}</div>`
    : `<div class="list"><div class="empty">Nenhuma mensagem aprovada ainda.<br><br><button class="btn" data-view="inicio">Voltar ao início</button></div></div>`; },
  privacidade(){ return `<div class="two">
    <section><h2>Só você e quem você autorizou veem</h2><ul><li>As mensagens aprovadas pela sua equipe</li><li>Seu local de atendimento e situação geral</li></ul></section>
    <section><h2>Ninguém recebe</h2><ul><li>Mensagens que o médico rejeitou</li><li>Anotações técnicas sem revisão</li></ul></section></div>`; }
};
