const express = require('express');
const app = express();
const logger = require('./middleware/logger');

//Init middleware
//app.use(logger);

app.use('/api/vehicles', require('./routes/vehicles'));

app.use('/api/partgroups', require('./routes/partgroups'));

//app.use('/api/parts', require('./routes/parts'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));