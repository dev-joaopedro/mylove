
// Data de início do relacionamento
const dataInicio = new Date(2024,5,10);

// Função para calcular o tempo do relacionamento
  function calcularTempo() {
    const dataAtual = new Date();
    const tempo = dataAtual.getTime() - dataInicio.getTime();
    const segundos = Math.floor(tempo / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / getDiasNoMes(new Date().getMonth(), new Date().getFullYear()));
    const anos = Math.floor(meses / 12);

    return `${anos} anos, ${meses % 12} meses, ${dias % getDiasNoMes(new Date().getMonth(), new Date().getFullYear())} dias, ${horas % 24} horas, ${minutos % 60} minutos e ${segundos % 60} segundos`;
}
  
  function getDiasNoMes(mes, ano) {
    switch (mes) {
      case 0: // janeiro
      return 31;
      case 1: // fevereiro
      return 29;
      case 2: // março
      return 31;
      case 3: // abril
      return 30;
      case 4: // maio
      return 31;
      case 5: // junho
      return 30;
      case 6: // julho
      return 31;
      case 7: // agosto
      return 31;
      case 8: // setembro
      return 30;
      case 9: // outubro
      return 31;
      case 10: // novembro
      return 30;
      case 11: // dezembro
        if (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) {
          return 29; // ano bissexto
        } else {
          return 28;
        }
      default:
        throw new Error(`Mês inválido: ${mes}`);
    }
  }

// Intervalo para atualizar o contador de tempo a cada segundo
setInterval(() => {
    document.getElementById('contador-tempo').innerHTML = `Juntos há ${calcularTempo()}`;
}, 1000);
