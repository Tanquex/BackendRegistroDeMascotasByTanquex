import bcrypt from "bcrypt";
import  Dueno  from "../models/dueno.model.js";

export class DuenoService {
    
    static async register(data) {
        const hashed = await bcrypt.hash(data.password, 10);
        return await Dueno.create({ ...data, password: hashed });
    }

    static async login(email, password) {
        const user = await Dueno.findOne({ where: { email } });

        if (!user) return null;

        const match = await bcrypt.compare(password, user.password);
        if (!match) return false;

        return user;
    }

    static async getAll() {
        return await Dueno.findAll();
    }
}
