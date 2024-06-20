import { Request, Response, NextFunction } from 'express';
import { IIncident_Report_Service } from '@src/interface/index';
import { IncidentReportData } from '@src/interface';
import { Incident_Report } from '@src/config/db/models/incident_report.models';
import { Query } from '@src/models';

export class Incident_Report_Controller {
  constructor(private readonly incident_report_service: IIncident_Report_Service<Incident_Report>) {}

public async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
         const   newReportData: IncidentReportData = {
                incidentType: req.body.incidentType,
                incidentSubtype: req.body.incidentSubtype,
                locationIncident: req.body.locationIncident,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                description: req.body.description,
                nivelRiesgo: req.body.nivelRiesgo,
                localidad: req.body.localidad,
                barrio: req.body.barrio,
                calle: req.body.calle,
                altura: req.body.altura,
                informacionAdicional: req.body.informacionAdicional,
                };
            const incidentReport = await this.incident_report_service.create_case(newReportData);
            return res.status(201).json({ success: true, data: incidentReport });
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined>{
        try {
            const caseId = req.params.id;
            const changes: Partial<IncidentReportData> = req.body;
            const updatedReport = await this.incident_report_service.update_case(caseId, changes);
            return res.status(200).json({ success: true, data: updatedReport });
        } catch (error) {
            next(error);
        }
    }

    public async search(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const {query} = req ;
            const incidentReports = await this.incident_report_service.search_case(query as Query);
            return res.status(200).json({ success: true, data: incidentReports });
        } catch (error) {
            next(error);
        }
    }
}






