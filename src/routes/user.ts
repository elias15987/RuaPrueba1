import { Router} from 'express';
import { UserController } from './../controller/UserController';
import {checkJwt} from './../middlewares/jwt';
import {checkRol} from './../middlewares/rol';


const router = Router();

//Obtener todos los usuarios
router.get('/', UserController.obtenerTodo);

//Obtener un solo usuario
router.get('/:id',[checkJwt, checkRol(['admin'])], UserController.obtenerUno);

//Crear nuevo usuario
router.post('/',[checkJwt, checkRol(['admin'])], UserController.crear);

//Editar usuario
router.patch('/:id',[checkJwt, checkRol(['admin'])], UserController.editar);

///Borrar usuario
router.delete('/:id',[checkJwt, checkRol(['admin'])], UserController.eliminar);

export default router;