import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PostsModule } from './posts/posts.module';
@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    useFactory:(config:ConfigService)=>{
      return {
        type:'mysql',
        database:config.get<string>('DATABASE_NAME'),
        username:config.get<string>('USER_NAME'),
        password:config.get<string>('PASSWORD'),
        host:config.get<string>('HOST'),
        port:config.get<number>('PORT_DB'),
        autoLoadEntities: true,
        synchronize: true

      }}
    }),UsersModule, ProfilesModule, PostsModule]
  
})


export class AppModule { }
