const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3001;

let servicos = [
    { id: 1, nome: "O Jabô Bar Jardim", tipo: "Bar", descricao: "Local agradável e descontraído." },
    { id: 2, nome: "Parque do Ingá", tipo: "Parque", descricao: "Ótimo para encontros diurnos e caminhadas." }
];

app.use(cors({ origin: '*' }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('API OndeVamos está rodando. Use /servicos para acessar os dados.');
});

app.get('/servicos', (req, res) => {
    res.json(servicos);
});

app.get('/servicos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const servico = servicos.find(s => s.id === id);
    if (servico) {
        res.json(servico);
    } else {
        res.status(404).send('Serviço não encontrado');
    }
});

app.post('/servicos', (req, res) => {
    const novoServico = req.body;
    const newId = servicos.length > 0 ? Math.max(...servicos.map(s => s.id)) + 1 : 1;
    novoServico.id = newId;

    servicos.push(novoServico);
    res.status(201).json(novoServico);
});

app.put('/servicos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = servicos.findIndex(s => s.id === id);

    if (index !== -1) {
        servicos[index] = { ...req.body, id };
        res.json(servicos[index]);
    } else {
        res.status(404).send('Serviço não encontrado para edição');
    }
});

app.delete('/servicos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = servicos.length;
    
    servicos = servicos.filter(s => s.id !== id);

    if (servicos.length < initialLength) {
        res.status(204).send();
    } else {
        res.status(404).send('Serviço não encontrado para exclusão');
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor da API rodando em http://localhost:${PORT}`);
});