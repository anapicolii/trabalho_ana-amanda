const { Musica } = require("../musica");
const { Parte } = require("../parte");

class MusicaDAO {
    constructor() {
        // "Banco de dados" em memória
        this.musicas = [];
        this.proximoId = 0;

        this._carregarDadosIniciais();
    }

    listarTodas() {
        return this.musicas;
    }

    buscarPorId(id) {
        return this.musicas.find(m => m.id === id) || null;
    }

    inserir(nome, artista) {
        const novaMusica = new Musica(nome, artista);
        novaMusica.id = this.proximoId++;

        this.musicas.push(novaMusica);

        return novaMusica;
    }

    adicionarPartes(idMusica, parte) {
        if (!(parte instanceof Parte)) {
            return false;
        }

        const musica = this.buscarPorId(idMusica);

        if (!musica) {
            return false;
        }

        musica.addParte(parte);
        return true;
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

    _carregarDadosIniciais() {

        const myHero = this.inserir("My Hero", "Foo Fighters");

        const tooAlarmin = "Too alarmin now to talk about \n Take your pictures down and shake it out";
        const truthOrCon = "Truth or consequence, say it aloud \n Use that evidence, race it around";
        const thereGoes = "There goes my hero";

        myHero.addParte(
            new Parte(tooAlarmin, 4000, "verso1")
        );

        myHero.addParte(
             new Parte(truthOrCon, 4000, "verso2")
        );

        myHero.addParte(
            new Parte(thereGoes, 5000, "verso3")
        );
    
    }
}

module.exports = new MusicaDAO();