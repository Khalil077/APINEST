import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../generics/timestamp';


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

}
