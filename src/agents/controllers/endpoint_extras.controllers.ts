import { NextFunction, Request, Response } from 'express';
import { Iverify_Agente, Query } from '@src/models';
import jwt from 'jsonwebtoken';
import { IIncident_Report_Service, ISearch_Report_Summary } from '@src/interface';

class Endpoint_Extras_Controller {
    constructor(private readonly incident_report_service: IIncident_Report_Service<ISearch_Report_Summary>) {}
    private async verify_token(token: string): Promise<Iverify_Agente> {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const user: Iverify_Agente = {
      role: decoded.role,
      zone: decoded.zone_geografica,
    };
    return user;
  }
  public async ExportarCsv(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const query = req.query as unknown as Query;
      const token = req.cookies['auth-token'];
      if (!token) throw new Error('general.UNAUTHORIZED.missing_access_key');
      const user = await this.verify_token(token);
      
      const [incidentReports, consultReports] = await Promise.all([
         this.incident_report_service.search_case(query, user),
         this.incident_report_service.search_consulta(query, user)
      ]);
    //   const csv = await this.incident_report_service.export_csv(incidentReports, consultReports);
      return res.status(200).json({ success: true, data:[...incidentReports, ...consultReports]});
    } catch (error) {
      next(error);
    }
  }
}

export default Endpoint_Extras_Controller;
