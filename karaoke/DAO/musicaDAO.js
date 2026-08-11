const { Musica } = require('../musica');

class MusicaDAO {
    constructor() {
        this.musicas = [];
        this.proximoId = 1;

        this._carregarDadosIniciais();
    }

    _carregarDadosIniciais() {
        const myHero = this.inserir('My Hero', 'Foo Fighters');

        // Aqui serão adicionadas as partes da música,
        // usando myHero.addParte(...)
        // Se você já tiver as partes no seu player.js,
        // podemos colocar elas aqui depois.
    }

    listarTodas() {
        return this.musicas;
    }

    buscarPorId(id) {
        return this.musicas.find( m => m.id === id) || null;
    }

    inserir(nome, artista) {
        const novaMusica = new Musica(nome, artista);

        novaMusica.id = this.proximoId++;

        this.musicas.push(novaMusica);

        return novaMusica;
    }

    atualizar(id, nome, artista) {
        const musica = this.buscarPorId(id);

        if (!musica) {
            return null;
        }

        musica.nome = nome;
        musica.artista = artista;

        return musica;
    }

    remover(id) {
        const indice = this.musicas.findIndex(m => m.id === id);

        if (indice === -1) {
            return null;
        }

        return this.musicas.splice(indice, 1)[0];
    }
}

module.exports = new MusicaDAO();