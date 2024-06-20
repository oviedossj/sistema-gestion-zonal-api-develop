import { incident_Report_Service } from '@src/services/index';
import { Incident_Report_Controller } from './incident_report.controllers';

const incident_report_controller = new Incident_Report_Controller(incident_Report_Service);

export { incident_report_controller };
