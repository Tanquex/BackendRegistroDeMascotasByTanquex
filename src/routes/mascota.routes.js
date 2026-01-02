import { Router } from "express";
import { MascotaController } from "../controllers/mascota.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authRequired,  upload.single("foto"), MascotaController.create);
router.get("/", MascotaController.getAll);

export default router;
