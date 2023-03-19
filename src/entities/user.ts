import {Column,Entity,PrimaryGeneratedColumn,AfterInsert,AfterRemove,AfterUpdate,OneToMany,OneToOne, JoinColumn} from 'typeorm'
import {Profile} from './profile'
import {Post} from './post'
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({unique:true})
    email:string
    @Column()
    password:string
    @Column()
    createAt:Date
    @OneToOne(()=>Profile)
    @JoinColumn()
    profile:Profile
    @OneToMany(()=>Post,(post)=>post.user)
    post:Post[]
  
   /* @Column()
    confirmPassword:string*/
    @AfterInsert()
    logInsert(){
        console.log('insert')
    }
    @AfterUpdate()
    logUpdate(){
        console.log('update')
    }
    @AfterRemove()
    logRomove(){
        console.log('remove')
    }



    
}