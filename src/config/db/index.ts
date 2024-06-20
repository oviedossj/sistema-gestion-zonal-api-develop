import config from '@src/config/env/env';
import ConnectionMariaDB from './mariadb';

const Connection = new ConnectionMariaDB(config.DB_CONNECTION);

export { Connection, ConnectionMariaDB };
