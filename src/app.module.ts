import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import * as dotenv from 'dotenv';

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
  }), BookModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
