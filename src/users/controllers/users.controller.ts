import { Controller,Post ,Get ,Patch, Delete,Body,Param,ParseIntPipe,Query,Request, HttpCode } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/createUser.dto';
import { UpdateUserDto } from '../dtos/updateUser.dto';
import {User} from '../../entities/user'

import { Serialize } from 'src/interceptor/serilize.interceptor';
import { UserDto } from '../dtos/User.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProfileDto } from '../dtos/createProfile.dto';

@Controller('users')
//@Serialize(UserDto)
export class UsersController {

    constructor(private usersService:UsersService){}
    @Post('/signup')
    async signup(@Body() body: CreateUserDto):Promise<User> {
      return this.usersService.create(body)
    }
    @Get('/:id')
    findUserById(@Param('id',ParseIntPipe) id:number):Promise<User>{
        return this.usersService.findById(id)
    }
    @Get()
    findUsers():Promise<User[]>{
        return this.usersService.find()
    }
    @UseGuards(AuthGuard())
    @Patch('/:id')
    updateUser(@Param('id',ParseIntPipe) id:number,@Body() body:UpdateUserDto):Promise<User>{
        return this.usersService.update(id, body)
    }
    @Delete('/:id')
    @HttpCode(204)
    deleteUser(@Param('id',ParseIntPipe) id:number):Promise<User>{
        return this.usersService.delete(id)
    }
    @Post('/login')
    async signin(@Body() body: UpdateUserDto) {
     
      return this.usersService.login(body)
    }

 
}
