const express = require('express');
const logger = require('./src/middlewares/logger');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.get('/', (req,res) =>{
    res.json({ message: 'TaskFlow API çalışıyor'});
});

app.use('/api/tasks', taskRoutes);

app.listen(PORT,() => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});