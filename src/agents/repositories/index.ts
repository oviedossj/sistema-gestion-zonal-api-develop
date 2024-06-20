import { Case_Report_Repository } from './case_report.repositories';
import  { Permission_Repositories }  from './permission.repositories';

const permisiionRepository = new Permission_Repositories();
const  casereportRepository = new Case_Report_Repository();
export { permisiionRepository,casereportRepository };
