/**
 * ===============================
 *  Servidor principal (index.js)
 *  Configuración base del backend
 * ===============================
 */

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Rutas
import duenoRoutes from "./routes/dueno.routes.js";
import mascotaRoutes from "./routes/mascota.routes.js";

// Base de datos
import sequelize from "./config/database.js";

// Para obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ----------------------------------------
   Middlewares globales
---------------------------------------- */
app.use(cors());                         // Permitir peticiones desde Angular
app.use(express.json());                 // Parseo de JSON
app.use("/uploads", express.static("uploads"));  // Servir archivos estáticos

/* ----------------------------------------
   Verificación de imports críticos
---------------------------------------- */
function checkModule(name, module) {
    if (!module) {
        console.error(`❌ ERROR CRÍTICO: No se pudo cargar el módulo: ${name}
Revisa la ruta, el nombre del archivo y la extensión (.js).
`);
        process.exit(1);
    }
}

checkModule("dueno.routes.js", duenoRoutes);
checkModule("mascota.routes.js", mascotaRoutes);

/* ----------------------------------------
   Rutas principales de la API
---------------------------------------- */
app.use("/duenos", duenoRoutes);    // CRUD Dueños
app.use("/mascotas", mascotaRoutes); // CRUD Mascotas

/* ----------------------------------------
   Conexión y sincronización con Base de Datos
---------------------------------------- */
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión a la base de datos establecida correctamente.");

        await sequelize.sync({ alter: true });
        console.log("📦 Modelos sincronizados con la base de datos.");

    } catch (error) {
        console.error("❌ ERROR al conectar con la base de datos:");
        console.error(error.message);
        process.exit(1);
    }
}

connectDB();

/* ----------------------------------------
   Arranque del Servidor
---------------------------------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`
===========================================
🚀 Servidor iniciado correctamente
📌 URL base: http://localhost:${PORT}
===========================================
`);
});
