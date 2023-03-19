import { IsString,IsEmail,MinLength} from "class-validator"
export class updateUserDto{

    @IsString()
    username:string

    @IsString()
    @IsEmail()
    email:string

    @IsString()
    @MinLength(8)
    password:string}