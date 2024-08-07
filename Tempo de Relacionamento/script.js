
// Data de início do relacionamento
const dataInicio = new Date(2024,5,9);

// Índice da foto atual
let indiceFoto = 0;

// Índice do texto atual
let indiceTexto = 0;

// Função para calcular o tempo do relacionamento
function calcularTempo() {
    const dataAtual = new Date();
    const tempo = dataAtual.getTime() - dataInicio.getTime();
  
    const anos = Math.floor(tempo / (1000 * 60 * 60 * 24 * 365.25)); // considera anos bissextos
    const meses = Math.floor((tempo % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * getDiasNoMes(dataInicio.getMonth(), dataInicio.getFullYear())));
    const dias = Math.floor((tempo % (1000 * 60 * 60 * 24 * getDiasNoMes(dataInicio.getMonth(), dataInicio.getFullYear()))) / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((tempo % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((tempo % (1000 * 60)) / 1000);
  
    return `${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
  }
  
  function getDiasNoMes(mes, ano) {
    switch (mes) {
      case 0: // janeiro
      case 2: // março
      case 4: // maio
      case 6: // julho
        return 31;
      case 7: // agosto
        return 31;
      case 9: // outubro
      case 11: // dezembro
        return 31;
      case 3: // abril
      case 5: // junho
        return 30;
      case 8: // setembro
      case 10: // novembro
        return 30;
      case 1: // fevereiro
        if (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) {
          return 29; // ano bissexto
        } else {
          return 28;
        }
      default:
        throw new Error(`Mês inválido: ${mes}`);
    }
  }

// Função para mudar a foto
function mudarFoto() {
    // Esconder a foto anterior
    document.getElementById('foto').classList.add('esconder');

    // Aguardar 1 segundo antes de mostrar a nova foto
    setTimeout(() => {
        // Mostrar a nova foto
        document.getElementById('foto').src = fotos[indiceFoto];
        document.getElementById('foto').classList.remove('esconder');
        indiceFoto = (indiceFoto + 1) % fotos.length;

        // Agendar a próxima mudança de foto
        setTimeout(mudarFoto, 5000);
    }, 1000);
}

// Função para mudar o texto
function mudarTexto() {
    document.getElementById('texto').innerHTML = textos[indiceTexto];
    indiceTexto = (indiceTexto + 1) % textos.length;
}

// Iniciar a mudança de foto
mudarFoto();

// Intervalo para mudar o texto a cada 10 segundos
setInterval(mudarTexto, 10000);

// Intervalo para atualizar o contador de tempo a cada segundo
setInterval(() => {
    document.getElementById('contador-tempo').innerHTML = `Juntos há ${calcularTempo()}`;
}, 1000);
