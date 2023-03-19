import { IsString,IsEmail,MinLength,IsNotEmpty,IsNumber,length} from "class-validator"
export class CreateUserDto{
  
   
 
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password:string
  /*  @IsNotEmpty()
    @IsString()
    @MinLength(8)
    confirmPassword:string*/

}