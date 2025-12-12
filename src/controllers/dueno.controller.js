import { DuenoService } from "../services/dueno.service.js";
import { generateToken } from "../utils/jwt.js";

export class DuenoController {

    static async register(req, res) {
        try {
            const dueno = await DuenoService.register(req.body);
            return res.json({ message: "Registrado correctamente", dueno });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await DuenoService.login(email, password);

            if (!user) return res.status(404).json({ message: "No existe" });
            if (user === false) return res.status(400).json({ message: "Contraseña incorrecta" });

            const token = generateToken({ id: user.id });
            return res.json({ message: "Login exitoso", token });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async getAll(req, res) {
        const lista = await DuenoService.getAll();
        res.json(lista);
    }
}
