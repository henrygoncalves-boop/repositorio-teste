const btnCaixa = document.querySelector('#caixa');
const btnAlerta = document.querySelector('#alerta');
const btnCard = document.querySelector('#card');

btnCaixa.classList.add("Destaque");
btnAlerta.classList.add("Oculto");
btnCard.classList.add("Erro");

console.log("Caixa tem Destaque?", btnCaixa.classList.contains("Destaque"));
console.log("Alerta está oculto?", btnAlerta.classList.contains("Oculto"));
console.log("Card tem erro?", btnCard.classList.contains("Erro"));