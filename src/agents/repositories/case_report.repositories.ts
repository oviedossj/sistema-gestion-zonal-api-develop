import { ICase_Report_Repository, IIncident_Report_Files, IncidentReportCreationAttributes, IncidentReportData, ISearch_Report_Summary,  } from '@src/interface';
import { Incident_Report } from '@src/config/db/models/incident_report.models';
import { Query } from '@src/models';
import logger from '@src/utils/logger';
import { createError } from '@src/config/handler/handler';
import { paginate, sortBy } from '@src/utils/pagination';
import { Zone } from '@src/config/db/models/zonas.models';
import { Incident_Report_Types } from '@src/config/db/models/incident_report_types.model';
import { Incident_Report_Files } from '@src/config/db/models/incident_report_files.model';
import { Op } from 'sequelize';

  export class Case_Report_Repository implements ICase_Report_Repository<Incident_Report,ISearch_Report_Summary> {
  async create_case(data: IncidentReportData): Promise<string> {
      try {
        const incidentReportData: Partial<Incident_Report> = await this.convertToIncidentReport(data);
        const createdIncidentReport = await Incident_Report.create(incidentReportData as any);
        if (!createdIncidentReport) throw new Error('general.BAD_REQUEST.invalid_incident_data');
        if (data.files && data.files.length > 0) {
          const filesData:unknown = data.files.map(file => ({
            title: file.title,
            file: file.file,
            incidentReportId: createdIncidentReport.id,
          }));
          await Incident_Report_Files.bulkCreate(filesData as any);
        }
  
        return createdIncidentReport.id.toString();
      } catch (error) {
        logger.error(`Error creating case: ${(error as Error).message}`);
        throw await createError('general.INTERNAL_SERVER_ERROR.incident_report_creation_failed');
      }
  }
  async convertToIncidentReport(data: IncidentReportData): Promise<Partial<Incident_Report>> {
      const files = await this.convertToIncidentReportFiles(data.files ?? []);
  
      return {
        incidentType: data.incidentType,
        incidentSubtype: data.incidentSubtype,
        locationIncident: data.locationIncident,
        latitude: data.latitude,
        longitude: data.longitude,
        description: data.description,
        nivelRiesgo: data.nivelRiesgo,
        localidad: data.localidad,
        barrio: data.barrio,
        calle: data.calle,
        altura: data.altura,
        informacionAdicional: data.informacionAdicional,
        zoneId: data.zoneId,
        createdAt: data.createdAt ?? new Date(),
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
        files, 
      } as Partial<Incident_Report>; 
  }
  async convertToIncidentReportFiles(files: IIncident_Report_Files[]): Promise<Partial<Incident_Report_Files>[]> {
      return files.map(file => ({
        title: file.title,
        file: file.file,
      } as Partial<Incident_Report_Files>));
  }
  async find_One_Case(case_id: number): Promise<Incident_Report | null> {
    try {
      const caseReport = await Incident_Report.findOne({ where: { id: case_id } });
      if (!caseReport) {
        throw await createError('general.NOT_FOUND.incident_report_not_found');
      }
      return caseReport;
    } catch (error) {
      logger.error(`Error finding case: ${(error as Error).message}`);
      throw await createError('general.INTERNAL_SERVER_ERROR.incident_report_fetch_failed');
    }
  }
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
      
      // Validar que type sea un número válido
      if (params.type) {
        if (typeof params.type !== 'string' && typeof params.type !== 'number') {
          throw new Error('general.BAD_REQUEST.invalid_incident_data');
        }
        whereClause['incidentTypeId'] = params.type;
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
      const results = await Incident_Report.findAll({
        where: Object.keys(whereClause).length ? whereClause : undefined,
        include: [
          { model: Zone, required: false },
          { model: Incident_Report_Types, required: false }
        ],
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
  async update_Case(case_id: number, updates: Partial<IncidentReportCreationAttributes>): Promise<boolean> {
    try {
      const [affectedRows] = await Incident_Report.update(updates, { where: { id: case_id } });
      if (affectedRows === 0) {
        throw await createError('general.NOT_FOUND.incident_report_not_found');
      }
      return affectedRows > 0;
    } catch (error) {
      logger.error(`Error updating case: ${(error as Error).message}`);
      throw await createError('general.INTERNAL_SERVER_ERROR.incident_report_update_failed');
    }
  }
}
