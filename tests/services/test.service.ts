// import { Incident_Report_Service } from '@./../../src/services/incident_report.service';
// import { ICase_Report_Repository, IncidentReportData } from '@./../../src/interface';
// import { Incident_Report } from '@./../../src/config/db/models/incident_report.models';
// import { Query } from '@./../../src/models';
// import { mockIncidentData, mockIncident, mockIncidents } from './mockData';

// jest.mock('@src/config/db/models/incident_report.models');

// describe('Incident_Report_Service', () => {
//   let repository: ICase_Report_Repository<Incident_Report>;
//   let service: Incident_Report_Service;

//   beforeEach(() => {
//     repository = {
//       find_All: jest.fn(),
//       create_case: jest.fn(),
//       update_Case: jest.fn(),
//     } as unknown as ICase_Report_Repository<Incident_Report>;

//     service = new Incident_Report_Service(repository);
//     jest.clearAllMocks();
//   });

//   it('should return limited cases sorted by incidentType in descending order', async () => {
//     const mockQuery: Query = {
//       limit: '1',
//       offset: 'incidentType',
//       order: 'desc',
//     };
//     const expectedIncidents = [mockIncidents[1]]; 

//     (repository.find_All as jest.Mock).mockResolvedValue(expectedIncidents);

//     const result = await service.search_case(mockQuery);
//     expect(result).toEqual(expectedIncidents);
//     expect(repository.find_All).toHaveBeenCalledWith(mockQuery);
//   });

//   // Prueba del método search_case con filtros
//   it('should return filtered cases', async () => {
//     const mockQuery: Query = {
//       filter: { incidentType: 1 },
//       limit: '1', 
//       offset: 'id',
//       order: 'asc',
//     };
//     const expectedIncidents = [mockIncidents[0]]; 

//     (repository.find_All as jest.Mock).mockResolvedValue(expectedIncidents);

//     const result = await service.search_case(mockQuery);
//     expect(result).toEqual(expectedIncidents);
//     expect(repository.find_All).toHaveBeenCalledWith(mockQuery);
//   });

//   it('should throw an error if no cases are found with query', async () => {
//     const mockQuery: Query = { filter: { incidentType: 3 }, limit: "1", offset: 'id', order: 'asc' }; 
//     (repository.find_All as jest.Mock).mockResolvedValue([]);

//     await expect(service.search_case(mockQuery)).rejects.toThrow('INTERNAL_SERVER_ERROR.internal_error');
//     expect(repository.find_All).toHaveBeenCalledWith(mockQuery);
//   });

//   // Prueba del método create_case
//   it('should create a new case', async () => {
//     (repository.create_case as jest.Mock).mockResolvedValue(mockIncident);

//     const result = await service.create_case(mockIncidentData);
//     expect(result).toEqual(mockIncident);
//     expect(repository.create_case).toHaveBeenCalledWith(mockIncidentData);
//   });

//   it('should throw an error if case creation fails', async () => {
//     (repository.create_case as jest.Mock).mockResolvedValue(null);

//     await expect(service.create_case(mockIncidentData)).rejects.toThrow('INTERNAL_SERVER_ERROR.internal_error');
//     expect(repository.create_case).toHaveBeenCalledWith(mockIncidentData);
//   });

//   // Prueba del método update_case
//   it('should update a case', async () => {
//     const mockCaseId = '1';
//     const mockChanges: Partial<IncidentReportData> = { barrio: 'Barrio 3' };
//     (repository.update_Case as jest.Mock).mockResolvedValue(true);

//     const result = await service.update_case(mockCaseId, mockChanges);
//     expect(result).toBe(true);
//     expect(repository.update_Case).toHaveBeenCalledWith(parseInt(mockCaseId, 10), mockChanges);
//   });

//   it('should throw an error if case update fails', async () => {
//     const mockCaseId = '1';
//     const mockChanges: Partial<IncidentReportData> = { barrio: 'Barrio 3' };
//     (repository.update_Case as jest.Mock).mockResolvedValue(false);

//     await expect(service.update_case(mockCaseId, mockChanges)).rejects.toThrow('INTERNAL_SERVER_ERROR.internal_error');
//     expect(repository.update_Case).toHaveBeenCalledWith(parseInt(mockCaseId, 10), mockChanges);
//   });
// });
