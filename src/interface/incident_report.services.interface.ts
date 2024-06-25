import { Iverify_Agente, Query } from '@src/models';
import { AddressData } from './httpClient.interface';
import { IncidentReportData } from './case_report.repositories.inteface';
import { IConsultReportData } from './consult_report.repositories.interface';

export interface IIncident_Report_Service<T> {
  // ------------------- Case management --------------

  search_case(query: Query, user: Iverify_Agente): Promise<T[]>;
  search_consulta(query: Query, user: Iverify_Agente): Promise<T[]>;
  create_case(incidentData: IncidentReportData): Promise<string>;
  create_consult(incidentData: IConsultReportData): Promise<string>;
  // update_case(case_id: string, changes: object): Promise<boolean>;

  // ---------------------- Reusable -----------------------------

  verify_direction(direction: string,user: Iverify_Agente): Promise<AddressData>
  exportar_Csv(query:Query,user:Iverify_Agente): Promise<string>
}

export interface ISearch_Report_Summary {
  id: number;
  incidentId: string;
  incidentType: number;
  incidentSubtype: string;
  status: string;
  createdAt: Date;
  nivelRiesgo: string;
}