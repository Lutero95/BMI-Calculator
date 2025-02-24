const express = require('express');
const routes = require('./routers');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/bmi-calculator', routes);

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});
