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
        console.log('Task create error', error);
        throw new Error("Unable to create new task");
    }
}


export async function getAllTasks(req, res, next) {
    try {
        const tasks = await TaskModel.find({});
        if (!tasks) {
            throw new Error('There are no tasks');
        }

        return res.json({
            success: true,
            message: 'All tasks retrived successfully',
            data: tasks
        });
    } catch (error) {
        console.error('get all task error', error);
        throw new Error('Unable to get all tasks');
    }
}


export async function getTaskById(req, res, next) {
    try {
        const id = req.params.id;
        const task = await TaskModel.findById(id);
        if (!task) {
            throw new Error('Task does not exist');
        }

        return res.json({
            success: true,
            message: 'Task retrived successfully',
            data: task
        });

    } catch (error) {
        console.error("get task by id error", error);
        throw new Error('Unable to get task');
    }
}

export async function updateTask(req, res, next) {
    try {
        const id = req.params.id;

        const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, { new: true });

        return res.json({
            success: true,
            message: "Task updated successfully",
            data: updatedTask
        });
    } catch (error) {
        console.log('Task update error', error);
        throw new Error('Unable to update task');
    }
} 