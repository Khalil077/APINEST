import { Injectable, NotFoundException } from '@nestjs/common';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity) //inject instance of bookentity fl class hedha(candidat service) 
        private BookRepository: Repository<BookEntity>, //kol entity aandha repository  (repository pour gérer les entités )
      ) {}
      create(book): Promise<BookEntity> { //promises y bch taatik resultat yaa bch taatik erreur
     
    
        return this.BookRepository.save(book); //save fonction ml typeorm tsajali candidat f bd
    }
    findAll(): Promise<BookEntity[]> {  
        return this.BookRepository.find(
        );
      }
      findbyid(id: number): Promise<BookEntity[] | null> {
        return this.BookRepository.find({
          where: { id: id }, //this.taskRepository.findOneBy({ id:id });
          //loadRelationIds: true,//tdhaherlek cle etrangeres

        });
      }
      async updateBook(book,id) { 
        let b= await this.BookRepository.preload(
           { id:id ,
              ...book
           }
        ) // preload naateha entity wtbadeli fih
        if (!b) throw new NotFoundException(`Book with title "${id}" not found`) 
         this.BookRepository.save(b)
      }
      async removeBook(id) {//mademni bch nestaaml remove lezmni ngetti el book  khatr remove lezm entity mch ken el id 
        let tabBookToRemove=await this.findbyid(id) ;
        if (tabBookToRemove.length==0)  { throw new NotFoundException(`Book with title "${id}" not found`) }
      
        return this.BookRepository.remove(tabBookToRemove[0]) //madem aaml find donc yrajaaali tableau
        // sinon na3mel find one mch find fl function findbyid
      }
      async removeBookbytitle(title) {
        const tabBookToRemove = await this.BookRepository.find(  { where: { title } }  );
        if (tabBookToRemove.length==0)  { throw new NotFoundException(`Book with title "${title}" not found`) }
      
        return this.BookRepository.remove(tabBookToRemove[0]) 
      }
      async deleteBook(id) {

        return this.BookRepository.delete(id)  // Deletes by primary key directly
      }
      async deleteBookByTitle(title: string) {
          const deleteResult = await this.BookRepository.delete({title}); 

          if (deleteResult.affected === 0) {
              throw new NotFoundException(`Book with title "${title}" not founds`);
          }

        return { message: `Book with title "${title}" deleted successfully` ,deleteResult  };
                                                  }
      async softdelete(id) {
        
      }
      async softRemoveBook(id) {//mademni bch nestaaml remove lezmni ngetti el book  khatr remove lezm entity mch ken el id 
        let tabBookToRemove = await this.findbyid(id);
        if (!tabBookToRemove.length)
          throw new NotFoundException(`Le livre d'id ${id} n'existe pas`);
        return this.BookRepository.softRemove(tabBookToRemove[0]);
      }
      softDeleteBook(id) {
        return this.BookRepository.softDelete(id);
      }
      
  restoreBook(id) {
    return this.BookRepository.restore(id);
  }

  async recoverBook(selectedId) {
    let tabBookToRemove = await this.BookRepository.find({//recover kif remove lezmni objet kemel bch nraj3o donc lezm nlawj aal candidat kbal
      withDeleted: true,//find all the entities even the entities are deleted
      where: {
        id: selectedId,
      },
    });
    if (!tabBookToRemove.length)
      throw new NotFoundException(`Le livre d'id ${selectedId} n'existe pas`);

    this.BookRepository.recover(tabBookToRemove);
  }
  nbBooksPerYear() {
    let qb=this.BookRepository.createQueryBuilder('book')// function f type orm 
    return qb.select('book.year,count(book.id) as numbrelivre') 
    .groupBy('book.year')
    .getRawMany();
  }
  nbBooksBetweenYears(startYear,endYear) {
    let qb=this.BookRepository.createQueryBuilder('book')
  
    return qb.select('book.year,count(book.id) as numbrelivre') 
    .where('book.year > :y1 AND book.year < :y2')
    .setParameters({y1:startYear,y2:endYear})
    .groupBy('book.year')
    .getRawMany();//yrajaali objet sinon naaml findone
  }
  nbBooksBetweenYears2(startYear, endYear) {
    let qb = this.BookRepository.createQueryBuilder('book');

    return (
      qb
        .select('book.year, count(book.id) as nbreLivres')
        .where('book.year >= :y1 AND book.year <= :y2', {
          y1: startYear,
          y2: endYear,
        })
        // .setParameters({ y1: startYear, y2: endYear }) //nahi li fouk taa y1 w y2
        .groupBy('book.year')
        .getRawMany()
    );
  }
}
