import express, { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import mustache from 'mustache-express';
import passport from 'passport';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';


dotenv.config();

const server = express();
server.use(cors());
server.set('view engine', 'mst');
server.set('views', path.join(__dirname, 'views'));
server.use(express.static(path.join(__dirname, '/public')));
server.use(express.urlencoded({extended: true}));
server.use(passport.initialize());
server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }));
server.use(apiRoutes);
server.engine('mst',mustache(__dirname + '/views/partials' ,'.mst'));
server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

server.use(function(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', "*");
    res.header('Access-Control-Expose-Headers', 'x-access-token'); //essta linha habilita o token no header
    next();
  });

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'Ocorreu algum erro.' });
}
server.use(errorHandler);

server.listen(process.env.PORT);
console.log("Servidor:http://localhost:4000");