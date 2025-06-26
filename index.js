const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public')); // <- Serve os arquivos HTML/CSS/JS do front

let livros = [
  { id: 1, titulo: "A Arte da Guerra", autor: "Sun Tzu" },
  { id: 2, titulo: "O Hobbit", autor: "J.R.R Tolkien" }
];

app.get('/livros', (req, res) => {
  res.json(livros);
});

app.post('/livros', (req, res) => {
  const { titulo, autor } = req.body;
  const novoLivro = {
    id: livros.length + 1,
    titulo,
    autor
  };
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

app.put('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { autor } = req.body;

  const livro = livros.find(l => l.id === id);

  if (!livro) {
    return res.status(404).json({ mensagem: 'Livro não encontrado.' });
  }

  livro.autor = autor;
  res.json({ mensagem: 'Autor atualizado com sucesso.', livro });
});


app.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = livros.findIndex(l => l.id === id);
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Livro não encontrado.' });
  }
  livros.splice(index, 1);
  res.json({ mensagem: 'Livro deletado com sucesso.' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
