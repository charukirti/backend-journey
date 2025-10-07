import { TaskModel } from "../models/task.model.js";

export async function createTask(req, res, next) {

    try {
        const taskData = req.body;

        if (!taskData) throw new Error('Task should not be empty');

        const newTask = {
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
            priority: taskData.priority
        };

        await TaskModel.create(newTask);

        return res.status(201).json({
            success: true,
            message: "New task created successfully",
            data: newTask
        });
    } catch (error) {
        console.log('Task create error', error)
        throw new Error("Unable to create new task");
    }
}