import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from './decorators/get-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('uzer')
export class UzerController {

    
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @Get('id')
    getmyid(@GetUser('id') userId: number) {
        return userId;
    }

    @Patch()
    editUSer() {}
}
