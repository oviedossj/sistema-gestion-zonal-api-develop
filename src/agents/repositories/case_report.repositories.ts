import { ICase_Report_Repository, IncidentReportCreationAttributes } from '@src/interface';
import { Incident_Report } from '@src/config/db/models/incident_report.models';
import logger from '@src/utils/logger';
import { createError } from '@src/config/handler/handler';

export class Case_Report_Repository implements ICase_Report_Repository<Incident_Report> {
  
  async create_case(data: IncidentReportCreationAttributes): Promise<void> {
    try {
      await Incident_Report.create(data);
    } catch (error) {
      logger.error(`Error creating case: ${(error as Error).message}`);
      throw await createError('general.INTERNAL_SERVER_ERROR.incident_report_creation_failed');
    }
  }

  async find_One_Case(case_id: number): Promise<Incident_Report | null> {
    try {
      const caseReport = await Incident_Report.findOne({ where: { id: case_id } });
      if (!caseReport) {
        throw await createError('general.NOT_FOUND.incident_report_not_found');
      }
      return caseReport;
    } catch (error) {
      logger.error(`Error finding case: ${(error as Error).message}`);
      throw await createError('general.INTERNAL_SERVER_ERROR.incident_report_fetch_failed');
    }
  }

  async find_All(): Promise<Incident_Report[]> {
    try {
      const results = await Incident_Report.findAll();
      return results;
    } catch (error) {
      logger.error(`Error finding all cases: ${(error as Error).message}`);
      throw await createError('general.INTERNAL_SERVER_ERROR.incident_report_search_failed');
    }
  }

  async update_Case(case_id: number, updates: Partial<IncidentReportCreationAttributes>): Promise<boolean> {
    try {
      const [affectedRows] = await Incident_Report.update(updates, { where: { id: case_id } });
      if (affectedRows === 0) {
        throw await createError('general.NOT_FOUND.incident_report_not_found');
      }
      return affectedRows > 0;
    } catch (error) {
      logger.error(`Error updating case: ${(error as Error).message}`);
      throw await createError('general.INTERNAL_SERVER_ERROR.incident_report_update_failed');
    }
  }
}
