const express = require('express');
const loginRouter = require('./routers/login');
const userRouter = require('./routers/user');
const categoryRouter = require('./routers/category');
const handleError = require('./middlewares/handleError');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);

app.use(handleError);