import { IsString,IsNotEmpty } from "class-validator"
export class CreateProfileDto{
    @IsNotEmpty()
    @IsString()
    firstName:string
    @IsNotEmpty()
    @IsString()
    lastName:string
    @IsNotEmpty()
    @IsString()
    dob:string
}