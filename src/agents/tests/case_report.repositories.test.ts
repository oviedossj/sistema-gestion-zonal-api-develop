import { Case_Report_Repository } from '@agents/repositories/case_report.repositories';
import { Incident_Report } from '@src/config/db/models/incident_report.models';

jest.mock('@src/config/db/models/incident_report.models');

const MockedIncidentReport = Incident_Report as jest.Mocked<typeof Incident_Report>;

describe('Case_Report_Repository with mocks', () => {
  let repository: Case_Report_Repository;

  beforeEach(() => {
    repository = new Case_Report_Repository();
    jest.clearAllMocks();
  });

  // Prueba del método create_case
  it('should create a case', async () => {
    const incidentData = {
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
    };

    MockedIncidentReport.create.mockResolvedValue(incidentData as Incident_Report);

    await repository.create_case(incidentData);
    expect(MockedIncidentReport.create).toHaveBeenCalledWith(expect.objectContaining(incidentData));
  });

  // Prueba del método find_One_Case
  it('should find a case by id', async () => {
    const incident = {
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
    };

    MockedIncidentReport.findOne.mockResolvedValue(incident as Incident_Report);

    const foundIncident = await repository.find_One_Case(1);
    expect(foundIncident).toEqual(incident);
    expect(MockedIncidentReport.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  // Prueba del método find_All
  it('should find all cases', async () => {
    const incidents = [
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
      },
    ];

    MockedIncidentReport.findAll.mockResolvedValue(incidents as Incident_Report[]);

    const allCases = await repository.find_All();
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
