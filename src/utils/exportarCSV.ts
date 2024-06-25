import { createError } from "@src/config/handler/handler";
import fs from 'fs';
import path from 'path';
import { format } from 'fast-csv';
import {ICaseReport, IExportar_Csv} from '@src/interface/export_csv.interface';
import logger from '@src/utils/logger';
import { ISearch_Report_Summary } from "@src/interface";
export class CSVReportGenerator implements IExportar_Csv<ISearch_Report_Summary> {
  basePath: any;
  constructor() {
    this.basePath = path.join(__dirname, 'reports');
    this.ensureBasePath();
  }
  private ensureBasePath() {
    try {
    if(!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath);
    }if (fs.existsSync(this.basePath)) {
      fs.rmdirSync(this.basePath);
    }else {
      logger.error('Error al eliminar la carpeta de exportación');
    }
    } catch (error : any) {
      logger.error(error ? error.message : 'Error al crear la carpeta de exportación');
      throw new Error('general.INTERNAL_SERVER_ERROR.internal_error');
      }
  }
   private generateFileName(): string {
    const date = new Date().toISOString().split('T')[0]; 
    return path.join(this.basePath, `report_${date}.csv`);
  }

  // Crear el reporte CSV
  async create_CSV_Report(data: ISearch_Report_Summary[]): Promise<string> {
    const filePath = this.generateFileName();

    return new Promise((resolve, reject) => {
      const writableStream = fs.createWriteStream(filePath, { encoding: 'utf8' });
      const csvStream = format({ headers: true, delimiter: ',', writeBOM: true });

      writableStream.on('finish', () => resolve(filePath));
      writableStream.on('error', async (err: any) => reject(
        await createError('INTERNAL_SERVER_ERROR.internal_error', err)
    ));

      csvStream.pipe(writableStream);

      data.forEach(record => {
        csvStream.write(record);
      });

      csvStream.end();
    });
    
  }


}
