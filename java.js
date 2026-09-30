// Perguntas do quiz
const perguntas = [
    {
        area: "Redes",
        pergunta: "Qual protocolo é utilizado para acessar páginas da internet?",
        alternativas: ["HTTP", "FTP", "SMTP"],
        correta: "HTTP"
    },

    {
        area: "Linguagem C",
        pergunta: "Qual símbolo é utilizado para finalizar uma instrução em C?",
        alternativas: [";", ":", "."],
        correta: ";"
    },

    {
        area: "Sistemas Operacionais",
        pergunta: "Qual destes é um sistema operacional?",
        alternativas: ["Linux", "HTML", "MySQL"],
        correta: "Linux"
    },

    {
        area: "Banco de Dados",
        pergunta: "Qual comando SQL é utilizado para consultar dados?",
        alternativas: ["SELECT", "DELETE", "DROP"],
        correta: "SELECT"
    }
];


// ==========================================
// getElementById
// ==========================================

const titulo = document.getElementById("titulo");
const nome = document.getElementById("nome");
const btnIniciar = document.getElementById("btnIniciar");
const btnProxima = document.getElementById("btnProxima");
const quiz = document.getElementById("quiz");
const placar = document.getElementById("placar");


// ==========================================
// getElementsByTagName
// ==========================================

const titulos = document.getElementsByTagName("h1");


// ==========================================
// getElementsByClassName
// ==========================================

const alternativas = document.getElementsByClassName("alternativa");


// ==========================================
// querySelectorAll
// ==========================================

const todasAlternativas = document.querySelectorAll(".alternativa");


// Variáveis do quiz
let perguntaAtual = 0;
let pontos = 0;
let respostaSelecionada = false;


// ==========================================
// Evento INPUT
// Verifica o nome em tempo real
// ==========================================

nome.addEventListener("input", function () {

    if (nome.value.trim() !== "") {
        btnIniciar.disabled = false;
    } else {
        btnIniciar.disabled = true;
    }

});


// ==========================================
// Evento CLICK
// Iniciar o quiz
// ==========================================

btnIniciar.addEventListener("click", function () {

    titulo.textContent = "Olá, " + nome.value + "! Vamos começar o quiz!";

    document.getElementById("inicio").classList.add("escondido");

    quiz.classList.remove("escondido");

    mostrarPergunta();

});


// ==========================================
// Mostrar pergunta
// ==========================================

function mostrarPergunta() {

    respostaSelecionada = false;

    const pergunta = perguntas[perguntaAtual];

    const perguntaElemento = document.getElementById("pergunta");

    perguntaElemento.textContent =
        pergunta.area + ": " + pergunta.pergunta;


    // Utilizando getElementsByTagName
    titulos[0].textContent =
        "Questão " + (perguntaAtual + 1) + " de 4";


    // Utilizando getElementsByClassName
    for (let i = 0; i < alternativas.length; i++) {

        alternativas[i].textContent = pergunta.alternativas[i];

        alternativas[i].classList.remove("correta");
        alternativas[i].classList.remove("incorreta");
        alternativas[i].classList.remove("destacada");

    }

}


// ==========================================
// querySelectorAll
// Evento de CLICK nas alternativas
// ==========================================

todasAlternativas.forEach(function (alternativa) {

    alternativa.addEventListener("click", function () {

        if (respostaSelecionada) {
            return;
        }

        respostaSelecionada = true;

        const resposta =
            alternativa.textContent;

        const correta =
            perguntas[perguntaAtual].correta;


        if (resposta === correta) {

            alternativa.classList.add("correta");

            pontos++;

        } else {

            alternativa.classList.add("incorreta");

        }

    });

});


// ==========================================
// mouseover e mouseout
// ==========================================

todasAlternativas.forEach(function (alternativa) {

    alternativa.addEventListener("mouseover", function () {

        if (!respostaSelecionada) {
            alternativa.classList.add("destacada");
        }

    });


    alternativa.addEventListener("mouseout", function () {

        alternativa.classList.remove("destacada");

    });

});


// ==========================================
// CLICK - Próxima questão
// ==========================================

btnProxima.addEventListener("click", function () {

    if (!respostaSelecionada) {
        alert("Escolha uma alternativa primeiro!");
        return;
    }

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        quiz.innerHTML =
            "<h2>Quiz finalizado!</h2>" +
            "<p>Parabéns, " + nome.value + "!</p>" +
            "<p>Você acertou " + pontos +
            " de " + perguntas.length + " questões.</p>";

    }

});


// ==========================================
// Evento KEYDOWN
// ==========================================

document.addEventListener("keydown", function (evento) {

    console.log("Tecla pressionada:", evento.key);

    // ENTER avança para a próxima questão
    if (evento.key === "Enter") {

        if (!quiz.classList.contains("escondido") &&
            respostaSelecionada) {

            btnProxima.click();

        }

    }

});
