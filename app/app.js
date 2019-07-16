import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import debug from 'debug';
import expressValidator from 'express-validator';


const debugg = debug('http');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router);
app.get('/', (req, res) => {
    res.status(200).send(
        'Welcome to PropertyPro-lite...',
    );
});
app.listen(PORT, () => {
    debugg(`Server is running on port ${PORT}`);
});

export default app;