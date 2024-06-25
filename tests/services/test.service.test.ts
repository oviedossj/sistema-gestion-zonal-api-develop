import { Incident_Report_Service } from '@./../../src/services/incident_report.service';
import { ICase_Report_Repository, IncidentReportData, ISearch_Report_Summary } from '@./../../src/interface';
import { Incident_Report } from '@./../../src/config/db/models/incident_report.models';
import { Consult_Report } from '@./../../src/config/db/models/consult_report.model';
import { Query } from '@./../../src/models';
import { IConsultReport_Repository } from '../../src/interface/consult_report.repositories.interface';
import { mockIncidentData, mockIncident, mockIncidents, mockConsultData, mockConsult, mockConsults } from './mockData';

jest.mock('@src/config/db/models/incident_report.models');
jest.mock('@src/config/db/models/consult_report.model');

describe('Incident_Report_Service', () => {
  let incidentRepository: ICase_Report_Repository<Incident_Report, ISearch_Report_Summary>;
  let consultRepository: IConsultReport_Repository<Consult_Report>;
  let service: Incident_Report_Service;

  beforeEach(() => {
    incidentRepository = {
      find_All: jest.fn(),
      create_case: jest.fn(),
      update_Case: jest.fn(),
    } as unknown as ICase_Report_Repository<Incident_Report, ISearch_Report_Summary>;

    consultRepository = {
      find_All: jest.fn(),
      // create_case: jest.fn(),  // O el método correspondiente si existe
      // update_Case: jest.fn(),  // O el método correspondiente si existe
    } as unknown as IConsultReport_Repository<Consult_Report>;

    service = new Incident_Report_Service(incidentRepository, consultRepository);
    jest.clearAllMocks();
  });

  // Prueba del método search_case
  test('should return limited cases sorted by incidentType in descending order', async () => {
    const mockQuery: Query = {
      limit: '1',
      offset: 'incidentType',
      order: 'desc',
    };
    const mockUser = { id: 1, role: 'admin' };

    const expectedIncidents = [mockIncidents[1]];

    (incidentRepository.find_All as jest.Mock).mockResolvedValue(expectedIncidents);

    const result = await service.search_case(mockQuery, mockUser);
    expect(result).toEqual(expectedIncidents);
    expect(incidentRepository.find_All).toHaveBeenCalledWith(mockQuery);
  });

  // Prueba del método search_consulta
  test('should return consult reports sorted by createdAt in ascending order', async () => {
    const mockQuery: Query = {
      limit: '1',
      offset: 'createdAt',
      order: 'asc',
    };
    const mockUser = { id: 1, role: 'admin' };

    const expectedConsults = [mockConsults[0]];

    (consultRepository.find_All as jest.Mock).mockResolvedValue(expectedConsults);

    const result = await service.search_consulta(mockQuery, mockUser);
    expect(result).toEqual(expectedConsults);
    expect(consultRepository.find_All).toHaveBeenCalledWith(mockQuery);
  });

  // Prueba del método create_case
  test('should create a new case', async () => {
    (incidentRepository.create_case as jest.Mock).mockResolvedValue(mockIncident);

    const result = await service.create_case(mockIncidentData);
    expect(result).toEqual(mockIncident);
    expect(incidentRepository.create_case).toHaveBeenCalledWith(mockIncidentData);
  });

  // // Prueba del método create_consult
  // test('should create a new consult', async () => {
  //   (consultRepository.create_case as jest.Mock).mockResolvedValue(mockConsult);

  //   const result = await service.create_consult(mockConsultData);
  //   expect(result).toEqual(mockConsult);
  //   expect(consultRepository.create_case).toHaveBeenCalledWith(mockConsultData);
  // });

  // Prueba del método update_case
  // test('should update a case', async () => {
  //   const mockCaseId = '1';
  //   const mockChanges: Partial<IncidentReportData> = { barrio: 'Barrio 3' };
  //   (incidentRepository.update_Case as jest.Mock).mockResolvedValue(true);

  //   const result = await service.update_case(mockCaseId, mockChanges);
  //   expect(result).toBe(true);
  //   expect(incidentRepository.update_Case).toHaveBeenCalledWith(parseInt(mockCaseId, 10), mockChanges);
  // });
  
  // Prueba del método verify_direction
  // test('should verify direction and return address data', async () => {
  //   const mockDirection = 'Calle Falsa 123';
  //   const mockUser = { id: 1, role: 'admin', zone: 'Zona 1' };
  //   const expectedAddressData = { ... };

  //   // Mockea la función HttpClient.get para que devuelva los datos de dirección esperados
  //   HttpClient.prototype.get = jest.fn().mockResolvedValue(expectedAddressData);

  //   const result = await service.verify_direction(mockDirection, mockUser);
  //   expect(result).toEqual(expectedAddressData);
  // });
});
