import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


export enum TodoStatus {
        OPEN = "OPEN",
        WIP = "WIP",
        COMPLETED = 'COMPLETED'
}


@Entity('todos')
export class TodoEntiy{

        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        title: string;

        @Column()
        description: string;

        @Column()
        status: TodoStatus;

        @ManyToOne(() => UserEntity, (user) => user.todos)
        user: UserEntity

        @Column()
        userId: number


}

