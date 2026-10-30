// Páginas nativas, registradas no mesmo sistema que qualquer página nova usa.
const IC = {
  painel:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  pacientes:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14.2c2.6.3 4.5 2.2 4.5 5.3"/>',
  historico:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  inicio:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  atualizacoes:'<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>',
  privacidade:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>'
};

const reg = (role, list, T, V, counts = {}) => list.forEach(([id, label]) => registerPage(role, {
  id, label, icon: IC[id], count: counts[id], title: () => T()[id][0], sub: () => T()[id][1], render: () => V[id]()}));
reg("medico", [["painel","Painel"],["pacientes","Pacientes"],["historico","Histórico"]], () => TITLES, VIEWS, {historico: () => S.hist.length});
reg("paciente", [["inicio","Início"],["historico","Histórico"],["privacidade","Privacidade"]], PTITLES, PVIEWS, {historico: () => pacMsgs().length});
reg("familiar", [["atualizacoes","Atualizações"],["historico","Histórico"],["privacidade","Privacidade"]], FTITLES, FVIEWS, {historico: () => famMsgs().length});
