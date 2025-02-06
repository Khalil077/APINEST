import {
    IsIn,
    IsNotEmpty,
    IsString,
    Max,
    Min,
    MinLength,
  } from 'class-validator';
  
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
  }
  