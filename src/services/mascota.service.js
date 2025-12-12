import  Mascota  from "../models/mascota.model.js";

export class MascotaService {

    static async create(data) {
        return await Mascota.create(data);
    }

    static async getAll() {
        return await Mascota.findAll({ include: ["dueno"] });
    }
}
