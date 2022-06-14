import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private repo: User) {
        
    }

    create(email: string, password: string) {
        this.repo.email;
        this.repo.hash;

         return this.repo.email, this.repo.hash;
    }

}
