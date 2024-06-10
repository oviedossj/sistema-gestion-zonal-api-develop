// import { Database } from '@shared/db';
import config from '@src/config/env/env';
import { Server } from '@src/server';
import incident_reportRoutes from '@src/routers';

(async () => {
  // const database = new Database(config.DB_CONNECTION);
  // await database.authenticate();
  const routes = [...(await incident_reportRoutes())];
  // const routes = [...(await incident_reportRoutes()),...(await Authentication())];
  const server = new Server(config.PORT, routes);
  server.start();
})();
