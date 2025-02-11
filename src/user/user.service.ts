import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RoleEnum } from './generics/role.enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(  @InjectRepository(UserEntity) //un constructor est une méthode spéciale d'une classe qui est exécutée 
    // automatiquement lorsqu'un objet de cette classe est instancié.
    private UserRep: Repository<UserEntity>,private jwtSer : JwtService) { 
   
}
async createUser(user) {
    let newUser=this.UserRep.create( {  
        username:user.username,
        email:user.email,
        role:RoleEnum.ROLE_USER,
        salt: await bcrypt.genSalt()
    });

    newUser.password= await bcrypt.hash(
        user.password,
        newUser.salt //Without a salt, two users with the same password would end up with the same hashed value. 
        // This makes it easier for attackers to identify common passwords if they have access to the hashed values.
        //Salt ensures that even if two users have the same password,
        //  their hashed values will be different because the salt is added to the password before hashing.
    )
    return await this.UserRep.save(newUser)
}
findallusers(){
    return this.UserRep.find()
}
async login(user) {
    let qb = await this.UserRep.createQueryBuilder('user');
    const u = await qb
      .select('user')
      .where('user.username = :ident OR user.email = :ident')//aamel el login yaa bel email wala username
      .setParameter('ident', user.identifiant)
      .getOne();
    if (!u)
      throw new NotFoundException(
        'Aucun utilisateur trouvé avec cet identifiant',
      );
    const test = await bcrypt.compare(user.password, u.password);
    if (!test) throw new NotFoundException('Mot de passe invalide');
    const token = this.jwtSer.sign(
      {
          id : u.id,
          role : u.role
      }
  )
    return {
      message : "Connexion réussie",
      access_token: token,
    };
  }
}
