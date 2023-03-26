
import { IsArray, IsString,ValidateNested,IsNumber, isNumber, ArrayMinSize, ArrayMaxSize, IsObject} from "class-validator"
import { Type } from 'class-transformer'
class Item {
    @IsString()
    name: string;
    @IsNumber()
    ali:number
  
  }
 class it{
    @IsString()
    name:string
    @IsNumber()
    age:number
    @IsArray()
    ali:number[]
 }
export class CreateProfileDto{
  
    @IsString()
    firstName:string
    @IsString()
    lastName:string
    @IsString()
    dob:string
 
    moh:it
   
   /* @IsArray()
    @ValidateNested({ each: true }) // used when vakidate aray of object 
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @Type(() => Item)
    numberArray : Number[]*/

}