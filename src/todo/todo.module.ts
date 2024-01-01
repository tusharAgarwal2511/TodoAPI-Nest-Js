import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TodoEntiy } from 'src/Entity/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
        imports: [
                TypeOrmModule.forFeature([TodoEntiy]),
                AuthModule
        ],
        controllers: [TodoController],
        providers: [TodoService]
})
export class TodoModule { }
