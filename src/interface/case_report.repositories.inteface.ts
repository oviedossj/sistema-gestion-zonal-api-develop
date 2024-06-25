import { Incident_Report_Files } from '@src/config/db/models/incident_report_files.model';
import { Query } from '../models';

export interface ICase_Report_Repository<T,K> {
  convertToIncidentReport(data: IncidentReportData): Promise<Partial<T>>;
  convertToIncidentReportFiles(files?: IIncident_Report_Files[]): Promise<Partial<Incident_Report_Files>[]>;
  create_case(data: IncidentReportData): Promise<string>;
  find_One_Case(case_id: number): Promise<T | null>;
  find_All(query: Query): Promise<K[] | null>;
  update_Case(case_id: number, updates: Partial<T>): Promise<boolean>;
}
export interface IncidentReportData {
  incidentType: number;
  incidentSubtype: string;
  locationIncident: string;
  latitude: string;
  longitude: string;
  description: string;
  nivelRiesgo: string;
  localidad: string;
  barrio: string;
  calle: string;
  altura: string;
  informacionAdicional?: string;
  zoneId: number;
  status?: string;
  files?: IIncident_Report_Files[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IIncident_Report_Files {
  title: string;
  file: number;
}


export interface IncidentReportCreationAttributes
  extends Omit<IncidentReportAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

export interface IncidentReportAttributes {
  id: number;
  incidentType: number;
  incidentSubtype: string;
  locationIncident: string;
  latitude: string;
  longitude: string;
  description: string;
  nivelRiesgo: string;
  localidad: string;
  barrio: string;
  calle: string;
  status: string;
  altura: string;
  informacionAdicional?: string;
  zoneId: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

