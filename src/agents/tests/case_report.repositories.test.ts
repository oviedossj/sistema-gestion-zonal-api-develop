import { Case_Report_Repository } from '@agents/repositories/case_report.repositories';
import { Incident_Report } from '@src/config/db/models/incident_report.models';
import { Query } from '@src/models';
import { mockIncident, mockIncidents } from './mockData';
import { IncidentReportCreationAttributes } from '@src/interface';

jest.mock('@src/config/db/models/incident_report.models');

const MockedIncidentReport = Incident_Report as jest.Mocked<typeof Incident_Report>;

describe('Case_Report_Repository with mocks', () => {
  let repository: Case_Report_Repository;

  beforeEach(() => {
    repository = new Case_Report_Repository();
    jest.clearAllMocks();
  });

  // Prueba del método create_case
  // it('should create a case', async () => {
  //   const incidentData = mockIncident as IncidentReportCreationAttributes;

  //   MockedIncidentReport.create.mockResolvedValue(incidentData as IncidentReportCreationAttributes);

  //   await repository.create_case(incidentData);
  //   expect(MockedIncidentReport.create).toHaveBeenCalledWith(expect.objectContaining(incidentData));
  // });

  // Prueba del método find_One_Case
  it('should find a case by id', async () => {
    const incident = mockIncident 

    MockedIncidentReport.findOne.mockResolvedValue(incident as Incident_Report);

    const foundIncident = await repository.find_One_Case(1);
    expect(foundIncident).toEqual(incident);
    expect(MockedIncidentReport.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  // Prueba del método find_All
  it('should find all cases', async () => {
    const incidents = mockIncidents

    MockedIncidentReport.findAll.mockResolvedValue(incidents as Incident_Report[]);
    const mockQuery: Query = {
      limit: '1',
      offset: 'incidentType',
      order: 'desc',
      type: 'Seguridad'
    };
    const allCases = await repository.find_All(mockQuery);
    expect(allCases).toEqual(incidents);
    expect(MockedIncidentReport.findAll).toHaveBeenCalled();
  });

  // Prueba del método update_Case
  it('should update the barrio of a case', async () => {
    const case_id = 2;
    MockedIncidentReport.update.mockResolvedValue([1]);

    const updated = await repository.update_Case(case_id, { barrio: 'Barrio 3' });
    expect(updated).toBe(true);
    expect(MockedIncidentReport.update).toHaveBeenCalledWith({ barrio: 'Barrio 3' }, { where: { id: case_id } });
  });
});
