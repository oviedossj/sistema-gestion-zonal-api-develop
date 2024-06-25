// app.ts (o el archivo principal de la aplicación)
import 'reflect-metadata'; // Asegúrate de cargar Reflect Metadata
import config from '@src/config/env/env'; // Configuración del entorno
import { Server } from '@src/server'; // Servidor
import incident_reportRoutes from '@src/routers'; // Rutas principales
// import { initRolesEnum } from '@src/config/auth/roles';
// import { Connection } from '@src/config/db';

(async () => {
  try {
    // await Connection.authenticate();
    // await initRolesEnum();

    // Inicializar la conexión a la base de datos si es necesario

    // Cargar rutas
    const routes = [...(await incident_reportRoutes())];
    // const routes = [...(await incident_reportRoutes()),...(await Authentication())];

    // Crear y arrancar el servidor
    const server = new Server(config.PORT, routes);
    server.start();
  } catch (err) {
    console.error('Error during server initialization:', err);
  }
})();
