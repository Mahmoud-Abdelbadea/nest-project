import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from '../../entities/user'
import { CreateUserDto } from '../dtos/createUser.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import { Profile } from 'src/entities/profile';
import { CreateProfileDto } from '../dtos/createProfile.dto';



@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo:Repository<User>,private JwtService:JwtService ){}

    async create(body:CreateUserDto):Promise<any>{
        console.log(body)
      
        let user=await this.findOne(body.email)
        console.log(user)
        if(user){
            throw new BadRequestException('email or password incorrect')
        }
        body.password=await bcrypt.hash(body.password,10)

     
         user=this.repo.create(body)
         user=await this.repo.save(user)
         let token=this.generateToken(user.id)
         return {...user,token}
        
        

       


    }
   async findById(id:number):Promise<User>{
      let user=await this.repo.findOne({where:{id},relations:['profile']})
      if(!user)
      throw new NotFoundException('Not found')

     return user
    }
    async find():Promise<User[]>{
        let user=await this.repo.find()
        if(!user.length)
        throw new NotFoundException('Not found')
        return this.repo.find()
    }
   async findOne(email:string):Promise<User>{
        let user=await this.repo.findOne({where:{email}})
        if(user)
        throw new BadRequestException('use other email')

        return this.repo.findOne({where:{email}})
    }

   async update(id:number,body:UpdateUserDto):Promise<User>{
    let user= await this.findById(id)
    if(body.password){
        body.password=await bcrypt.hash(body.password,10)
    }
    Object.assign(user,body)
    return this.repo.save(user)
    }
    async delete(id:number):Promise<User>{
        let user= await this.findById(id)
      
      

        return this.repo.remove(user)
    }
    async login(body:UpdateUserDto):Promise<any>{
        let user= await this.repo.findOne({where:{email:body.email}})
        if(!user){
            throw new NotFoundException('Not found')
        }
       let isMatch= bcrypt.compare(body.password,user.password)
       if(!isMatch){
        throw new BadRequestException('password or email incorrect')
       }
       let token=this.generateToken(user.id)
        return {...user,token};


    }
  generateToken(id:number):string{
    return this.JwtService.sign({userId:id})
  }
  async findById1(id:number):Promise<User>{
    let user=await this.repo.findOne({where:{id}})
    if(!user)
    throw new NotFoundException('Not found')

   return user
  }

 }
