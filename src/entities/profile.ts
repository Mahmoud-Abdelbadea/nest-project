import {Column,Entity,PrimaryGeneratedColumn,AfterInsert,AfterRemove,AfterUpdate,OneToMany,OneToOne} from 'typeorm'
@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    firstName:string
    @Column()
    lastName:string
    @Column()
    dob:string
}