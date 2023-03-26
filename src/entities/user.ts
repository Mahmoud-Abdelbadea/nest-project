import {Column,Entity,PrimaryGeneratedColumn,AfterInsert,AfterRemove,AfterUpdate,OneToMany,OneToOne, JoinColumn} from 'typeorm'
import { IsString,IsNotEmpty,IsEmail,MinLength } from 'class-validator'
import {Profile} from './profile'
import {Posts} from './post'
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({unique:true})
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string
    @Column()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password:string
   @OneToOne(()=>Profile,(profile)=>profile.user)
    @JoinColumn()
    profile:Profile

  
   /* @Column()
    confirmPassword:string*/
    @AfterInsert()
    BeforeInsert(){
        this.email=this.email.toLowerCase()
    }
   @AfterUpdate()
    logUpdate(){
        this.email=this.email.toLowerCase()
    }
    @AfterRemove()
    logRomove(){
        console.log('remove')
    }



    
}