import { Request, Response } from "express";
import {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../services/tasks.service";

const createTask = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["userid"] as string;
    if (!userId) {
      res
        .status(400)
        .json({ error: "El userId es obligatorio en los headers" });
    }
    const task = req.body;
    const newTask = await addTask(userId, task);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "Ocurrió un error inesperado",
    });
  }
};

const listTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["userid"] as string;
    console.log(req.headers);
    if (!userId) {
      res
        .status(400)
        .json({ error: "El userId es obligatorio en los headers" });
    }
    const tasks = await getTasks(userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "Ocurrió un error inesperado",
    });
  }
};

const editTask = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["userid"] as string;
    if (!userId) {
      res
        .status(400)
        .json({ error: "El userId es obligatorio en los headers" });
    }
    const { taskId } = req.params;
    const updates = req.body;
    const updatedTask = await updateTask(userId, taskId, updates);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "Ocurrió un error inesperado",
    });
  }
};

const removeTask = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["userid"] as string;
    if (!userId) {
      res
        .status(400)
        .json({ error: "El userId es obligatorio en los headers" });
    }
    const { taskId } = req.params;
    const message = await deleteTask(userId, taskId);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "Ocurrió un error inesperado",
    });
  }
};

export { createTask, listTasks, editTask, removeTask };
