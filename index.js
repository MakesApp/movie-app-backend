import express from 'express';
import './services/DB/mongoose.js';
import cors from 'cors';
import logger from './services/logger/index.js';

logger.info('text info', { meta: 1 });
logger.warn('text warn');
logger.error('text error');
logger.debug('text debug');
logger.error(new Error('something went wrong'));

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
// app.use("/api", router);
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
