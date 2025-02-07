import {
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
    MinLength,
  } from 'class-validator';
import { AuthorEntity } from '../entities/author.entity';
  
  export class AddBookDTO {
    @MinLength(6)
    public title: string;
  
 
    @IsNotEmpty()
    @Min(1900)
    @Max(2030)
    public year: number;

    @IsNotEmpty()
    @IsString()
    public editor: string;
    @IsOptional()
    author: AuthorEntity;  
  }
  
  