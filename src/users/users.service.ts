import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserdto } from './dtos/create-user.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {
        
    }

    async createUser(dto: createUserdto) {
        const hash = await argon.hash(dto.password);

       try {
            const User = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    
                },
            });
    
            return this.signToken(User.id, User.email);
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new ForbiddenException('Credentials Taken');
            }
            throw error;
          }
        }
    }

    async signin(dto: createUserdto) {
        const user =await this.prisma.user.findUnique({
            where: {
                email: dto.email
            } 
        })

        if (!user) throw new ForbiddenException('Incorrect Credentials');

        const pwmatches = await argon.verify(user.hash, dto.password);

        if (!pwmatches) throw new ForbiddenException('Incorrect Credentials');


        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId, email
        };

        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, { expiresIn: '50m', secret: secret });

        return {
            access_token: token,
        };
    }

}

