import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { Repository } from 'typeorm';
import { AddauthorDTO } from '../DTO/AddauteurDto';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(AuthorEntity)
        private AuthorRepository: Repository<AuthorEntity>, 
      ) {} 
      findall() {
        return this.AuthorRepository.find( { 
          loadRelationIds:true}
        )
      }


      findbyid(id) { 
        return this.AuthorRepository.findOne({
            where: { 
                id:id
            },
            relations: ['listeLivres'] //ydhaherlek el objet bkoloo wnajem nbadlha fl entités nhot eager:true
               //loadRelationIds: true,//tdhaherlek cle etrangeres
        }   
        )
    }
    add(author) { 
        return this.AuthorRepository.save(author)
    }
    async update(id,author) { 
        let b= await this.AuthorRepository.preload(  { 
            id:id ,
            ...author
              }
        )
        if (!b) throw new NotFoundException (`author  with id "${id}" not found`)
        return b
    }
    async softdelete(id) { 
        return await this.AuthorRepository.softDelete(id)

    }
    async softremove(id) { 
        let author= await this.findbyid(id)
        if (!author) 
            throw new NotFoundException(`L'auteur d'id ${id} n'existe pas`);
        return  this.AuthorRepository.softRemove(author)
    }
    restoreauthor(id) {
        return this.AuthorRepository.restore(id);
      }
      async recoverauthor(selectedId) {
        let authorremove = await this.AuthorRepository.find({
          withDeleted: true,
          where: {
            id: selectedId,
          },
        });
        if (!authorremove.length)
          throw new NotFoundException(`L'auteur d'id ${selectedId} n'existe pas`);
    
        this.AuthorRepository.recover(authorremove);
      }  

    
}
