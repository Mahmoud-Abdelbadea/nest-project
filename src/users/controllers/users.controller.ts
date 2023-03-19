import { Controller,Post ,Get ,Patch, Delete,Body,Param,ParseIntPipe,Query,Request } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/createUser.dto';
import { updateUserDto } from '../dtos/updateUser.dto';
import { AuthService } from '../auth.service';
import { Serialize } from 'src/interceptor/serilize.interceptor';
import { UserDto } from '../dtos/User.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProfileDto } from '../dtos/createProfile.dto';
@Controller('users')
//@Serialize(UserDto)
export class UsersController {

    constructor(private usersService:UsersService,private authService:AuthService){}
    @Post('/signup')
    async signup(@Body() body: CreateUserDto) {
       
  
      return this.authService.signup(body)
    }
  
    @Post('/signin')
    async signin(@Body() body: CreateUserDto) {
      const user = await this.authService.signin(body.email, body.password);
     
      return user;
    }
    @Post()
   createUser(@Body() body:CreateUserDto){

    return this.usersService.create(body)

    }
    @Get('/:id')
    findUserById(@Param('id',ParseIntPipe) id:number){
        return this.usersService.findById(id)
    }
    @Get()
    findUserByEmail(@Query('email') email:string){
        return this.usersService.findOne(email)
    }
    @Patch('/:id')
    updateUser(@Param('id',ParseIntPipe) id:number,body:updateUserDto){
        return this.usersService.update(id, body)
    }
    @Delete('/:id')
    deleteUser(@Param('id',ParseIntPipe) id:number){
        return this.usersService.delete(id)
    }

    @Post('/profile')
    @UseGuards(AuthGuard())
    createProfile(@Request() req, @Body() body:CreateProfileDto){
     
        return this.usersService.createProfile(req.user,body)
        
    }
    @Post('/post')
    @UseGuards(AuthGuard())
    createpos(@Request() req,@Body() body){
        console.log(req.user)
           return this.usersService.createPost(req.user,body)
        
    }

 
}
