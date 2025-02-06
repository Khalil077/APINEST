import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookEntity } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([BookEntity])],//call entity w nsajelha fl bd bch mbaeed najem naaml 
  // injection f service w bhedhy yetsajeli el book fl bd
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
