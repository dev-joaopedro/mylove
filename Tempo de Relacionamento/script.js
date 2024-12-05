// Data de início do relacionamento
const dataInicio = new Date(2024, 5, 8); // Representa 8 de junho de 2024 (mês indexado em 0, então 5 é junho).

// Função para calcular o tempo do relacionamento
function calcularTempo() {
    const dataAtual = new Date(); // Obtém a data e hora atuais.

    // Calcula os anos, meses e dias diretamente usando um objeto temporário
    let anos = dataAtual.getFullYear() - dataInicio.getFullYear();
    let meses = dataAtual.getMonth() - dataInicio.getMonth();
    let dias = dataAtual.getDate() - dataInicio.getDate();

    // Ajusta os meses e anos se necessário
    if (dias < 0) {
        meses--; // Se os dias são negativos, retira 1 mês.
        const ultimoDiaMesAnterior = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0).getDate(); // Obtém o último dia do mês anterior.
        dias += ultimoDiaMesAnterior; // Ajusta os dias somando os dias do mês anterior.
    }
    if (meses < 0) {
        anos--; // Se os meses são negativos, retira 1 ano.
        meses += 12; // Ajusta os meses adicionando 12.
    }

    // Calcula a diferença em horas, minutos e segundos
    const diferencaMilissegundos = dataAtual - new Date(dataInicio.getFullYear() + anos, dataInicio.getMonth() + meses, dataInicio.getDate());
    const horas = Math.floor(diferencaMilissegundos / (1000 * 60 * 60)) % 24;
    const minutos = Math.floor(diferencaMilissegundos / (1000 * 60)) % 60;
    const segundos = Math.floor(diferencaMilissegundos / 1000) % 60;

    // Retorna uma string formatada com a duração do relacionamento
    return `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
}

// Intervalo para atualizar o contador de tempo a cada segundo
setInterval(() => { 
    // Atualiza o conteúdo do elemento com id 'contador-tempo' com o cálculo do tempo do relacionamento.
    document.getElementById('contador-tempo').innerHTML = `Juntos há ${calcularTempo()}`;
}, 1000); // Define o intervalo de atualização para 1 segundo (1000 milissegundos).
