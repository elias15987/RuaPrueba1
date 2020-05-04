import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm";
import{MinLength, IsNotEmpty} from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['user'])
export class User {

    @PrimaryGeneratedColumn()
   id: number;

    @Column()
    @MinLength(6)
    user: string;

    @Column()
    @MinLength(6)
    password: string;

    @Column()
    @IsNotEmpty()
    nombre: string;

    
    @Column()
    @IsNotEmpty()
    apellido: string;

    
    @Column()
    @IsNotEmpty()
    email: string;

    
    @Column()
    @IsNotEmpty()
    rol: string;

    
    @Column()
    @IsNotEmpty()
    estado: string;

    @Column()
    @CreateDateColumn()
    creattedAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    hashPassword():void{//esto es para encriptar el password
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string):boolean {//esto es para desencriptar el password
        return bcrypt.compareSync(password, this.password);
    }

    
}
