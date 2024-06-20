// import { Incident_Report } from '@src/config/db/models/incident_report.models';
// import { IIncident_Report_Service, ICase_Report_Repository } from '@src/interface/index';
// import { Query } from '@src/models';
// import { IncidentReportData } from '@src/interface';
// import { createError } from '@src/config/handler/handler';

// export class Incident_Report_Service implements IIncident_Report_Service<Incident_Report> {
//     constructor(private readonly repository: ICase_Report_Repository<Incident_Report>) {}

//     // ---------------------- Reusable -----------------------------

//     async update_Citizen(user_id: string): Promise<Incident_Report | null> {
//         // Implementa la lógica para actualizar la información del ciudadano.
//         return this.repository.updateUser(user_id);
//     }
//     // ---------------- permission center--------------------------

//     async grant_permissions(user_id: string): Promise<void> {
//         // Implementa la lógica para otorgar permisos a un usuario.
//         await this.repository.grantPermissions(user_id);
//     }
// }
