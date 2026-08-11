const express = require('express');
const path = require('path')

const app = express();
const musicaDAO = require('../karaoke/DAO/musicaDAO.js');

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    const html = path.join(__dirname,'public', 'index.html')

    res.sendFile(html)
})

app.get('/api/musicas', (req, res) => {
    const musicas = musicaDAO.listarTodas();

    const resumo = [];

    for (let i = 0; i < musicas.length; i++) {
        const m = musicas[i];

        resumo.push({
            id: m.id,
            nome: m.nome,
            artista: m.artista,
            totalPartes: m.partes.length
        });
    }

    res.status(200).json(resumo);
});

app.get('/api/musicas/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            erro: 'ID deve ser um número'
        });
    }

    const musica = musicaDAO.buscarPorId(id);

    if (!musica) {
        return res.status(404).json({
            erro: `Música com id ${id} não encontrada`
        });
    }

    res.status(200).json(musica);
});

app.post('/api/musicas', (req, res) => {
    const { nome, artista } = req.body;
    
    if (!nome || !artista) {
        return res.status(400).json({
            erro: 'Campos obrigatórios: nome, artista'
        });
    }

    const novaMusica = musicaDAO.inserir(nome, artista);

    res.status(201).json(novaMusica);
});

app.put('/api/musicas/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            erro: 'ID deve ser um número'
        });
    }

    const { nome, artista } = req.body;

    if (!nome || !artista) {
        return res.status(400).json({
            erro: 'Campos obrigatórios: nome, artista'
        });
    }

    const musicaAtualizada = musicaDAO.atualizar(
        id,
        nome,
        artista
    );

    if (!musicaAtualizada) {
        return res.status(404).json({
            erro: `Música com id ${id} não encontrada`
        });
    }

    res.status(200).json(musicaAtualizada);
});

app.delete('/api/musicas/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            erro: 'ID deve ser um número'
        });
    }

    const musicaRemovida = musicaDAO.remover(id);

    if (!musicaRemovida) {
        return res.status(404).json({
            erro: `Música com id ${id} não encontrada`
        });
    }

    res.status(200).json({
        mensagem: 'Música removida com sucesso',
        musica: musicaRemovida
    });
});

app.use((err, req, res, next) => {
    console.error('Erro no servidor:', err.message);

    res.status(500).json({
        erro: 'Erro interno do servidor'
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});