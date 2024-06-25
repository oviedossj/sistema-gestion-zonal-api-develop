import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AddressData, IIncident_Report_Service, ISearch_Report_Summary } from '@src/interface/index';
import { Iverify_Agente, Query } from '@src/models';

export class Incident_Report_Controller {
  constructor(private readonly incident_report_service: IIncident_Report_Service<ISearch_Report_Summary>) {}
  private async verify_token(token: string): Promise<Iverify_Agente> {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user: Iverify_Agente = {
      role: decoded.role,
      zone: decoded.zone_geografica,
    };
    return user;
  }
  public async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { TypeGestion } = req.query ;
      const {incidentData} = req.body;
      switch (TypeGestion) {
        case 'Consulta':
          const createdIncidentConsult:string = await this.incident_report_service.create_consult(incidentData);
          return res.status(201).json({
            message: 'Incident report created successfully',
            success: true,
            // retornar el id del consulta
            data: createdIncidentConsult ,
          });
        case 'Gestion':
          const createdIncidentReport = await this.incident_report_service.create_case(incidentData);
          return res.status(201).json({
            message: 'Incident report created successfully',
            success: true,
            // retornar el id del cas
            data: createdIncidentReport,
          });
          
      }
    } catch (error) {
      next(error);
    }
  }
  // public async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
  //   try {
  //     const caseId = req.params.id;
  //     const changes: Partial<IncidentReportData> = req.body;
  //     const updatedReport = await this.incident_report_service.update_case(caseId, changes);
  //     return res.status(200).json({ success: true, data: updatedReport });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  public async search(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const query = req.query as unknown as Query;
      const token = req.cookies['auth-token'];
      if (!token) throw new Error('general.UNAUTHORIZED.missing_access_key');
      const user = await this.verify_token(token);
      const [incidentReports, consultReports] = await Promise.all([
         this.incident_report_service.search_case(query, user),
         this.incident_report_service.search_consulta(query, user)
      ]);
      return res.status(200).json({ success: true, data:[...incidentReports, ...consultReports]});
    } catch (error) {
      next(error);
    }
  }
  public async verify_direction(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const { calle, altura } = req.query;
      const token = req.cookies['auth-token'];
      if (!token) throw new Error('general.UNAUTHORIZED.missing_access_key');
      const address = `${calle}${altura}`;
      const user = await this.verify_token(token);
      const updatedReport: AddressData = await this.incident_report_service.verify_direction(address, user);
      return res.status(200).json({ success: true, data: updatedReport });
    } catch (error) {
      next(error);
    }
  }
  public async exportarCsv(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const query = req.query as unknown as Query;
      const token = req.cookies['auth-token'];
      if (!token) throw new Error('general.UNAUTHORIZED.missing_access_key');
      const user = await this.verify_token(token);
      await this.incident_report_service.exportar_Csv(query,user);
      return res.status(200).json({ success: true, data: 'CSV exportado correctamente' });
    } catch (error) {
      next(error);
    }
  }
}