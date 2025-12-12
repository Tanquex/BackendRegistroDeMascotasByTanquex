import { Router } from "express";
import { DuenoController } from "../controllers/dueno.controller.js";

const router = Router();

router.post("/register", DuenoController.register);
router.post("/login", DuenoController.login);
router.get("/", DuenoController.getAll);

export default router;
