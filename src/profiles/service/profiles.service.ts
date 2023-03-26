import { BadRequestException, Injectable,NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Profile} from '../../entities/profile'
import {CreateProfileDto} from '../dtos/createProfile.dto'
import { UpdateProfileDto } from '../dtos/updateProfile.dto';
import { UsersService } from 'src/users/services/users.service';
import {User} from '../../entities/user'

@Injectable()
export class ProfilesService {
    constructor(@InjectRepository(Profile) private repo:Repository<Profile>,
    @InjectRepository(User) private repoUser:Repository<User>,
    private usersService:UsersService){}

   async createProfile(body:CreateProfileDto,id:number):Promise<Profile>{
        let user=await this.usersService.findById(id)
        if(user.profile){
            throw new BadRequestException('you have profile')
        }
        let profile=this.repo.create(body)
         profile= await  this.repo.save(profile)
         await this.repoUser.save({...user,profile})
         return profile
    }
    async findProfiles(){
        let profile=await this.repo.find()
        if(!profile.length)
        throw new NotFoundException('Not found')
        return this.repo.find()
    }
    async findById(id:number):Promise<Profile>{
        let profile=await this.repo.findOneBy({id})
        if(!profile)
        throw new NotFoundException('Not found')
  
       return this.repo.findOneBy({id})
      }

      async update(id:number,body:UpdateProfileDto):Promise<Profile>{
        let profile= await this.findById(id)
      
        Object.assign(profile,body)
        return this.repo.save(profile)
        }
        async delete(id:number):Promise<Profile>{
            let profile= await this.findById(id)
           return this.repo.remove(profile)
        }
}
