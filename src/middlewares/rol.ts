import {Request, Response, NextFunction} from 'express';
import {User} from '../entity/User';

import { getRepository } from 'typeorm';


 export const checkRol = (roles:Array<string>)=>{
    return async (req: Request, res: Response, next: NextFunction)=>{
        const {id} = res.locals.jwtPayload;
        const userRepository = getRepository(User);
        let usuario: User

        try{
            usuario = await userRepository.findOneOrFail(id);
        }
        catch(e){
            return res.status(401).send();
        }


        const {rol} = usuario;
        if(roles.includes(rol)){
            next();

        } else {
            res.status(401).json({message: 'No autorizado'});
        }


    }
}
