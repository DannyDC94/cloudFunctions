import { db } from "../config/firebase";
import { Task } from "../types/task.interface";
import { Timestamp } from "firebase-admin/firestore";

const getTasks = async (userId: string) => {
  const snapshot = await db
    .collection("users")
    .doc(userId)
    .collection("tasks")
    .orderBy("createdAt", "desc")
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const addTask = async (userId: string, task: Omit<Task, "id">) => {
  const newTask = { ...task, createdAt: Timestamp.now() };
  const docRef = await db
    .collection("users")
    .doc(userId)
    .collection("tasks")
    .add(newTask);
  return { id: docRef.id, ...newTask };
};

const updateTask = async (
  userId: string,
  taskId: string,
  updates: Partial<Task>
) => {
  const taskRef = db
    .collection("users")
    .doc(userId)
    .collection("tasks")
    .doc(taskId);
  await taskRef.update(updates);
  const updatedDoc = await taskRef.get();
  return { id: updatedDoc.id, ...updatedDoc.data() };
};

const deleteTask = async (userId: string, taskId: string) => {
  const taskRef = db
    .collection("users")
    .doc(userId)
    .collection("tasks")
    .doc(taskId);
  await taskRef.delete();
  return { message: "Tarea eliminada correctamente" };
};

export { getTasks, addTask, updateTask, deleteTask };
