const express =  require('express')

const server = express();

server.use(express.json());

const users = ['Diego', 'Cláudio', 'Victor'];

// Rota de mostrar todos os usuários:
server.get('/users', (req, res) => {
    return res.json(users);
})
// Rota de mostrar um único usuário por meio do seu index:
server.get('/users/:index', (req, res) => {
    const { index }  = req.params; 
    return res.json(users[index]);
})
// Rota de criação de usuários:
server.post('/users', (req,res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

// Rota para editar algum usuário:
server.put('/users/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

// Rota para deletar algum usuário:
server.delete('/users/:index', (req,res) => {
    const { index } = req.params;

    users.splice(index, 1);

    return res.send();
});



server.listen(3000); 