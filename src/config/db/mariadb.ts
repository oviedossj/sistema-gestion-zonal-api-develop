// eslint-disable-next-line import/no-extraneous-dependencies
import { Sequelize } from 'sequelize-typescript';
import logger from '@src/utils/logger';
import { models } from '@src/config/db/models';

class Database {
  private sequelize: Sequelize;

  constructor(url: string) {
    this.initialize(url);
  }

  async initialize(url: string) {
    this.sequelize = new Sequelize(url, {
      dialect: 'mysql',
      logging: false,
      dialectOptions: {
        connectTimeout: 5000,
      },
      models: [], 
    });
    this.sequelize.addModels(models);
    try {
      await this.sequelize.authenticate();
      logger.info('Database connected');
    } catch (error) {
      logger.error('Unable to connect to the database:', error);
    }
  }

  public async authenticate(): Promise<void> {
    return this.sequelize
      .authenticate()
      .then(() => {
        console.log('DB inicializada y modelos asociados.');
        // return this.sequelize.sync();
      })
      .then(() => {
        console.log('DB sincronizada.');
      })
      .catch((error: unknown) => {
        console.error('Unable to connect to the database:', error);
      });
  }

  public get_Sequelize_Instance(): Sequelize {
    return this.sequelize;
  }
}

export default Database;
// import path from 'path';
// import fs from 'fs';
    // const modelsPath = path.join(__dirname, '../../models');
    // const modelFiles = fs.readdirSync(modelsPath)
    //   .filter(file => (file.endsWith('.ts') || file.endsWith('.js')) && !file.includes('index'));

    // const importedModels = await Promise.all(modelFiles.map(file =>
    //   import(path.join(modelsPath, file))
    // ));
    // importedModels.forEach(model => {
    //   this.sequelize.addModels([model.default || model]);
    // });
