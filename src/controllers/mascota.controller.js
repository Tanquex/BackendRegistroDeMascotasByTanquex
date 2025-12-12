import { MascotaService } from "../services/mascota.service.js";

export class MascotaController {

    static async create(req, res) {
        try {
            const mascota = await MascotaService.create({
                ...req.body,
                foto: req.file?.path || null
            });
            res.json(mascota);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    static async getAll(req, res) {
        const lista = await MascotaService.getAll();
        res.json(lista);
    }
}
