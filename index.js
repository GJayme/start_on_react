const express =  require('express')

const server = express();

// localhost:30000/teste

server.get('/teste', (req, res) => {
    return res.json({ message: 'Hello Word' });
})

server.listen(3000);