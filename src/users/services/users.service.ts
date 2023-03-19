import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from '../../entities/user'
import { CreateUserDto } from '../dtos/createUser.dto';
import { updateUserDto } from '../dtos/updateUser.dto';
import { Profile } from 'src/entities/profile';
import { CreateProfileDto } from '../dtos/createProfile.dto';
import { Post } from 'src/entities/post';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo:Repository<User>,
    @InjectRepository(Profile) private rep:Repository<Profile>,
    @InjectRepository(Post) private pos:Repository<Post>){}

    async create(body:CreateUserDto){
        let findUser=await this.findOne(body.email)
        if(findUser){
            throw new BadRequestException('email or password incorrect')
        }

         let user:User=this.repo.create(body)
         return this.repo.save({...user,createAt:new Date()})


    }
    findById(id:number){
        console.log(id)
        return this.repo.findOneBy({id})
    }
    find(){
        return this.repo.find({relations:['profile']})
    }
    findOne(email:string){
        return this.repo.findOne({where:{email}})
    }
    update(id:number,body:updateUserDto){
        return this.repo.update({id},body)
    }
    delete(id:number){
        return this.repo.delete({id})
    }
 async createProfile(user:any,body:CreateProfileDto){

    if(user.profile){
    throw new BadRequestException('you have profile')

    }
  let prof=this.rep.create(body)
  this.rep.save(prof)
  user.profile=await this.rep.save(prof)
  return this.repo.save(user)
 }

 createPost(user,body:any){
    let post =this.pos.create(body)
    console.log(body)
    return this.pos.save({...body,user})

 }
}
