import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";


export enum category {
    IMPORTANT = 'important',
    PERSONAL = 'Personal',
}

@Schema({
    timestamps: true
})

export class task {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    category: category ;

    
    @Prop({type: mongoose.Schema.Types.ObjectId,ref:'User'})
      user:User ;
}

export const TaskSchema = SchemaFactory.createForClass(task);
