import {
    Injectable,
    BadRequestException,
    NotFoundException,
  } from '@nestjs/common';
  import { UsersService } from './services/users.service';
  import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthService {
    constructor(private usersService: UsersService,
      private JwtService :JwtService) {}
  
    async signup(body:any) {
      // See if email is in use
      const users = await this.usersService.findOne(body.email);
      if (users) {
        throw new BadRequestException('email in use');
      }


     
      const hash = await bcrypt.hash(body.password,5);
     body.password=hash
     
      const user = await this.usersService.create(body);
      
     
      const token = this.JwtService.sign({userId:user.id})
      Object.assign(user,{token})
      console.log(user)
      return user;
    }
  
    async signin(email: string, password: string) {
      const user = await this.usersService.findOne(email);
      if (!user) {
        throw new NotFoundException('user not found');
      }
  
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        throw new BadRequestException('bad password');
      }
      const token = this.JwtService.sign({userId:user.id})
      Object.assign(user,{token})
  
      return user;
    }
  }
  