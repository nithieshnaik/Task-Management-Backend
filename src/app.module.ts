import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [  
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true,
    }), 
    MongooseModule.forRoot(process.env.DB_URI),
    TaskModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
