import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.decorator';
import { CreateTodoDto } from 'src/DTO/createTodo.dto';
import { TodoEntiy, TodoStatus } from 'src/Entity/todo.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import { runInThisContext } from 'vm';

@Injectable()
export class TodoService {

        constructor(@InjectRepository(TodoEntiy) private repo: Repository<TodoEntiy>) { }

        async getAllTodos(user: UserEntity) {
                const query = this.repo.createQueryBuilder('todo');

                query.where(`todo.userId = :userId`, { userId: user.id });

                try {
                        return await query.getMany();
                } catch (err) {
                        throw new NotFoundException('No todo found');
                }
        }

        async createTodo(CreateTodoDto: CreateTodoDto, user: UserEntity) {
                const todo = new TodoEntiy()
                const { title, description } = CreateTodoDto
                todo.title = title
                todo.description = description
                todo.status = TodoStatus.OPEN
                todo.userId = user.id

                this.repo.create(todo)

                try {
                        return await this.repo.save(todo)
                }
                catch (err) {
                        throw new InternalServerErrorException("Something went wrong")
                }

        }


        async updateTodo(id: number, status: TodoStatus, user: UserEntity) {

                try {
                        await this.repo.update({ id, userId: user.id }, { status });
                        return this.repo.findOne({ where: { id } });
                } catch (err) {
                        throw new InternalServerErrorException('Something went wrong');
                }
        }

        async deleteTodo(id: number, user: UserEntity) {

                const result = await this.repo.delete({ id, userId: user.id })

                if (result.affected === 0) {
                        throw new NotFoundException('Todo not deleted');
                } else {
                        return { success: true }
                }
        }

}
