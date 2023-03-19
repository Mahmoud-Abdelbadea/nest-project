import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from '../entities/user'
import {PassportModule} from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/strategy.passport'
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './auth.service';
import { Profile } from 'src/entities/profile';
import { Post } from 'src/entities/post';

@Module({
  imports: [JwtModule.register({secret:'mahmoudmohamed'}),
  PassportModule.register({defaultStrategy:'jwt'}),
  TypeOrmModule.forFeature([User,Profile,Post])],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategy,AuthService],
  
})
export class UsersModule {}
