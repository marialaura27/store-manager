const express = require('express');
require('dotenv').config();

const app = express();

const bodyParser = require('body-parser');

const productsControllers = require('./controllers/productsControllers');
const salesControllers = require('./controllers/salesController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsControllers.getAll);

app.get('/products/:id', productsControllers.findById);

app.get('/sales', salesControllers.getAll);

app.get('/sales/:id', salesControllers.findById);

app.post('/products', productsControllers.create);

app.post('/sales', salesControllers.create);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
