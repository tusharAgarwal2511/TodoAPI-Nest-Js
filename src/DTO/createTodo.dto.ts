import { IsDate, IsNotEmpty, IsOptional, Length, MaxLength } from "class-validator";

export class CreateTodoDto{

        @MaxLength(15, {message: 'Maximun length is 15 characters'})
        @IsNotEmpty()
        title: string;

        @IsNotEmpty()
        description: string

}