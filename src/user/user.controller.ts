import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userS:UserService) {

    }
@Get('all') 
getall() {
    return this.userS.findallusers()
}
@Post('add') 
ajouter(@Body() body ) {
    return this.userS.createUser(body)
}
}
