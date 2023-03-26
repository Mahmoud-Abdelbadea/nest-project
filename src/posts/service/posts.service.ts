import { BadRequestException, Injectable,NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entities/post';
import { CreatePostDto } from '../dtos/createPost.dto';
import { UpdatePostDto } from '../dtos/updatePost.dto';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Posts) private repoPost:Repository<Posts>,private usersService:UsersService){}
async createPost(body:CreatePostDto,id:number):Promise<any>{
    let post=this.repoPost.create(body)
    let user=await this.usersService.findById(id)
    console.log(user)
    
   return  this.repoPost.save({...post,user})

 
}
async findposts():Promise<Posts[]>{
    let post=await this.repoPost.find()
    if(!post.length)
    throw new NotFoundException('Not found')
    return this.repoPost.find()
}
async findById(id:number):Promise<Posts>{
    let post=await this.repoPost.findOneBy({id})
    if(!post)
    throw new NotFoundException('Not found')

   return this.repoPost.findOneBy({id})
  }

  async update(id:number,body:UpdatePostDto):Promise<Posts>{
    let post= await this.findById(id)
  
    Object.assign(post,body)
    return this.repoPost.save(post)
    }
    async delete(id:number):Promise<Posts>{
        let post= await this.findById(id)
       return this.repoPost.remove(post)
    }

}
