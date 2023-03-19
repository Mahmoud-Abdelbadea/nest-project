import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user'
import { UsersController } from './users/controllers/users.controller';
import { UsersService } from './users/services/users.service';
import { AuthService } from './users/auth.service';
import { Profile } from './entities/profile';
import { Post } from './entities/post';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    database: 'posts',
    username: 'root',
    host: 'localhost',
    password: '123456',
    port: 3306,
    entities: [User, Profile, Post],
    synchronize: true
  }), UsersModule]

})
export class AppModule { }
