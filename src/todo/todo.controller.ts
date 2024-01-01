import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { CreateTodoDto } from 'src/DTO/createTodo.dto';
import { TodoEntiy, TodoStatus } from 'src/Entity/todo.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { TodoStatusValidationPipe } from 'src/pipes/todoStatusValidation.pipe';
import { TodoService } from './todo.service';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {
        constructor(private todoService: TodoService) { }

        @Get()
        getTodos(@User() user: UserEntity) {
                return this.todoService.getAllTodos(user);
        }

        @Post()
        createTodo(@Body(ValidationPipe) data: CreateTodoDto, @User() user: UserEntity) {
                return this.todoService.createTodo(data, user);
        }

        @Patch(':id')
        updateTodo(@Body('status', TodoStatusValidationPipe) status: TodoStatus, @Param('id') id: number, @User() user: UserEntity) {
                return this.todoService.updateTodo(id, status, user);
        }


        @Delete(':id')
        deleteTodo(@Param('id') id: number, @User() user: UserEntity) {
                return this.todoService.deleteTodo(id, user)
        }

}
