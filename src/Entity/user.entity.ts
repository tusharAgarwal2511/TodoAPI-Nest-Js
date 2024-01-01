import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodoEntiy } from "./todo.entity";

@Entity('users')
export class UserEntity{

        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        username: string

        @Column()
        password: string

        @Column()
        salt: string

        @OneToMany(() => TodoEntiy, (todo) => todo.user)
        todos: TodoEntiy[]

}