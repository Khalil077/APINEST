import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: "localhost",
    port: 3306, 
    username: "root",
    password: "", 
    database: "Bibliothéque",
    autoLoadEntities: true,
    synchronize: false,
  }), BookModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
