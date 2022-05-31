import express from 'express';
import { RouteBase } from '../../../bases/route.base';
import { TodoController } from './todo.controller';

// 在todo.routing.ts中产生实例，设置在/api/todos取得资讯
// 
export class TodoRoute extends RouteBase {

    
    protected controller!: TodoController

    constructor() {
        super();
    }

    protected initial(): void {
        this.controller = new TodoController();
        super.initial();
    }

    protected registerRoute(): void {
        this.router.route('/')
        .get(
            this.responseHandler(this.controller.getTodos)
        )
        .post(
            express.json(),
            this.responseHandler(this.controller.addTodo)
        );
        this.router.route('/:id')
        .get(
            this.responseHandler(this.controller.getTodo)
        )
        .delete(
            this.responseHandler(this.controller.removeTodo)  
        );
        this.router.patch(
            '/:id/completed',
            express.json(),
            this.responseHandler(this.controller.completedTodo)
        );
    }
    
}