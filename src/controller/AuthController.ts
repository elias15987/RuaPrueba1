import { getRepository } from 'typeorm';
import {Request, Response } from 'express';
import {User} from '../entity/User';
import config from '../config/config';
import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';

class AuthController {
    static login = async (req: Request, res: Response) => {
        const {user, password} = req.body;

        if( !(user && password)){//esto se encarga de comprobar que tengamos lo que necesitamos para el login
            return res.status(400).json({message: 'Usuario y contraseña son requeridos'});
        }

        const userRepository = getRepository(User);
        let usuario: User;

        try{
            usuario = await userRepository.findOneOrFail({where:{user}}) //en caso de tener los datos buscamos ese usuario
        }
        catch(e){
            return res.status(400).json({message: 'Usuario o Contraseña incorrectos'});
        }

        //con esto se checkea la password
        if(!usuario.checkPassword(password)){
           return res.status(400).json({message: ' Usuario o contraseña incorrecta'});
        }

        const token = jwt.sign({id: usuario.id, user: usuario.user}, config.jwtSecret, {expiresIn: '1h'});

        res.json({message: 'OK', token});
    }

    static registro = async(req:Request, res:Response) => {
        const {user, password, nombre, apellido, email, estado, rol} = req.body;
        const usuario = new User
       
        usuario.user = user;
        usuario.password = password;
        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.email = email;
        usuario.rol = 'cliente';
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

};

export default AuthController;