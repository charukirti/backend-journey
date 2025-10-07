import { model, Schema } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['completed', 'pending', 'in-progress'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    }
}, { timestamps: true });


export const TaskModel = model("task", taskSchema)