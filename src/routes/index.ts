import { Router } from 'express';

import auth from './auth';
import user from './user';


const routes = Router();

//const API_URI = 'http://localhost:3090';


routes.use('/auth', auth);
routes.use('/users', user);

export default routes;