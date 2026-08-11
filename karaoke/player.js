//script principal

const { sleep } = require('./utils');
const { Musica } = require('./musica');
const { Parte } = require('./parte');

const musica = new Musica('My Hero', 'Foo Fighters');
const tooAlarmin = 'Too alarmin now to talk about \n Take your pictures down and shake it out';
const truthOrCon = 'Truth or consequence, say it aloud \n Use that evidence, race it around';
const thereGoes = 'There goes my hero';
const watchHim = 'Watch him as he goes';
const hesOrdinary = 'He\'s ordinary';
const dontTheBest = 'Don\'t the best of them bleed it out';
const whileTheRest = 'While the rest of them peter out?';
const kudos = 'Kudos, my hero \nLeavin all the best';
const youKnow = 'You know my hero \nThe one thats on';

musica.addParte(
    new Parte(tooAlarmin, 4000, 'verso1')
);
musica.addParte(
    new Parte(truthOrCon, 4000, 'verso2')
);

musica.addParte(new Parte( thereGoes, 5000, 'verso3') );

async function play() {
    try {
        for (const parte of musica.partes) {
            console.log( " -- " + parte.tag + " --" );
            console.log( "> " + parte.letra );
            await sleep( parte.tempoEspera );
        }
    } catch (error) {
        console.log("Erro ao tocar música: " + error.message);
    }
}

module.exports = {musica, play};
