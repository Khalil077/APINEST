import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { AuthorModule } from './book/author/author.module';
import * as dotenv from 'dotenv';
import { FirstMiddleware } from './book/first/first.middleware';
import { SecondMiddleware } from './book/second/second.middleware';

dotenv.config();// we need to add this so file .env worked 
@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.APP_HOST,
    port: Number(process.env.PORT), 
    username: process.env.APP_USERNAME,
    password: process.env.APP_PWD, 
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: false,
  }), BookModule, AuthorModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  implements NestModule{

  configure(consumer:MiddlewareConsumer) {
    consumer.apply(FirstMiddleware).forRoutes(''); //kn nheb naadi toules les routes lezm nhot au moins chaine vide 
    consumer.apply(SecondMiddleware).forRoutes({ 
      path:'/book*' ,
      method:RequestMethod.POST,


    }) ;
  }
}
