import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { Repository } from 'typeorm';
import { AuthorService } from './author.service';
import { AddauthorDTO } from '../DTO/AddauteurDto';

@Controller('author')
export class AuthorController {
        constructor(private  AuthorS: AuthorService) {}
    
    @Get('findall')
    async findall() {
        return await this.AuthorS.findall()
    }

    @Get('search/:id')
    async findauthorbyid(@Param('id',ParseIntPipe) id) { 
    
        let res= await  this.AuthorS.findbyid(id)
        if(!res) { 
            throw new NotFoundException(`autheur with id  "${id}" not found`)
        } 
        return res
       
    }
    @Post('add')
    async addauthor(@Body() body:AddauthorDTO){
        try { 
        return  await this.AuthorS.add(body)  }
        catch (err) {
            console.log('Error creating author', err)
        }

    }
    @Put('modifier/:id') 
    async update(@Param('id',ParseIntPipe) id , @Body() body) { 
        return this.AuthorS.update(id,body)

    }
    @Delete('softdelete/:id') 
    async delete(@Param('id',ParseIntPipe) id) { 
        return await this.AuthorS.softdelete(id)
        
    }
    @Get('Restore/:id')
    async restore(@Param('id',ParseIntPipe) id) 
    { 
        return await this.AuthorS.restoreauthor(id)
    }
    
    
}
