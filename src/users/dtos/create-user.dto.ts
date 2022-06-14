import { IsEmail, IsString } from 'class-validator';

export class createUserdto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}