import { casereportRepository, consultreportRepository } from '@src/agents/repositories/index';
import { Incident_Report_Service } from '@src/services/incident_report.service';

const incident_Report_Service = new Incident_Report_Service(casereportRepository, consultreportRepository);

export { incident_Report_Service };
