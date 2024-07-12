import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';
import { AuthModule } from '../auth/auth.module';


@Module({ 
   imports: [ 
    AuthModule,
    MongooseModule.forFeature(
    [
      {
        name: 'task',
        schema:TaskSchema
      }
    ] 

   )] ,
  controllers: [TaskController],
  providers: [TaskService ]
})
export class TaskModule {}
