import { IsEmpty, IsOptional, IsString } from "class-validator"
import { category } from "../schemas/task.schema"
import { User } from "../../auth/schemas/user.schema";

export class UpdateTaskDto{ 


    @IsOptional()
    @IsString()
    readonly title:string ;

    @IsOptional()
    @IsString()
    readonly  description:string ;

    @IsOptional()
    @IsString()
    readonly category: category;

    
    @IsEmpty({message:"user cannot pass user id"})
    readonly user:User ;
}