// Dados 100% fictícios, apenas para demonstração.
const PATIENTS = [
  {id:1,nome:"Helena Duarte",idade:67,leito:"Leito 12",motivo:"Pós-operatório de quadril",status:"Estável",resp:"Marta Duarte (filha)",
   nota:"Paciente em pós-operatório de artroplastia de quadril, afebril e hemodinamicamente estável. Analgesia adequada, iniciada deambulação assistida. Previsão de alta hospitalar em 48 horas."},
  {id:2,nome:"Carlos Mendes",idade:54,leito:"Leito 07",motivo:"Crise hipertensiva",status:"Atenção",resp:"Sônia Mendes (esposa)",
   nota:"Admitido com hipertensão não controlada e dispneia aos esforços. Iniciado ajuste medicamentoso, com evolução favorável nas últimas 12 horas. Mantido em observação."},
  {id:3,nome:"Lucas Andrade",idade:8,leito:"Leito 03",motivo:"Pneumonia",status:"Observação",resp:"Paula Andrade (mãe)",
   nota:"Quadro de pneumonia em antibioticoterapia, afebril há 24 horas. Dispneia em melhora. Realizados exames laboratoriais de controle."},
  {id:4,nome:"Rosa Ferreira",idade:72,leito:"Leito 15",motivo:"Diabetes descompensada",status:"Atenção",resp:"Paulo Ferreira (filho)",
   nota:"Glicemia ainda oscilante, com edema leve em membros inferiores. Ajustada a insulina. Nova avaliação em exames laboratoriais amanhã."},
  {id:5,nome:"Tiago Batista",idade:41,leito:"Leito 09",motivo:"Recuperação de apendicectomia",status:"Estável",resp:"Ana Batista (esposa)",
   nota:"Pós-operatório sem intercorrências, afebril, com deambulação e boa aceitação da dieta. Alta hospitalar prevista para amanhã."}
];
const GLOSSARY = [
  ["pós-operatório","recuperação após a cirurgia"],["afebril","sem febre"],
  ["hemodinamicamente estável","com a circulação do sangue estável"],["analgesia adequada","dor controlada"],
  ["deambulação assistida","caminhadas com ajuda"],["deambulação","caminhadas"],["alta hospitalar","ida para casa"],
  ["hipertensão","pressão alta"],["dispneia","falta de ar"],["antibioticoterapia","tratamento com antibiótico"],
  ["glicemia","açúcar no sangue"],["edema","inchaço"],["exames laboratoriais","exames de sangue"],
  ["evolução favorável","melhora"],["intercorrências","complicações"]
];
// Simulação local: troca termos técnicos por linguagem simples. Não usa IA real.
const adapt = t => "Olá! Segue uma atualização sobre o estado de saúde: " +
  GLOSSARY.reduce((r,[a,b]) => r.replace(new RegExp(a,"gi"), b), t);

const TONE = {"Estável":"b-ok","Atenção":"b-warn","Observação":"b-info","Aprovada":"b-ok","Rejeitada":"b-bad"};
const S = {role:"medico", fam:5, pac:5, f:"todas", hq:"", view:"painel", sel:null, q:"", step:"write", text:"", adapted:"", hist:[
  {pid:5,nome:"Tiago Batista",hora:"08:40",status:"Aprovada",adapted:"Olá! Segue uma atualização: a recuperação após a cirurgia segue bem, sem febre."},
  {pid:1,nome:"Helena Duarte",hora:"07:55",status:"Rejeitada",adapted:"Texto rejeitado por omitir a previsão de ida para casa."},
  {pid:5,nome:"Tiago Batista",hora:"18:10 de ontem",status:"Aprovada",adapted:"Olá! Segue uma atualização: Tiago passou bem pela cirurgia e já está descansando."}
]};
