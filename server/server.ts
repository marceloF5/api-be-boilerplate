import * as http from 'http';
import Api from './api/api';

const models = require('./models');

const config = require('./config/env/config')();

const server = http.createServer(Api);
models.sequelize.sync().then(() => {
    //server.listen(3000, () => console.log('Server is running on port 3000')); //OR
    server.listen(3000);
    server.on('listening', () => console.log(`Server is running on port 3000`));
    server.on('error', (error: NodeJS.ErrnoException) => console.log(`Error: ${error}`));
})

