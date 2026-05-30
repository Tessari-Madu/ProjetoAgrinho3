/* ========================= */
/* VARIÁVEIS GLOBAIS */
/* ========================= */

let progresso = 0;

let solo = false;
let agua = false;
let bio = false;

/* ========================= */
/* BARRA DE PROGRESSO */
/* ========================= */

function atualizarBarra() {

    document.getElementById("progresso").style.width =
    progresso + "%";

}

/* ========================= */
/* TROCAR FASE */
/* ========================= */

function irParaFase(numero){

    document
    .querySelectorAll(".fase")
    .forEach(fase => {
        fase.classList.remove("ativa");
    });

    document
    .getElementById("fase" + numero)
    .classList.add("ativa");

    const porcentagens = {
        1: 5,
        2: 20,
        3: 40,
        4: 60,
        5: 80,
        6: 100
    };

    progresso = porcentagens[numero];
    atualizarBarra();

    if(numero === 5){
        atualizarCenario();
    }

    atualizarMapaJogo(numero);
}

/* ========================= */
/* CENTRO DE CONHECIMENTO */
/* ========================= */

function mostrarAba(id){

    document
    .querySelectorAll(".aba-conteudo")
    .forEach(aba => {

        aba.classList.remove("ativa-aba");

    });

    document
    .getElementById(id)
    .classList.add("ativa-aba");

}

/* ========================= */
/* APLICAR TECNOLOGIAS */
/* ========================= */

function aplicar(tipo, elemento){

    if(tipo === "solo" && !solo){

        solo = true;

        elemento.classList.add("usado");

    }

    if(tipo === "agua" && !agua){

        agua = true;

        elemento.classList.add("usado");

    }

    if(tipo === "bio" && !bio){

        bio = true;

        elemento.classList.add("usado");

    }

    atualizarScore();

    elemento.classList.add("impacto");

setTimeout(() => {
    elemento.classList.remove("impacto");
}, 400);

}

/* ========================= */
/* RECUPERAÇÃO AMBIENTAL */
/* ========================= */

function atualizarCenario(){

    if(!(solo && agua && bio)){

        document.getElementById("conquistas").innerHTML = `
        ⚠️ A recuperação ainda não está completa.
        <br>
        Aplique todas as tecnologias primeiro.
        `;

        return;
    }

    /* sensores */

    const umidade =
    document.getElementById("umidade");

    const ph =
    document.getElementById("ph");

    const nutrientes =
    document.getElementById("nutrientes");

    if(umidade){

        umidade.innerHTML =
        "💧 Umidade: 95%";

    }

    if(ph){

        ph.innerHTML =
        "🧪 pH: 6.8";

    }

    if(nutrientes){

        nutrientes.innerHTML =
        "🌱 Nutrientes: Alto";

    }

    /* Atualizar barras do diagnóstico */

      document.getElementById("soloBar").style.width = "100%";
      document.getElementById("aguaBar").style.width = "100%";
      document.getElementById("bioBar").style.width = "100%";

      document.getElementById("soloPorcentagem").innerHTML = "100%";
      document.getElementById("aguaPorcentagem").innerHTML = "100%";
      document.getElementById("bioPorcentagem").innerHTML = "100%";

    /* conquistas */

    document.getElementById("conquistas").innerHTML = `

    <h3>🏆 Conquistas Desbloqueadas</h3>

    ✅ Solo Recuperado<br>
    ✅ Água Descontaminada<br>
    ✅ Biodiversidade Restaurada<br>
    ✅ Área Sustentável Criada

    `; 

    atualizarScore();
atualizarNivel();

}

/* ========================= */
/* CERTIFICADO */
/* ========================= */

function finalizarMissao(){

    if(!(solo && agua && bio)){

        alert(
        "Você precisa aplicar todas as tecnologias antes de concluir a missão!"
        );

        return;

    }

    progresso = 100;

    atualizarBarra();

    document
    .querySelectorAll(".fase")
    .forEach(fase => {

        fase.classList.remove("ativa");

    });

    document
    .getElementById("fase6")
    .classList.add("ativa");

}

/* ========================= */
/* INICIALIZAÇÃO */
/* ========================= */

window.onload = function(){

    atualizarBarra();

    const bioTec =
    document.getElementById("bioTec");

    if(bioTec){

        bioTec.classList.add("ativa-aba");

    }

};
let score = 20;

function atualizarScore() {

    let total = 0;

    if (solo) total += 30;
    if (agua) total += 30;
    if (bio) total += 40;

    score = total;

    const el = document.getElementById("scoreValor");
    if (el) el.innerText = score + "%";

    atualizarNivel();
}
function atualizarNivel() {

    const texto = document.getElementById("nivelTexto");

    if (!texto) return;

    if (score <= 30) {
        texto.innerText = "Degradado";
    } 
    else if (score <= 70) {
        texto.innerText = "Em Recuperação";
    } 
    else {
        texto.innerText = "Sustentável 🌿";
    }
}

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3;
        this.speedY = Math.random() * 0.5;
    }

    update() {
        this.y -= this.speedY;
        if (this.y < 0) {
            this.y = canvas.height;
        }
    }

    draw() {
        ctx.fillStyle = "rgba(50,255,120,0.4)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 80; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

function mostrarToast(msg) {

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = "🎮 " + msg;

    document.body.appendChild(toast);

    toast.style.transform = "scale(0.8)";
    setTimeout(() => {
        toast.style.transform = "scale(1)";
    }, 50);

    setTimeout(() => {
        toast.remove();
    }, 2200);
}

function atualizarMapaJogo(faseAtual){

    const etapas = document.querySelectorAll(".etapa");

    etapas.forEach(etapa => {

        const fase = Number(etapa.dataset.fase);

        // limpa estado
        etapa.classList.remove("ativa");
        etapa.classList.remove("desbloqueada");

        // desbloqueia até fase atual
        if(fase <= faseAtual){
            etapa.classList.add("desbloqueada");
        }

        // marca fase atual
        if(fase === faseAtual){
            etapa.classList.add("ativa");
        }

    });
}

