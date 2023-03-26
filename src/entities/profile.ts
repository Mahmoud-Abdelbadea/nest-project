import {Column,Entity,PrimaryGeneratedColumn,AfterInsert,AfterRemove,AfterUpdate,OneToMany,OneToOne} from 'typeorm'
import { IsString,IsNotEmpty } from 'class-validator'
import { User } from './user'
@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    @IsString()
    @IsNotEmpty()
    firstName:string
    @Column()
    @IsString()
    @IsNotEmpty()
    lastName:string
    @Column()
    @IsString()
    @IsNotEmpty()
    dob:string
    @OneToOne(()=>User,(user)=>user.profile,{cascade:true})
    user:User
}