import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {Query as ExpressQuery} from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {

    constructor(private taskservice: TaskService) { }

    @Get()
    async getallTask(@Query()query:ExpressQuery): Promise<task[]> {
        return this.taskservice.findAll(query);
    } 


    @Post() 
    @UseGuards(AuthGuard())
    async Createatask(
        @Body() task:CreateTaskDto, 
        @Req() req,
    ):Promise<task>{
        return this.taskservice.createatask(task, req.user) ;
    } 


    @Get( ':id') 
    async getbyId( @Param('id') id:string):Promise<task>{
        return this.taskservice.findById(id) ;
    } 

    @Put(':id')
    async updatebyid(
        @Param('id')
        id:string,
        @Body()
        task:UpdateTaskDto,
    ):Promise<task>{
        return this.taskservice.updateById(id , task) ;
    } 


    @Delete( ':id') 
    async deletebyId( @Param('id') id:string):Promise<{deleted:boolean}>{
        return this.taskservice.deleteById(id) ;
    } 

}
