import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import tasksRoutes from "./routes/tasks.routes";
import usersRoutes from "./routes/user.routes";

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Rutas
app.use("/tasks", tasksRoutes);
app.use("/users", usersRoutes);


// Exportar como Cloud Function
export const api = functions.https.onRequest(app);
