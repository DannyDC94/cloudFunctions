import { Router } from "express";
import { handleUser } from "../controllers/user.controller";

// eslint-disable-next-line new-cap
const router = Router();

router.post("/", handleUser);

export default router;
