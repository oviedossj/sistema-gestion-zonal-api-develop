// src/models/index.ts
import { User } from './users.models';
import { User_Temp } from './users_temp.models';
import { Permission_User } from './permission_user.models';
import { Role } from './roles.models';
import { Area } from './areas.models';
import { Zona } from './zonas.models';
import { Paperwork_Item } from './paperwork_item.model';
import { Incident_Report } from './incident_report.models';
import { Incident_Report_Files } from './incident_report_files.model';
import { Incident_Report_Types } from './incident_report_types.model';

export const models = [User, User_Temp, Permission_User, Role, Area, Zona, Incident_Report, Incident_Report_Files, Incident_Report_Types, Paperwork_Item];
