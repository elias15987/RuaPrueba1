import { Router } from 'express';
import AuthController from '../controller/AuthController';


const router = Router();

//login
router.post('/login', AuthController.login);
//registro
router.post('/registro', AuthController.registro);

export default router;