import { Document } from 'mongoose';

// 共用栏位timestamp
export interface CoreDocument extends Document {
    createdAt: Date;
    updatedAt: Date;
}