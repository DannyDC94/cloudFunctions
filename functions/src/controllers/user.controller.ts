import { Request, Response } from "express";
import { getUserByEmail, createUser } from "../services/user.service";

export const handleUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "El email es obligatorio" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(200).json({ ...existingUser, created: false });
    }

    const newUser = await createUser(email);
    return res.status(201).json({ ...newUser, created: true });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Error inesperado",
    });
  }
};
