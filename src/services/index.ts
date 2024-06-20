import { casereportRepository } from '@src/agents/repositories/index';
import { Incident_Report_Service } from '@src/services/incident_report.service';

const incident_Report_Service = new Incident_Report_Service(casereportRepository);

export { incident_Report_Service };
