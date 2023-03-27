import { IsInt, IsOptional } from "class-validator"
export class QueryPostDto{
   
    @IsOptional()
    page:number
  
    @IsOptional()
    limit:number
}