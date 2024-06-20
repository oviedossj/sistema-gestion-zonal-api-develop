import { Incident_Report } from '@src/config/db/models/incident_report.models';
import { IIncident_Report_Service, ICase_Report_Repository } from '@src/interface/index';
import { Query } from '@src/models';
import { IncidentReportData } from '@src/interface';
import { createError } from '@src/config/handler/handler';
import logger from '@src/utils/logger';

export class Incident_Report_Service implements IIncident_Report_Service<Incident_Report> {
    constructor(private readonly repository: ICase_Report_Repository<Incident_Report>) {}

    async search_case(query: Query): Promise<Incident_Report[]> {
        try {
            const data = await this.repository.find_All(query);
            if (!data || data.length === 0) {
                throw new Error('NOT_FOUND.not_found');
            }
            return data;
        } catch (error) {
            logger.error('Error searching cases:', error);
            throw await createError('INTERNAL_SERVER_ERROR.internal_error');
        }
    }

    async create_case(body_case: IncidentReportData): Promise<Incident_Report> {
        try {
            const data = await this.repository.create_case(body_case);
            if (typeof data === 'undefined' || data === null) {
                throw new Error('INTERNAL_SERVER_ERROR.internal_error');
            }
            return data;
        } catch (error) {
            logger.error('Error creating case:', error);
            throw await createError('INTERNAL_SERVER_ERROR.internal_error');
        }
    }

    async update_case(case_id: string, changes: Partial<IncidentReportData>): Promise<true> {
        try {
            const caseIdNumber = parseInt(case_id, 10);
            if (Number.isNaN(caseIdNumber)) {
                throw new Error('BAD_REQUEST.invalid_case_id');
            }

            const data = await this.repository.update_Case(caseIdNumber, changes);
            if (data === false || data === null) {
                throw new Error('NOT_FOUND.not_found');
            }
            return data ;
        } catch (error) {
            logger.error('Error updating case:', error);
            throw await createError('INTERNAL_SERVER_ERROR.internal_error');
        }
    }
}

    // ---------------------- Reusable -----------------------------

    // async exportar_Csv(query: Query): Promise<void> {
    //     // Implementa la lógica para exportar datos a CSV.
    //     const data = await this.repository.search(query);
    //     // Aquí debes incluir la lógica para convertir los datos en un archivo CSV y guardarlo/exportarlo.
    // }
