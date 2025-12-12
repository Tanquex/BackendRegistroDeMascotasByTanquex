import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Dueno from "./dueno.model.js";

const Mascota = sequelize.define("Mascota", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  raza: {
    type: DataTypes.STRING,
  },
  fotoURL: {
    type: DataTypes.STRING,
  },
  fechaLlegada: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// RELACIÓN: Un dueño tiene muchas mascotas
Dueno.hasMany(Mascota, { foreignKey: "duenoId", as: "mascotas" });
Mascota.belongsTo(Dueno, { foreignKey: "duenoId", as: "dueno" });

export default Mascota;
