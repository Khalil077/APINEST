import {
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength,
  } from 'class-validator';
import { AuthorEntity } from '../entities/author.entity';
  
  export class AddauthorDTO {
    @IsNotEmpty()
    @MaxLength(20)
    public prenom: string;
  
 
    @IsNotEmpty()
    @MaxLength(20)
    public nom: string;
    
  }
  