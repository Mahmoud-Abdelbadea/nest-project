import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './service/profiles.service';
import { ProfilesController } from './controller/profiles.controller';
import { Profile } from 'src/entities/profile';
import { UsersModule } from 'src/users/users.module';
import {User} from '../entities/user'
import { JwtStrategy } from 'src/users/strategy/strategy.passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports:[TypeOrmModule.forFeature([Profile,User]),JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:async(config:ConfigService)=>({
      secret:config.get('JWT_SECRET'),
      signOptions:{expiresIn:config.get('TOKEN_EXPIRE')}
    })      
  }),PassportModule.register({defaultStrategy:'jwt'}),UsersModule],
  controllers: [ProfilesController],
  providers: [ProfilesService,JwtStrategy]
})
export class ProfilesModule {}
