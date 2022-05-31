//todo.model.ts里设计 Schema：
import { model, Schema } from 'mongoose';
import { CoreDocument } from '../types/model.type';
const TodoSchema = new Schema(
    {
        // _id:{
        //     type: String,
        //     required: false,
        // },
        content: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true
        }
    },
    {
    //timestamps是启用 createdAt 与 updatedAt 的配置
        timestamps: true,
    }
)
// 解决使用时知道有哪些栏位
// 继承CoreDocument(解决共用栏目timestamps的model类型验证)，
// 又定义TodoDocument解决content,completed栏目的类型验证
export interface TodoDocument extends CoreDocument{
    // _id:string;
    content:string;
    completed:boolean;
}
// 建立 Model：
export const TodoModel = model<TodoDocument>('Todo', TodoSchema);

//这样就完成建立 Model 了，但在使用时无法知道有哪些栏位，因为 model() 预设是定义输出 Document 型别，这时候我们就要写 Interface 来处理这个问题，考量到还有共用栏位 createdAt 与 updatedAt，所以在 types 资料夹下建立 model.type.ts：
