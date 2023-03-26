import { Controller,Post ,Get ,Patch, Delete,Body,Param,ParseIntPipe,Query,Request, HttpCode } from '@nestjs/common';
import { PostsService } from '../service/posts.service';
import { Posts } from 'src/entities/post';
import { CreatePostDto } from '../dtos/createPost.dto';
import { UpdatePostDto } from '../dtos/updatePost.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard())
@Controller('posts')
export class PostsController {
    constructor(private postsService:PostsService){}
    @Post()
    async createPost(@Body() body: CreatePostDto,@Request() req) {
        
  
      return this.postsService.createPost(body,req.user.id)
    }
    @Get('/:id')
    findPostById(@Param('id',ParseIntPipe) id:number):Promise<Posts>{
        return this.postsService.findById(id)
    }
    @Get()
    findposts():Promise<Posts[]>{
        return this.postsService.findposts()
    }
  
    @Patch('/:id')
    updatePost(@Param('id',ParseIntPipe) id:number,@Body() body:UpdatePostDto):Promise<Posts>{
        return this.postsService.update(id, body)
    }
    @Delete('/:id')
    @HttpCode(204)
    deletePost(@Param('id',ParseIntPipe) id:number):Promise<Posts>{
        return this.postsService.delete(id)
    }


}
