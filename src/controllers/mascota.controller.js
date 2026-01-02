import { MascotaService } from "../services/mascota.service.js";

export class MascotaController {

    static async create(req, res) {
       try {
            // 1. Extraemos los datos del body
            // 2. Agregamos la foto procesada por Multer
            // 3. ¡IMPORTANTE!: Tomamos el ID del dueño desde el token (req.user)
            const mascotaData = {
                ...req.body,
                fotoURL: req.file ? req.file.path : req.body.fotoURL,
                duenoId: req.user.id // Aquí es donde se hace la magia
            };

            const mascota = await MascotaService.create(mascotaData);
            res.json(mascota);
        } catch (err) {
            res.status(500).json({ error: err.message });
            console.error("Error al crear mascota Back");
        }
    }

    static async getAll(req, res) {
        const lista = await MascotaService.getAll();
        res.json(lista);
    }
}
