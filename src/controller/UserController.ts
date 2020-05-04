import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { validate } from 'class-validator';

export class UserController {

 static obtenerTodo = async (req:Request, res:Response) => {
     const userRepository = getRepository(User);
    const users = await userRepository.find();
    if (users.length > 0){
        res.send(users);
    } else {
        res.status(404).json({message: 'No hay resultados'});
    }
 }

 static obtenerUno = async(req:Request, res:Response) => {
     const {id} = req.params;
     const userRepository = getRepository(User);
     try{
        const user = await userRepository.findOneOrFail(id);
        res.send(user);
     }
     catch(e){
         res.status(404).json({message: 'Sin resultado'});
     }
 }


 static crear = async(req:Request, res:Response) => {
     const {user, password, nombre, apellido, email, estado, rol} = req.body;
     const usuario = new User
    
     usuario.user = user;
     usuario.password = password;
     usuario.nombre = nombre;
     usuario.apellido = apellido;
     usuario.email = email;
     usuario.rol = rol;
     usuario.estado = estado;

     //Validacion
     const validationOpt = {valodationError: {target: false, value:false}};

        const errores = await validate(usuario, validationOpt);
     if(errores.length > 0){
         return res.status(400).json(errores);
     }

     const userRepository = getRepository(User);
     try{
         usuario.hashPassword();
         await userRepository.save(usuario);
     }
     catch(e){
         return res.status(409).json({message: 'Usuario ya existe'});
     }

     //Todo ok
     res.send ('Usuario Creado');

    }


    static editar = async(req: Request, res: Response) => {
        let usuario;
        const {id} = req.params;
        const {user, password, nombre, apellido, email, rol, estado} = req.body;
        
        const userRepository = getRepository(User);

        try{
            usuario = await userRepository.findOneOrFail(id);
        }
        catch(e){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        usuario.user = user;
        usuario.password = password;
        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.email = email;
        usuario.rol = rol;
        usuario.estado = estado;

        const validationOpt = {valodationError: {target: false, value:false}};

        const errores = await validate(usuario, validationOpt);
        if(errores.length > 0){
            return res.status(400).json(errores);
        }

        try{
            await userRepository.save(usuario);
        }
        catch(e){
            return res.status(409).json({message: 'Usuario actualmente en uso'});
        }

        res.status(201).json({message: 'Usuario editado'});
    }


    static eliminar = async (req:Request, res:Response) => {
        const {id} = req.params;
        const userRepository = getRepository(User);
        let usuario: User;

        try{
            usuario = await userRepository.findOneOrFail(id);
        }
        catch(e){
            return res.status(404).json({message: 'Usuario no encontrado'});
        }

        userRepository.delete(id);
        res.status(201).json({message: 'Usuario eliminado'});
    };

}

export default UserController;