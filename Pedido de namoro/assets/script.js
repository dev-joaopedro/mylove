confirm("Are you sure you want to delete?")
$(document).ready(function(){

    $(".mudaTela").click(function(){
        mudaTela( $(this), $(this).attr("nova"), $(this).attr("animacao"), $(this).attr("tempoAnimacao") );
    });

    $("a.opcoes").click(function(e){
        e.preventDefault();
        $("div.opcoes").slideToggle(500);
    });

    $(".calendario .marcado").click(function(){
        mostraMsgMes($(this).attr("value"));
    });

    const mudaTela = ( atual, nova = null, animacao = "fade", tempoAnimacao = 900 ) => {

        // define a nova tela
        if(!nova){
            nova = parseInt(atual.parent().attr("id").split("tela")[1])+1;
        }

        if(animacao == "fade"){
            $("#tela"+(nova-1)).fadeOut(tempoAnimacao);
            setTimeout(() => {
                $("#tela"+nova).fadeIn(tempoAnimacao)
            }, tempoAnimacao);
        }else{
            $("#tela"+(nova-1)).hide(tempoAnimacao);
            $("#tela"+nova).show(tempoAnimacao);
        }

        if($("#tela"+nova).hasClass("temporizado")){
            $("#tela"+nova+" div").hide();
            telaTemporizada(nova, 0);
        }

        verificaFundo(nova);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(nova == 5){
            var audio = new Audio('assets/musica.mp3');
            audio.volume = 0.1;
            audio.play();
        }
        
    }

    const telaTemporizada = ( nTela, contador ) =>{

        const tela = $("#tela"+nTela+" div:eq("+contador+")");
        const temporizador = 500;
        const temporizadorPrimeiraTela = (contador==0?$("#tela"+nTela).attr("tempo"):temporizador);

        setTimeout(() => {
            tela.fadeIn(temporizador);

            setTimeout(() => {
                tela.fadeOut(temporizador);
                if(tela.attr("final") == "true"){
                    mudaTela(null, nTela+1, "fade", 900);
                    verificaFundo(nTela+1);
                }else{
                    telaTemporizada(nTela, contador+1);
                }

            }, tela.attr("tempo") );

        }, temporizadorPrimeiraTela);
        
    }

    const verificaFundo = (nTela) =>{

        const fundo = $("#tela"+nTela).attr("fundo");
        const tempo = $("#tela"+nTela).attr("tempo");

        if(fundo){
            $("body").attr("class", fundo);            
        }
        
    }

    const mostraMsgMes = (texto) =>{

        let titulo;
        let mensagem;

        switch(texto){
            case "23/5": titulo = "23 de Maio de 2024"; mensagem = "<p>Bom, foi o começo de tudo. Aonde criei coragem e te chamei no Instagram. E logo de cara tivemos uma conversa bem esquisita eu diria pra primeiro contato. Mas, mesmo você tentando não ser tão fofa, eu mantive minha calma e continuei conversando, continuei sendo apenas. E graças a isso tudo mudou um dia depois! </p>";break;
            case "24/5": titulo = "24 de Maio de 2024"; mensagem = "<p>Sim, saímos para conversar do dia seguinte em que te chamei. Novidade isso pra mim, mas fomos né, e ficamos lá no carro durante algumas horas. Pra ser mais exato até umas 3 horas da manhâ.</p>";break;
            case "25/5": titulo = "25 de Maio de 2024"; mensagem = "<p>Primeiro date e mais incrivél provavelmente, tudo fluiu como se nós já tivessemos nos conhecidos a muito tempo. Foi tudo muito bom e perfeito. E partir desse dia eu descobri que eu provavelmente já estava apaixnoado nesse seu sorriso.</p>";break;
            case "28/5": titulo = "28 de Maio de 2024"; mensagem = "<p>Um dia inédito para mim eu diria, foi o dia em que levei uma garota para conhecer minha mãe e sua sogra atualmente né. Estava mais nervoso do que você mas você se saiu bem, gostei da sua atuação como uma boa nora.</p>";break;
            case "30/5": titulo = "30 de Maio de 2024"; mensagem = "<p>Esse dia foi loucura, acordei cedo para ir para outra cidade conhecer sua família, eu estava MUITO nervoso. Tinha dormido muitoo mal, tava ansiosos de mais tambem. Mas quando cheguei lá, vi que não tinha necessidade de tanto nervosismo, porque eu senti que era pessoas do bem, pessoas de coração bom.</p>";break;
            case "1/6": titulo = "01 de Junho de 2024"; mensagem = "<p>O dia mais esperado eu diria, conhecer seus pais... Mas sinceramente, foi tudo tão tranquilo, tão natural que eu me senti em casa aquele dia, mesmo não conhecendo ninguém. Um dos melhores dias do final de semana.</p>";break;
            case "final": titulo = "08 de Junho de 2024"; mensagem = "<section class='text-center mt-5 mb-5'><p><strong>O dia em que ela disse<br><span class='letra2 letra-vermelha'>SIM</span></strong></p></section>";break;
        }

        mostraPopUp(true, titulo, mensagem);
        telaFinal = (texto=="final"?true:false);
    }

    

});

let telaFinal = false;

const mostraPopUp = (mostrar, titulo = "Título de testes", mensagem = "Mensagem de teste...") =>{

    if(mostrar){
        $("html, body").animate({ scrollTop: $(".pop-up")[0].offsetTop }, "smooth");
        $(".pop-up").fadeIn(500);
        $(".pop-up h1").html(titulo);
        $(".pop-up div").html(mensagem);
        $(".container").css("opacity", "0.5");
    }else{
        $(".pop-up").fadeOut(500);
        $(".container").css("opacity", "1");

        if(telaFinal){
            $("#tela19").fadeOut(4000);
            setTimeout(() => {
                $("#tela20").fadeIn(6500);
                $("body").attr("class", "fundo6");    
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }, 4000);
        }

    }

}