
/* seleciona os elementos do carrossel */
const slides = document.querySelectorAll(".slide");
const containerIndicadores = document.querySelector(".indicadores");
const botaoAnterior = document.querySelector(".anterior");
const botaoProximo = document.querySelector(".proximo");
const carrossel = document.querySelector(".carrossel");

/* define o slide inicial */
let indiceAtual = 0;

/* tempo de troca automática em milissegundos */
const tempo = 5000;

/* controla o avanço automático */
let intervalo;

/* cria um indicador para cada slide */
slides.forEach((slide, indice) => {

    const indicador = document.createElement("button");

    indicador.classList.add("indicador");
    indicador.setAttribute(
        "aria-label",
        `Ir para o slide ${indice + 1}`
    );

    /* permite selecionar o slide pelo indicador */
    indicador.addEventListener("click", () => {
        indiceAtual = indice;
        mostrarSlide(indiceAtual);
        iniciarCarrossel();
    });

    containerIndicadores.appendChild(indicador);

});

/* seleciona os indicadores criados */
const indicadores = containerIndicadores.querySelectorAll(".indicador");

/* mostra o slide selecionado */
function mostrarSlide(indice) {

    slides.forEach(slide => {
        slide.classList.remove("ativo");
    });

    indicadores.forEach(indicador => {
        indicador.classList.remove("ativo");
    });

    slides[indice].classList.add("ativo");
    indicadores[indice].classList.add("ativo");

}

/* avança para o próximo slide */
function proximoSlide() {

    indiceAtual++;

    if (indiceAtual >= slides.length) {
        indiceAtual = 0;
    }

    mostrarSlide(indiceAtual);

}

/* volta para o slide anterior */
function slideAnterior() {

    indiceAtual--;

    if (indiceAtual < 0) {
        indiceAtual = slides.length - 1;
    }

    mostrarSlide(indiceAtual);

}

/* inicia o avanço automático */
function iniciarCarrossel() {

    clearInterval(intervalo);

    intervalo = setInterval(proximoSlide, tempo);

}

/* botão de avançar */
botaoProximo.addEventListener("click", () => {

    proximoSlide();
    iniciarCarrossel();

});

/* botão de voltar */
botaoAnterior.addEventListener("click", () => {

    slideAnterior();
    iniciarCarrossel();

});

/* pausa quando o mouse entra no carrossel */
carrossel.addEventListener("mouseenter", () => {

    clearInterval(intervalo);

});

/* retoma quando o mouse sai do carrossel */
carrossel.addEventListener("mouseleave", () => {

    iniciarCarrossel();

});

/* mostra o primeiro slide e inicia o carrossel */
if (slides.length > 0) {

    mostrarSlide(indiceAtual);
    iniciarCarrossel();

}