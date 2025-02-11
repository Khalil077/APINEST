import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

@Controller('user')
export class UserController {
    constructor(private userS:UserService) {

    }
    
@UseGuards(JwtAuthGuard,AdminGuard)
@Get('all') 
getall() {
    return this.userS.findallusers()
}
@Post('add') 
ajouter(@Body() body ) {
    return this.userS.createUser(body)
}
@Post('login')
async SignIn(@Body() body) { 
    return await  this.userS.login(body)
}
}
