import { DTOBase } from '../bases/dto.base';
import { TodoDocument } from '../models/todo.model';

export class TodoDTO extends DTOBase {
    public readonly content!: string;
    public readonly completed!: boolean;

    // 其中传入的参数为TodoDocument，因为资料会从 Document 来：
    constructor(doc: TodoDocument) {
        super(doc);
        this.content = doc.content;
        this.completed = doc.completed;
    }
}