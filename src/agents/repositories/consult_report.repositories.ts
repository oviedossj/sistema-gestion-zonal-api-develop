
import { Consult_Report } from '@src/config/db/models/consult_report.model';
import { Zone } from '@src/config/db/models/zonas.models';
import { createError } from '@src/config/handler/handler';
import { ISearch_Report_Summary } from '@src/interface';
import { IConsultReport_Repository } from '@src/interface/consult_report.repositories.interface';
import { Query } from '@src/models';
import logger from '@src/utils/logger';
import { paginate, sortBy } from '@src/utils/pagination';
import { Op } from 'sequelize';

export class Consult_Report_Repository implements IConsultReport_Repository<ISearch_Report_Summary> {
    constructor() {}
    async find_All(params: Query): Promise<ISearch_Report_Summary[]> {
      try {
        const { limit, offset } = paginate(params);
        const { sort, dir } = sortBy(params);
        const whereClause: any = {};
        let attributes = ['id', 'incidentId', 'incidentType', 'incidentSubtype', 'status', 'createdAt', 'nivelRiesgo'];
    
        // Filtrado por zona geográfica
        if (params.zone_geografica) {
          if (typeof params.zone_geografica !== 'string') {
            throw new Error('general.BAD_REQUEST.invalid_incident_data');
          }
          whereClause['$zone.zoneGeografica$'] = params.zone_geografica;
        }
    
        // Filtrado por fecha del caso (última semana)
        if (params.case_date) {
          if (typeof params.case_date !== 'string') throw new Error('general.BAD_REQUEST.invalid_incident_data');
          
          const caseDate = new Date(params.case_date);
          caseDate.setDate(caseDate.getDate() + 7);
    
          whereClause['$case.createdAt$'] = {
            [Op.between]: [params.case_date, caseDate.toISOString().split('T')[0]]
          };
          attributes = ['id', 'incidentId', 'incidentType', 'incidentSubtype', 'status', 'createdAt', 'nivelRiesgo'];
        }
    
        // Ejecutar la búsqueda
        const results: any[] = await Consult_Report.findAll({
          where: Object.keys(whereClause).length ? whereClause : undefined,
          include: [{ model: Zone, required: false }],
          attributes,
          limit,
          offset,
          order: [[sort, dir]],
        });
        return results;
      } catch (error) {
        logger.error(`Error finding all cases: ${(error as Error).message}`);
        throw await createError('general.INTERNAL_SERVER_ERROR.incident_report_search_failed');
      }
    }
    

    // async createPaperworkItem(data: any, transaction?: Transaction): Promise<Paperwork_Item> {
    //     return this.paperworkItemModel.create(data, {
    //         include: [Incident_Report],
    //         transaction,
    //     });
    // }
}
