import { Controller,Post ,Get ,Patch, Delete,Body,Param,ParseIntPipe,Query,Request, HttpCode } from '@nestjs/common';
import { ProfilesService } from '../service/profiles.service';
import { CreateProfileDto } from '../dtos/createProfile.dto';
import { UpdateProfileDto } from '../dtos/updateProfile.dto';
import { Profile } from 'src/entities/profile';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Controller('profiles')
@UseGuards(AuthGuard())
export class ProfilesController {
    constructor(private ProfilesService:ProfilesService ){}
    @Post()
    async createProfile(@Body() body: CreateProfileDto,@Request() req):Promise<Profile> {
        
  
      return this.ProfilesService.createProfile(body,req.user.id)
    }
    @Get('/:id')
    findProfileById(@Param('id',ParseIntPipe) id:number):Promise<Profile>{
        return this.ProfilesService.findById(id)
    }
    @Get()
    findProfiles():Promise<Profile[]>{
        return this.ProfilesService.findProfiles()
    }
  
    @Patch('/:id')
    updateProfile(@Param('id',ParseIntPipe) id:number,@Body() body:UpdateProfileDto):Promise<Profile>{
        return this.ProfilesService.update(id, body)
    }
    @Delete('/:id')
    @HttpCode(204)
    deleteProfile(@Param('id',ParseIntPipe) id:number):Promise<Profile>{
        return this.ProfilesService.delete(id)
    }
  

}
