let palavras = ["passaro", "abelha", "borboleta", "libelula", "formiga", "elefante", "girafa", "leopardo", "tigre", "leao", "zebra", "rinoceronte", "hipopotamo", "crocodilo", "canguru", "esquilo", "castor", "raposa", "coelho", "hamster", "golfinho", "baleia", "tubarao", "polvo", "estrela", "planeta", "cometa", "galaxia", "universo", "molecula", "atomo", "eletron", "proton", "neutron", "quimica", "fisica", "biologia", "geologia", "historia", "filosofia", "literatura", "musica", "pintura", "escultura", "danca", "teatro", "cinema", "fotografia", "arquitetura", "matematica", "geografia", "astronomia", "psicologia", "sociologia", "economia", "politica", "religiao", "cultura", "ciencia", "tecnologia", "informacao", "conhecimento", "aprendizado", "ensino", "pesquisa", "descoberta", "invencao", "criacao", "imaginacao", "inspiracao", "motivacao", "emocao", "sentimento", "pensamento", "memoria", "percepcao", "consciencia", "identidade", "personalidade", "carater", "virtude", "liberdade", "justica", "igualdade", "fraternidade", "solidariedade", "compaixao", "generosidade", "gratidao", "humildade", "paciencia", "coragem", "perseveranca", "determinacao", "disciplina", "responsabilidade", "honestidade", "integridade", "dignidade", "respeito", "tolerancia", "diversidade", "inclusao", "cooperacao", "harmonia", "paz", "amor"];

let palavraSorteada = [];
let palavraUsuario = [];
let letrasEscolhidas = [];
let tentativas = 0;

iniciarJogo();

realizarTentativa("A");
console.log(palavraUsuario);
console.log(letrasEscolhidas);

function cliqueBotao(){
    //pega letra

}

function realizarTentativa(letra){
    //Atualiza as letras já escolhidas
    atualizarLetrasEscolhidas(letra);

    //Obtem os indices em que a letra existe
    let rs = verificarLetra(letra);
    //Caso o array esteja vazio, a letra não existe em nenhuma posição
    if(rs.length == 0){
        marcarErro();
        return -1;
    }
    //Atualiza a palavra com a letra
    for(let x of rs){
        palavraUsuario[x] = letra;
    }
    atualizarPalavra();
    return 0;
}

function verificarLetra(letra){
    let indices = palavraSorteada.reduce((result, element, index) => {
        if (element.trim().toUpperCase() == letra.trim().toUpperCase()) {
            result.push(index);
        }
        return result;
    }, []);
    return indices;
}

function atualizarPalavra(){
    //altera a palavra demonstrada na tela
}

function atualizarLetrasEscolhidas(letra){
    if(letrasEscolhidas.indexOf(letra) != -1){
        return -1;
    }
    letrasEscolhidas.push(letra.trim().toUpperCase());
    return 0;
}

function marcarErro(){
    //marca um erro
}
function avisarLetraRepetida(){

}



function iniciarJogo(){
    //palavraSorteada = palavras[Math.floor(Math.random(0,100)*100)].toUpperCase().split("");
    palavraSorteada = "ABACAXI".split("");
    palavraUsuario = new Array(palavraSorteada.length).fill("");
    tentativas = 0;
    console.log(`Palavra sorteada: ${palavraSorteada.toString()}`)
}