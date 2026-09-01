// player.js — o cérebro do player no navegador
// Completem os TODOs seguindo o roteiro da Parte 7 do enunciado.
// (Antes de mexer aqui, o plano_player.md já deve estar commitado!)

// --- Referências aos elementos da página (index.html) ---
const listaEl = document.getElementById('listaMusicas');
const nomeEl = document.getElementById('nomeMusica');
const artistaEl = document.getElementById('artista');
const tagEl = document.getElementById('tag');
const letraEl = document.getElementById('letra');
const contadorEl = document.getElementById('contador');
const btnTocar = document.getElementById('btnTocar');

// --- Estado do player ---
// Guarda a música escolhida (objeto completo, com as partes)
let musicaAtual = null;

// O mesmo sleep do karaokê no terminal, agora no navegador
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Passo 2 (roteiro 7.3) — busca GET /api/musicas e monta a playlist
async function carregarPlaylist() {
    const resposta = await fetch('http://localhost:3000/api/musicas', {
        method: 'GET'
    })

    const dados = await resposta.json()

    dados.forEach(musica => {
        const li = document.createElement("li")
        li.textContent = musica.nome
        li.addEventListener('click', () => escolherMusica(musica.id))
        listaEl.appendChild(li)
    });
    // TODO: fazer o fetch de '/api/musicas' e converter com resposta.json()
    // TODO: para cada música, criar um <li> com "nome — artista",
    //       adicionar item.addEventListener('click', () => escolherMusica(musica.id))
    //       e colocar na lista com listaEl.appendChild(item)
}

// Passo 3 (roteiro 7.4) — busca GET /api/musicas/:id e prepara o palco
async function escolherMusica(id) {
    const resposta = await fetch(`http://localhost:3000/api/musicas/${id}`, {
        method: 'GET'
    })

    musicaAtual = await resposta.json()
    nomeEl.textContent = musicaAtual.nome
    artistaEl.textContent = musicaAtual.artista
    btnTocar.disabled = false

    // TODO: buscar a música completa (com partes) na API
    // TODO: guardar o resultado em musicaAtual
    // TODO: mostrar nome e artista no palco (nomeEl, artistaEl)
    // TODO: habilitar o botão Tocar (btnTocar.disabled = false)
}

// Passo 4 (roteiro 7.5) — percorre as partes com await sleep até o final
    async function tocar() {
        btnTocar.disabled = true
        for (let i = 0; i < musicaAtual.partes.length; i++) {
            const parte = musicaAtual.partes[i];

            letraEl.innerHTML += `${parte.letra} <br>`;

            const proximaParte = musicaAtual.partes[i + 1];

            if (proximaParte) {
                const intervalo = proximaParte.tempo - parte.tempo;
                await sleep(intervalo);
            }
        }
        letraEl.innerHTML += `FIM`
        btnTocar.disabled = false
    }

    // TODO: implementar seguindo o roteiro 7.5
    //       (desabilitar o botão, percorrer as partes mostrando tag, letra
    //        e contador "parte X de Y", esperar o tempoEspera de cada uma,
    //        mostrar a mensagem de fim e reabilitar o botão)


btnTocar.addEventListener('click', tocar);

// Ponto de partida: quando a página carrega, monta a playlist
carregarPlaylist();