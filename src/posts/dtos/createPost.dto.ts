import { IsString,IsNotEmpty,IsArray,ValidateNested,ArrayMinSize,ArrayMaxSize,IsNumber, IsObject, IsOptional}from "class-validator";
import { Type } from 'class-transformer'
/*class Item{
    @IsString()
    name:string
    @IsOptional()
    @IsNumber()
    age:number
}*/
export class CreatePostDto{
    @IsNotEmpty()
    @IsString()
    title:string
    @IsNotEmpty()
    @IsString()
    description:string
  /*  @IsArray()
    @ValidateNested({ each: true }) 
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @Type(() => Item)
    arr : Item[]

    @IsObject()
    @ValidateNested({each:true}) 
    @Type(() => Item)
    ob:Item*/


}