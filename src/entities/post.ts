import { IsString } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
  
    title:string
    @Column()
    description:string
    @ManyToOne(()=>User,(user)=>user.post)
    user:User
}