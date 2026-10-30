// EXEMPLO de página nova. Para criar outra: copie este arquivo, troque perfil/id/label/render
// e inclua <script src="js/cc-minha-pagina.js"></script> no curaconnect-app.html antes do cc-boot.js.
// Ela aparece sozinha no menu e abre em curaconnect-app.html#/medico/agenda
registerPage("medico", {id:"agenda", label:"Agenda", title:"Agenda de hoje",
  sub:"Página de exemplo: foi adicionada pelo registro e entrou no menu sozinha.",
  render:() => `<div class="list">${[["09:30","Rosa Ferreira","Reavaliação de glicemia"],["11:00","Carlos Mendes","Ajuste de medicação"],["14:15","Lucas Andrade","Revisão de exames"]]
    .map(([h,n,m]) => `<div class="hist"><div class="head"><b>${n}</b><span class="badge b-info">${h}</span></div><p>${m}</p></div>`).join("")}</div>`});
