import { Consult_Report_Repository } from '@src/agents/repositories/consult_report.repositories';
import { Consult_Report } from '@src/config/db/models/consult_report.model';
import { Zone } from '@src/config/db/models/zonas.models';
import { Query } from '@src/models';
import { ISearch_Report_Summary } from '@src/interface';
import { paginate, sortBy } from '@src/utils/pagination';
import logger from '@src/utils/logger';

jest.mock('@src/config/db/models/consult_report.model');
jest.mock('@src/config/db/models/zonas.models');
jest.mock('@src/utils/pagination');
jest.mock('@src/utils/logger');

describe('Consult_Report_Repository', () => {
  let repository: Consult_Report_Repository;

  beforeEach(() => {
    repository = new Consult_Report_Repository();
    jest.clearAllMocks();
  });
  
//  test que deben pasar

  test('should return paginated and sorted results', async () => {
    const mockQuery: Query = {
      limit: '10',
      offset: '0',
      order: 'asc',
    };

    const mockReports: ISearch_Report_Summary[] = [
      {
        id: 1,
        incidentType: 1,
        incidentSubtype: 'Subtype 1',
        status: 'Open',
        createdAt: new Date(),
        nivelRiesgo: 'High',
      },
      {
        id: 2,
        incidentType: 2,
        incidentSubtype: 'Subtype 2',
        status: 'Closed',
        createdAt: new Date(),
        nivelRiesgo: 'Low',
      }
    ];

    // Mock de paginate y sortBy
    (paginate as jest.Mock).mockReturnValue({ limit: 10, offset: 0 });
    (sortBy as jest.Mock).mockReturnValue({ sort: 'createdAt', dir: 'asc' });

    // Mock de findAll
    (Consult_Report.findAll as jest.Mock).mockResolvedValue(mockReports);

    const result = await repository.find_All(mockQuery);
    expect(result).toEqual(mockReports);
    expect(Consult_Report.findAll).toHaveBeenCalledWith(expect.objectContaining({
      limit: 10,
      offset: 0,
      order: [['createdAt', 'asc']]
    }));
  });

  test('should handle empty results', async () => {
    const mockQuery: Query = {
      limit: '10',
      offset: '0',
      order: 'asc',
    };

    // Mock de paginate y sortBy
    (paginate as jest.Mock).mockReturnValue({ limit: 10, offset: 0 });
    (sortBy as jest.Mock).mockReturnValue({ sort: 'createdAt', dir: 'asc' });

    // Mock de findAll
    (Consult_Report.findAll as jest.Mock).mockResolvedValue([]);

    const result = await repository.find_All(mockQuery);
    expect(result).toEqual([]);
    expect(Consult_Report.findAll).toHaveBeenCalledWith(expect.objectContaining({
      limit: 10,
      offset: 0,
      order: [['createdAt', 'asc']]
    }));
  });

  //  test que deben fallar

  // test('should throw error on invalid zone_geografica', async () => {
  //   const mockQuery: Query = {
  //     zone_geografica: '123', 
  //     limit: '10',
  //     offset: '0',
  //     order: 'asc',
  //   };

  //   await expect(repository.find_All(mockQuery)).rejects.toThrow('general.BAD_REQUEST.invalid_incident_data');
  // });

  // test('should handle internal errors', async () => {
  //   const mockQuery: Query = {
  //     limit: '10',
  //     offset: '0',
  //     order: 'asc',
  //   };

  //   (paginate as jest.Mock).mockReturnValue({ limit: 10, offset: 0 });
  //   (sortBy as jest.Mock).mockReturnValue({ sort: 'createdAt', dir: 'asc' });

  //   (Consult_Report.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

  //   await expect(repository.find_All(mockQuery)).rejects.toThrow('general.INTERNAL_SERVER_ERROR.incident_report_search_failed');
  //   expect(logger.error).toHaveBeenCalledWith('Error finding all cases: Database error');
  // });
});
