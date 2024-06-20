import { Query } from '../models';

export interface ICase_Report_Repository<T> {
// ------------------------- Gestion de casos --------------------------------------
  // query_Construction(query:Query):Promise<string>
  create_case( data : (object | T) ) :Promise <void>
  find_One_Case(case_id: number): Promise< T | null> ;
  find_All(query:Query): Promise< T[] | null> 
  update_Case(case_id:number,updates: Partial<T>): Promise< boolean > 


}


export interface IncidentReportData {
  incidentType: number;                // Tipo de incidente
  incidentSubtype: string;             // Subtipo de incidente
  locationIncident: string;            // Ubicación del incidente
  latitude: string;                    // Latitud del incidente
  longitude: string;                   // Longitud del incidente
  description: string;                 // Descripción del incidente
  nivelRiesgo: string;                 // Nivel de riesgo asociado
  localidad: string;                   // Localidad del incidente
  barrio: string;                      // Barrio del incidente
  calle: string;                       // Calle del incidente
  altura: string;                      // Altura del incidente
  informacionAdicional?: string;       // Información adicional (opcional)
}
export interface IncidentReportCreationAttributes extends Omit<IncidentReportAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

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
  altura: string;
  informacionAdicional?: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
