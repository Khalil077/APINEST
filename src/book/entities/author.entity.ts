import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp';
import { BookEntity } from './book.entity';


@Entity('auteur')
export class AuthorEntity extends TimeStamp  { 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  
  prenom: string;

  @Column()
  nom: string;

  @OneToMany(() => BookEntity, (livre) => livre.author, {} ) //kol livre aando author
  listeLivres: BookEntity[];//mademo tableau mch bch yodhher fl bd kn nheb ndhahro na3mel fl find relations['listedLivres'] 
  //wala kn nheb id barka naml relationsIds:true fl function find
  
}
