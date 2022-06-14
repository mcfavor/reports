import { Controller, Post, Body } from '@nestjs/common';
import { createUserdto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService) {

    }

    @Post('/signup')
    createUser(@Body() body: createUserdto) {
        console.log(body);
    }
}
