function valor(atr){
  var elemento = document.getElementsByName(`${atr}score`)[0].value;
  var alvo = document.getElementsByName(`${atr}mod`)[0];
  alvo.value = Math.floor((parseInt(elemento) - 10) / 2);
}