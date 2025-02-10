import { TimeStamp } from 'src/book/generics/timestamp';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from 'src/book/entities/book.entity';
import { RoleEnum } from '../generics/role.enum';

@Entity('user')
export class UserEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
  })
  email: string;
  @Column({
    unique: true,
  })
  username: string;
  @Column()
  salt: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: RoleEnum,//ykhalik matnajm takhtar kn wahda ml caset li 7athom
    // default : RoleEnum.ROLE_USER

  })
  role:string;
  
}