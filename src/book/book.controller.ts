import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BookEntity } from './entities/book.entity';
import { BookService } from './book.service';
import { AddBookDTO } from './DTO/AddbookDTO';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/user/auth.guard';

@Controller('book')
export class BookController {
    constructor(private BookServ:BookService){}
    
    @UseGuards(JwtAuthGuard)
    @Get('all') 
    msg() {
        return 'hello'
    }

    @Post('add')
    async create(@Body() body:AddBookDTO){
        try {
            return await this.BookServ.create(body);
        } catch (error) {
            console.error('Error creating book:', error.message); // Log the real error
    throw new InternalServerErrorException('Could not create book'); // Better exception handling
        }
    }
  
    @Get('findall')
    async cherchertousleslivre() {
        try {  
        return this.BookServ.findAll() } 
        catch(err) { 
            console.log(err) 
        }
    }
    @Put('/edit/:id')
    modifierBook(@Body() body,@Param('id',ParseIntPipe) id ) {
        return this.BookServ.updateBook(body ,id)

    }
    @Get('/search/:id') 
    async chercherBook(@Param('id',ParseIntPipe) id) { 
       let response= this.BookServ.findbyid(id) ;
    
       return response ; 
    }
    @Delete('/delete/:id')
    async supprimer(@Param('id',ParseIntPipe)id) {
        return this.BookServ.deleteBook(id)
    }
    @Delete('/delete/title/:title')
    async supprimer2(@Param('title') title: string) {
        return this.BookServ.deleteBookByTitle(title);
}   
    @Delete('/remove/:id')
    async remove(@Param('id',ParseIntPipe)id) {
        return this.BookServ.removeBook(id)
    }
    @Delete('/remove/title/:title')
    async remove2(@Param('title') title: string) {
        return this.BookServ.removeBookbytitle(title);
}  
@Get('stats') 
async nbredeLivreParAnnee() {
    let response=await this.BookServ.nbBooksPerYear();
    return response ;
} 
@Get('statsbetween')
async nbredeliveentreannees(@Query('startyear',ParseIntPipe) start,@Query('endyear',ParseIntPipe) end ) {
    let response=await this.BookServ.nbBooksBetweenYears(start,end)
    return response
}
}
