import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { task } from './schemas/task.schema';
import {Query } from 'express-serve-static-core'
import { User } from '../auth/schemas/user.schema';



@Injectable()
export class TaskService {
    constructor(
        @InjectModel(task.name)
        private TaskModel: mongoose.Model<task>
    ) { }


    async findAll(query:Query):Promise<task[]>{ 
 
            const resPerPage = 2 
            const currentPage= Number(query.page)|| 1 
            const skip = resPerPage * (currentPage - 1)


        const keyword = query.keyword?{
            title:{
            $regex: query.keyword,
            $options:'i',
            },
        }:{}
        const tasks = await this.TaskModel.find({...keyword}).limit(resPerPage).skip(skip);

        return tasks ;
    }



    async createatask(task: task ,User:User): Promise<task> { 

        const data= Object.assign(task,{user:User._id})
        const res = await this.TaskModel.create(task)
        return res;
    }



    async findById(id: string): Promise<task> { 

        const isvalidID = mongoose.isValidObjectId(id) ; 

        if(!isvalidID){
            throw  new BadRequestException('Task is not found');
        }
        const task = await this.TaskModel.findById(id);
        if (!task) {
            throw new NotFoundException('task not found.');
        }
        return task;
    }



    async updateById(id: string, task: task): Promise<task> {

        return await this.TaskModel.findByIdAndUpdate(id, task, {
            new: true,
            runValidators: true,
        });
    } 

    

    async deleteById(id: string ): Promise<{deleted:boolean}> {

          await this.TaskModel.findByIdAndDelete(id) ;
         return {deleted:true}
    } 

}
