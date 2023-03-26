import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from '../entities/user'
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';


import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/strategy.passport';
import { PassportModule } from '@nestjs/passport';



@Module({
  imports: [JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:async(config:ConfigService)=>({
      secret:config.get('JWT_SECRET'),
      signOptions:{expiresIn:config.get('TOKEN_EXPIRE')}
    })      
  }),PassportModule.register({defaultStrategy:'jwt'}),
  TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy],
  exports:[UsersService,JwtStrategy]
  

})
export class UsersModule {}
