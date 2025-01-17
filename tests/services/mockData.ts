import { Incident_Report } from '@/../../src/config/db/models/incident_report.models';
import { IncidentReportData } from '@/../../src/interface';
import { Consult_Report } from '@/../../src//config/db/models/consult_report.model';
import { IConsultReportData } from '@/../../src/interface/consult_report.repositories.interface';

export const mockConsultData: IConsultReportData = {
  incidentType: 1,
  incidentSubtype: 'Subtype A',
  description: 'Description A',
  nivelRiesgo: 'High',
  status: 'Open',
  localidad: 'Localidad A',
  barrio: 'Barrio A',
  numero_padron_municipal: '123',
  zoneId: 1,
};

export const mockConsult: Partial<Consult_Report> = {
  id: 1,
  incidentType: 1,
  incidentSubtype: 'Subtype A',
  description: 'Description A',
  nivelRiesgo: 'High',
  status: 'Open',
  localidad: 'Localidad A',
  barrio: 'Barrio A',
  numero_padron_municipal: '123',
  zoneId: 1,
};

export const mockConsults: Partial<Consult_Report>[] = [
  {
    id: 1,
    incidentType: 1,
    incidentSubtype: 'Subtype A',
    description: 'Description A',
    nivelRiesgo: 'High',
    status: 'Open',
    localidad: 'Localidad A',
    barrio: 'Barrio A',
    numero_padron_municipal: '123',
    zoneId: 1,
  },
  {
    id: 2,
    incidentType: 2,
    incidentSubtype: 'Subtype B',
    description: 'Description B',
    nivelRiesgo: 'Low',
    status: 'Closed',
    localidad: 'Localidad B',
    barrio: 'Barrio B',
    numero_padron_municipal: '456',
    zoneId: 2,
  },
];

export const mockIncidentData: IncidentReportData = {
  incidentType: 1,
  incidentSubtype: 'Subtype 1',
  locationIncident: 'Location 1',
  latitude: '40.7128',
  longitude: '-74.0060',
  description: 'Description 1',
  nivelRiesgo: 'High',
  localidad: 'Localidad 1',
  barrio: 'Barrio 1',
  calle: 'Calle 1',
  altura: '100',
  informacionAdicional: 'Some additional information',
  zoneId: 1,
};

export const mockIncident: Partial<Incident_Report> = {
  id: 1,
  incidentType: 1,
  incidentSubtype: 'Subtype 1',
  locationIncident: 'Location 1',
  latitude: '40.7128',
  longitude: '-74.0060',
  description: 'Description 1',
  nivelRiesgo: 'High',
  localidad: 'Localidad 1',
  barrio: 'Barrio 1',
  calle: 'Calle 1',
  altura: '100',
  informacionAdicional: 'Some additional information',
  zoneId: 1,
};

export const mockIncidents: Partial<Incident_Report>[] = [
  {
    id: 1,
    incidentType: 1,
    incidentSubtype: 'Subtype 1',
    locationIncident: 'Location 1',
    latitude: '40.7128',
    longitude: '-74.0060',
    description: 'Description 1',
    nivelRiesgo: 'High',
    localidad: 'Localidad 1',
    barrio: 'Barrio 1',
    calle: 'Calle 1',
    altura: '100',
    informacionAdicional: 'Some additional information',
    zoneId: 1,
  },
  {
    id: 2,
    incidentType: 2,
    incidentSubtype: 'Subtype 2',
    locationIncident: 'Location 2',
    latitude: '34.0522',
    longitude: '-118.2437',
    description: 'Description 2',
    nivelRiesgo: 'Low',
    localidad: 'Localidad 2',
    barrio: 'Barrio 2',
    calle: 'Calle 2',
    altura: '200',
    informacionAdicional: 'More information here',
    zoneId: 2,
  },
];
