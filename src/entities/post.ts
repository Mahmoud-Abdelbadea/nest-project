import { IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
@Entity()
export class Posts{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    @IsString()
  
    title:string
    @Column()
    @IsString()
    description:string

 

    @ManyToOne(()=>User,{cascade:true})
    user:User

   
}