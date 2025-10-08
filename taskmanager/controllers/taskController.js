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

        if (!newTask) {
            const error = new Error('Unable to create task');
            error.status = 400;
            throw error;
        }

        await TaskModel.create(newTask);

        return res.status(201).json({
            success: true,
            message: "New task created successfully",
            data: newTask
        });
    } catch (error) {
        console.log('Task create error', error);
        next(error);
    }
}


export async function getAllTasks(req, res, next) {
    try {
        const tasks = await TaskModel.find({});

        if (!tasks) {
            const error = new Error('Tasks not found');
            error.status = 404;
            throw error;
        }

        return res.status(200).json({
            success: true,
            message: 'All tasks retrived successfully',
            data: tasks
        });
    } catch (error) {
        console.error('get all task error', error);
        next(error);
    }
}


export async function getTaskById(req, res, next) {
    try {
        const id = req.params.id;
        const task = await TaskModel.findById(id);

        if (!task) {
            const error = new Error('Task not found');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            success: true,
            message: 'Task retrived successfully',
            data: task
        });

    } catch (error) {
        console.error("get task by id error", error);
        next(error);
    }
}

export async function updateTask(req, res, next) {
    try {
        const id = req.params.id;

        const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTask) {
            const error = new Error('Unable to update task');
            error.status = 404;
            throw error;
        }

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: updatedTask
        });
    } catch (error) {
        console.log('Task update error', error);
        next(error);
    }
}


export async function deleteTask(req, res, next) {
    try {
        const id = req.params.id;

        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            const error = new Error('Unable to delete — task not found');
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({
            success: true,
            message: "deleted task successfully",
            data: deletedTask
        });
    } catch (error) {
        console.log('Task delete error', error);
        next(error);
    }
}