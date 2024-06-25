import { Incident_Report } from '@src/config/db/models/incident_report.models';
import { IIncident_Report_Service, ICase_Report_Repository, Roles_controllers, AddressData, ISearch_Report_Summary } from '@src/interface/index';
import { Iverify_Agente, Query } from '@src/models';
import { IncidentReportData } from '@src/interface';
import { createError } from '@src/config/handler/handler';
import logger from '@src/utils/logger';
import config from '@src/config/env/env';
import { HttpClient } from '@src/utils/HttpClient';
import { Consult_Report } from '@src/config/db/models/consult_report.model';
import { IConsultReport_Repository, IConsultReportData } from '@src/interface/consult_report.repositories.interface';
import { ICaseReport } from '@src/interface/export_csv.interface';
import { CSVReportGenerator } from '@src/utils/exportarCSV';
export class Incident_Report_Service implements IIncident_Report_Service<ISearch_Report_Summary> {

  constructor(private readonly repository: ICase_Report_Repository<Incident_Report,ISearch_Report_Summary>,private readonly consult_repository: IConsultReport_Repository<ISearch_Report_Summary>) {}
  // public async update_case(case_id: string, changes: Partial<IncidentReportData>): Promise<true> {
  //   try {
  //     const caseIdNumber = parseInt(case_id, 10);
  //     if (Number.isNaN(caseIdNumber))  throw new Error('BAD_REQUEST.invalid_case_id');
  //     const data = await this.repository.update_Case(caseIdNumber, changes);
  //     if (data === false || data === null)   throw new Error('NOT_FOUND.not_found');
  //     return data;
  //   } catch (error) {
  //     logger.error('Error updating case:', error);
  //     throw await createError('INTERNAL_SERVER_ERROR.internal_error');
  //   }
  // }
  public async create_consult(incidentData: IConsultReportData): Promise<string> {
  try {
    const consultReport = await Consult_Report.create(incidentData as Consult_Report);
    if (!consultReport) throw new Error('general.BAD_REQUEST.invalid_incident_data');
    return consultReport.id.toString()
  } catch (error) {
    logger.error('Error creating case:', error);
    throw await createError('INTERNAL_SERVER_ERROR.internal_error');
  } 
  
  }
  public async search_consulta(query: Query, user: Iverify_Agente): Promise<ISearch_Report_Summary[]> {
    try {
      const queryCopy = { ...query };
      if (user.role === Roles_controllers.CGM) queryCopy.zone_geografica = user.zone;
      if (user.role === Roles_controllers.AREA) queryCopy.type = user.type;
      const data = await this.consult_repository.find_All(queryCopy);
      if (!data || data.length === 0) throw new Error('general.NOT_FOUND.incident_report_not_found');
      
      return data;
    } catch (error) {
      logger.error('Error searching cases:', error);
      throw await createError((error as Error).message || 'general.INTERNAL_SERVER_ERROR.incident_report_search_failed');
    }
  }
  public async create_case( incidentData: IncidentReportData): Promise<string> {
    try {
      return await this.repository.create_case(incidentData);
    } catch (error) {
      logger.error('Error creating case:', error);
      throw await createError('INTERNAL_SERVER_ERROR.internal_error');
    } 
  }
  public async search_case(query: Query, user: Iverify_Agente): Promise<ISearch_Report_Summary[]> {
    try {
      const queryCopy = { ...query };
      if (user.role === Roles_controllers.CGM) queryCopy.zone_geografica = user.zone;
      if (user.role === Roles_controllers.AREA) queryCopy.type = user.type;
      const data = await this.repository.find_All(queryCopy);
      if (!data || data.length === 0) throw new Error('general.NOT_FOUND.incident_report_not_found');
      
      return data;
    } catch (error) {
      logger.error('Error searching cases:', error);
      throw await createError((error as Error).message || 'general.INTERNAL_SERVER_ERROR.incident_report_search_failed');
    }
  }
  public async verify_direction(direction: string, user: Iverify_Agente): Promise<AddressData> {
    try {
      const url = config.API_MAPASTER;
      const params = { address: direction };
      const response = await new HttpClient().get<object, AddressData>(url, params);
      if (user.role === Roles_controllers.CGM) {
        if (user.zone !== response.cgm) {
          throw await createError('general.FORBIDDEN.agent_outside_allowed_zone');
        }
      }
      return response;
    } catch (error) {
      logger.error('Error verifying direction:', error);
      throw await createError((error as Error).message || 'general.INTERNAL_SERVER_ERROR.internal_error');
    }
  }
  public async exportar_Csv(query: Query,user: Iverify_Agente ): Promise<string> {
    // Implementa la lógica para exportar datos a CSV.
    try{
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    query.case_date = oneWeekAgo.toISOString().split('T')[0];
    const [incidentReports, consultReports] = await Promise.all([
      this.search_case(query, user),
      this.search_consulta(query, user),
    ]);
     return await new CSVReportGenerator().create_CSV_Report([...incidentReports, ...consultReports]);
    }catch(error){
      logger.error('Error exporting CSV:', error);
      throw await createError((error as Error).message || 'general.INTERNAL_SERVER_ERROR.internal_error');
    }
}
}