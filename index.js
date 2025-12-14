const express = require('express');
const app = express(); 
const port = 8080; 

app.use(express.json());
let pessoas = [
    {id: 1, nome: 'Pessoa 1'},
    {id: 2, nome: 'Pessoa 2'},
    {id: 3, nome: 'Pessoa 3'}
];

app.listen(port, () => {
    console.log(`Servidor em execução: http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Olá! Minha API Express está rodando!'); // Responde com texto
  // res.json({ mensagem: 'Olá! Minha API Express está rodando!' }); // Ou JSON
});

app.get('/pessoas', (req,res) => {
    res.json(pessoas);
});

app.get('/pessoa/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const  pessoa = pessoa.find(i =>  i.id === id);
    if (pessoa) {
        res.json(pessoa);
    } else {
        res.status(404).json({error: 'Pessoa não encontrada.'});
    }
});

app.post('/pessoas', (req,res) => {
    const { nome } = req.body;
    const novaPessoa = {
        id: pessoas.length + 1,
        nome
    };
    pessoa.push(novaPessoa);
    res.status(201).json(novaPessoa);
});

app.put('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome } = req.body;
    const pessoa = pessoas.find(i => i.id === id);
    if (pessoa) {
        pessoa.nome = nome;
        res.json(pessoa);
    } else {
        res.status(404).json({ error: 'Pessoa não encontrada.'});
    }
});

app.delete('pessoas/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const index = pessoas.findIndex(i => i.id === id);
    if (index !== -1) {
        const pessoaDeletada = pessoas.splice(index, 1);
        res.json(pessoaDeletada[0]);
    } else {
        res.status(404).json({ error: 'Pessoa não encontrada'});
    }
});