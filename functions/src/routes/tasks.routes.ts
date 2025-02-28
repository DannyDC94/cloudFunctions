import { Router } from "express";
import {
  createTask,
  listTasks,
  editTask,
  removeTask,
} from "../controllers/task.controller";

// eslint-disable-next-line new-cap
const router = Router();

router.post("/", createTask);
router.get("/", listTasks);
router.put("/:taskId", editTask);
router.delete("/:taskId", removeTask);

export default router;
