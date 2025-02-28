// Importaciones necesarias
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {Timestamp} from "firebase-admin/firestore";
import express from "express";
import cors from "cors";

admin.initializeApp();
const db = admin.firestore();
const app = express();

app.use(cors({origin: true}));
app.use(express.json());

// Obtener todas las tareas
app.get("/users/:userId/tasks", async (req, res) => {
  try {
    const {userId} = req.params;
    const snapshot = await db
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .orderBy("createdAt", "desc")
      .get();
    const tasks = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    res.status(200).json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({error: error.message});
    } else {
      res.status(500).json({error: "Ocurrió un error inesperado"});
    }
  }
});

// Agregar una nueva tarea
app.post("/users/:userId/tasks", async (req, res) => {
  try {
    const {userId} = req.params;
    const data = req.body;
    const newTask = {
      ...data,
      createdAt: Timestamp.now(),
    };
    const docRef = await db
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .add(newTask);
    res.status(201).json({id: docRef.id, ...newTask});
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({error: error.message});
    } else {
      res.status(500).json({error: "Ocurrió un error inesperado"});
    }
  }
});

// Actualizar una tarea
app.put("/users/:userId/tasks/:taskId", async (req, res) => {
  try {
    const {userId, taskId} = req.params;
    await db
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .doc(taskId)
      .update(req.body);
    res.status(200).json({message: "Task updated successfully"});
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({error: error.message});
    } else {
      res.status(500).json({error: "Ocurrió un error inesperado"});
    }
  }
});

// Eliminar una tarea
app.delete("/users/:userId/tasks/:taskId", async (req, res) => {
  try {
    const {userId, taskId} = req.params;
    await db
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .doc(taskId)
      .delete();
    res.status(200).json({message: "Task deleted successfully"});
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({error: error.message});
    } else {
      res.status(500).json({error: "Ocurrió un error inesperado"});
    }
  }
});

// Agregar un nuevo usuario o buscar si existe
app.post("/users", async (req, res) => {
  try {
    const userBody = req.body;

    // Verificar si el usuario ya existe
    const snapshot = await db
      .collection("users")
      .where("email", "==", userBody.email)
      .get();
    if (!snapshot.empty) {
      const user = snapshot.docs[0];
      res.status(200).json({
        userId: user.id,
        ...user.data(),
        created: false,
      });
    } else {
      const docRef = await db.collection("users").add(userBody);
      res.status(201).json({
        userId: docRef.id,
        ...userBody,
        created: true,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({error: error.message});
    } else {
      res.status(500).json({error: "Ocurrió un error inesperado"});
    }
  }
});

// Exportar como Cloud Function
export const api = functions.https.onRequest(app);
