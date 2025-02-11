import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
     secret : 'supersecretcode',
     signOptions: {
       expiresIn: 3600,
     },
 }) ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy]
})
export class UserModule {}
