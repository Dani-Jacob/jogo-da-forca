document.addEventListener("DOMContentLoaded", function (event) {
    let elementGameOver = document.getElementById("gameOver");
    let elementVitoria = document.getElementById("vitoria");
    let elementLetraRepetida = document.getElementById("letraRepetida");
    let elementLetraNaoEncontrada = document.getElementById("l_n_encontrada");

    let palavras = ["passaro", "abelha", "borboleta", "libelula", "formiga", "elefante", "girafa", "leopardo", "tigre", "leao", "zebra", "rinoceronte", "hipopotamo", "crocodilo", "canguru", "esquilo", "castor", "raposa", "coelho", "hamster", "golfinho", "baleia", "tubarao", "polvo", "estrela", "planeta", "cometa", "galaxia", "universo", "molecula", "atomo", "eletron", "proton", "neutron", "quimica", "fisica", "biologia", "geologia", "historia", "filosofia", "literatura", "musica", "pintura", "escultura", "danca", "teatro", "cinema", "fotografia", "arquitetura", "matematica", "geografia", "astronomia", "psicologia", "sociologia", "economia", "politica", "religiao", "cultura", "ciencia", "tecnologia", "informacao", "conhecimento", "aprendizado", "ensino", "pesquisa", "descoberta", "invencao", "criacao", "imaginacao", "inspiracao", "motivacao", "emocao", "sentimento", "pensamento", "memoria", "percepcao", "consciencia", "identidade", "personalidade", "carater", "virtude", "liberdade", "justica", "igualdade", "fraternidade", "solidariedade", "compaixao", "generosidade", "gratidao", "humildade", "paciencia", "coragem", "perseveranca", "determinacao", "disciplina", "responsabilidade", "honestidade", "integridade", "dignidade", "respeito", "tolerancia", "diversidade", "inclusao", "cooperacao", "harmonia", "paz", "amor"];
    let palavraSorteada = [];
    let palavraUsuario = [];
    let letrasEscolhidas = [];
    let tentativas = 0;

    iniciarJogo();

    document.getElementById('botaoEnviar').addEventListener('click', function() {
        elementLetraRepetida.style.display = "none";
        elementLetraNaoEncontrada.style.display = "none";

        let valorInput = document.getElementById("chute").value;
        limparInput();
        if(valorInput.toString().trim() == ""){
            return 0;
        }

        if(validarValorInput(valorInput)){
            realizarTentativa(valorInput.trim().toUpperCase())
        }else{
            marcarErro();
        }
        limparInput();
    });

    
    for(let el of document.getElementsByClassName('botaoReiniciar')){
        el.addEventListener('click', function() {
        iniciarJogo();
        });
    }

    function validarValorInput(input) {
        console.log("INPUT: " + input);
        var regex = /^[a-zA-Z]$/;
        let rs = regex.test(input);
        return rs;
    }

    function limparInput(){
        let elementInput = document.getElementById("chute");
        elementInput.value = "";
    }

    function realizarTentativa(letra) {
        //Atualiza as letras já escolhidas, se retornar -1, a letra já foi escolhida antes
        if (adicionarLetraEscolhida(letra) == -1) {
            avisarLetraRepetida();
            return -1;
        };

        //Obtem os indices em que a letra existe na palavra sorteada
        let indicesLetra = obterIndicesLetra(letra);
        //Caso o array esteja vazio, a letra não existe em nenhuma posição
        if (indicesLetra.length == 0) {
            elementLetraNaoEncontrada.style.display = "block";
            marcarErro();
            return -1;
        }
        marcarLetraCerta(indicesLetra,letra);
        verificarVitoria();
        return 0;
    }

    function verificarVitoria(){
        if(JSON.stringify(palavraSorteada) == JSON.stringify(palavraUsuario)){
            ganharJogo();
        }
    }

    function obterIndicesLetra(letra) {
        let indices = palavraSorteada.reduce((result, element, index) => {
            if (element.trim().toUpperCase() == letra.trim().toUpperCase()) {
                result.push(index);
            }
            return result;
        }, []);
        return indices;
    }

    function marcarLetraCerta(indexes,letra) {
        for (let index of indexes ) {
            palavraUsuario[index] = letra;
        }
        refreshPalavraUsuario(palavraUsuario);
    }

    function refreshPalavraUsuario(palavra){
        let elementPalavraTentativa = document.getElementById("Palavra");
        if (Array.isArray(palavra)) {
            let palavraTela = palavra.map(x => x.trim() == "" ? x = " _ " : x += " ");
            elementPalavraTentativa.innerHTML = palavraTela.toString().replace(/\,/g, "");
        }else{
            elementPalavraTentativa.innerHTML = palavra;
        }
    }

    function adicionarLetraEscolhida(letra) {
        if (letrasEscolhidas.indexOf(letra) != -1) {
            return -1;
        }
        letrasEscolhidas.push(letra.trim().toUpperCase());
        atualizarLetrasEscolhidasTela();
        return 0;
    }

    function atualizarLetrasEscolhidasTela(){
        let elementLetrasEnvidasTela = document.getElementById("letrasEnviadas");
        elementLetrasEnvidasTela.innerHTML = letrasEscolhidas.toString();
    }

    function marcarErro() {
        tentativas++;
        verificarTentativas();
        verificarImagemForca();
    }

    function verificarImagemForca(){
        let elementImg = document.getElementById("imgForca");
        switch(tentativas){
            case 0:
                elementImg.setAttribute("src","assets/images/forca.png");
                break;
            case 1:
                elementImg.setAttribute("src","assets/images/forca+cabeca.png");
                break;
            case 2:
                elementImg.setAttribute("src","assets/images/forca+cabeca+corpo.png");
                break;
            case 3:
                elementImg.setAttribute("src","assets/images/forca+cabeca+corpo+braco1.png");
                break;
            case 4:
                elementImg.setAttribute("src","assets/images/forca+cabeca+corpo+braco1+braco2.png");
                break;
            case 5:
                elementImg.setAttribute("src","assets/images/forca+cabeca+corpo+braco1+braco2+perna1.png");
                break;
            case 6:
                elementImg.setAttribute("src","assets/images/forca+cabeca+corpo+braco1+braco2+perna1+perna2.png");
                break;
        }
    }
    function avisarLetraRepetida() {
        elementLetraRepetida.style.display = "block";
    }

    function verificarTentativas(){
        if(tentativas >= 6){
            gameOver();
        }
    }
    function gameOver(){
        refreshPalavraUsuario(palavraSorteada);
        elementGameOver.style.display = "block";
    }

    function ganharJogo(){
        refreshPalavraUsuario(palavraSorteada);
        elementVitoria.style.display = "block";
    }

    function iniciarJogo() {
        //Limpar as variaveis
        palavraUsuario = [];
        letrasEscolhidas = [];
        tentativas = 0;
        //Dar none nas telas
        elementGameOver.style.display = "none";
        elementVitoria.style.display = "none";
        elementLetraRepetida.style.display = "none";
        elementLetraNaoEncontrada.style.display = "none";

        //Sorteia palavra nova e recomeça o jogo
        palavraSorteada = palavras[Math.floor(Math.random()*100)].toUpperCase().split("");
        palavraUsuario = new Array(palavraSorteada.length).fill("");
        refreshPalavraUsuario(palavraUsuario);
        atualizarLetrasEscolhidasTela();
        //console.log(`Palavra sorteada: ${palavraSorteada.toString()}`)
        verificarImagemForca();
    }
});