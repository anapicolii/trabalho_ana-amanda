class Musica {

    constructor(nome, artista, id) {
        this.nome = nome;
        this.artista = artista;
        this.partes = []; 
        if(!id){ 
            this.id=null;
        }else{
            this.id = id;
        }
    }

    addParte(parte, tempo) { 
        try {
            if( !parte || !tempo ){
                throw new Error("Parte da Musica com problema!");
                
            }

            this.partes.push(parte);

        } catch (error) {
            console.log("Erro ao addParte: " + error.message);
        }
    }

    getLetraInteira(){

        let letra = "";

        this.partes.forEach((parte) => {
            letra += parte.letra;
        });
        return letra;
    }
}

module.exports = {Musica};