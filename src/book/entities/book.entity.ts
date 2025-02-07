import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp';
import { AuthorEntity } from './author.entity';


@Entity('livre')
export class BookEntity extends TimeStamp  { //Timestamp file library ml typeorm tkhalini naarf wakteh tesna3 entity wala tbadl wala tfasakh
    //sna3et file timestamp f weset CreatedAt ... wkhalit candidatentity aando les attributs edhoukomca
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // {
  //     name: 'intitle',
  //     length : 50,
  //     update : false,
  //     unique : true
  // }
  title: string;

  @Column()
  year: number;

  @Column()
  editor: string;
  length: any;
  @ManyToOne(() => AuthorEntity //each book belongs to one author//
  , (auth) => auth.listeLivres, {
    eager: false,//ydhaherleksh el objet najmo nbadlo fl function find   relations:['author']  
    cascade: true,// ken al author mch mawjoud yasen3o wahdo
  })
  author: AuthorEntity;
}
