import { Query } from "@src/models";

export interface IConsultReportData {
  incidentType: number;
  incidentSubtype: string;
  description: string;
  nivelRiesgo: string;
  localidad: string;
  barrio: string;
  numero_padron_municipal: string;
  status: string;
  zoneId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IConsultReport_Repository<T> {
    find_All(params: Query): Promise<(T[])>;
}
