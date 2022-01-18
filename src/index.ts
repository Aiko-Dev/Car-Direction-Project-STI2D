import express from 'express';
import path from 'path';
import logger from './utils/logger';

const app = express();

const fileDir = path.join(__dirname, '../public');

app.use(express.static(fileDir));
app.get('/', (req, res) => {
    res.sendFile(fileDir + '/index.html')
});

app.listen(1234, () => {
    logger.success("Web server listening on port 1234");
})