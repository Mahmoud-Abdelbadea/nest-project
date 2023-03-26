import { Module } from '@nestjs/common';
import { PostsController } from './controller/posts.controller';
import { PostsService } from './service/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from '../entities/post'
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Posts]),JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:async(config:ConfigService)=>({
      secret:config.get('JWT_SECRET'),
      signOptions:{expiresIn:config.get('TOKEN_EXPIRE')}
    })      
  }),PassportModule.register({defaultStrategy:'jwt'}),UsersModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
