import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import {Request, Response} from "express";
import * as cors from 'cors';
import * as helmet from 'helmet';
import routes from './routes';


const PORT = process.env.PORT || 3090; // le puse el 3090 porque el 3000 me daba que ya estaba en uso

createConnection().then(async () => {

    // create express app
    const app = express();
    // Middlewares
    app.use(cors());
    app.use(helmet());

    app.use(express.json());

    //routes
    app.use('/', routes);

    // start express server
    app.listen(PORT, () => console.log(`Servidor en puerto ${PORT} `));

   

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
