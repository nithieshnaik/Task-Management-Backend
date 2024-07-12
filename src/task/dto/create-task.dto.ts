import { IsEmpty, IsEnum, IsNotEmpty, IsString } from "class-validator"
import { category } from "../schemas/task.schema"
import { User } from "../../auth/schemas/user.schema";

export class CreateTaskDto{ 
    @IsNotEmpty()
    @IsString()
    readonly title:string  ;

    
    @IsNotEmpty()
    @IsString()
    readonly  description:string ; 
    
    
    @IsNotEmpty()
    @IsEnum(category,{message:'Enter the Category'})
    readonly category: category; 

    @IsEmpty({message:"user cannot pass user id"})
    readonly user:User ;
}