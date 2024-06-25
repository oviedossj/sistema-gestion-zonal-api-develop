// import { Request, Response } from 'express';
// import { IncidentReportModel } from '@src/models/IncidentReportModel';
// import { IncidentReportFilesModel } from '@src/models/IncidentReportFilesModel';
// import { IncidentReportTypesModel } from '@src/models/IncidentReportTypesModel';
// import { UserModel } from '@src/models/UserModel';
// import { PaperworkItemModel } from '@src/models/PaperworkItemModel';
// import { UserTempModel } from '@src/models/UserTempModel';
// import { ADMController } from '@src/controllers/Admin/ADMController';

// const PAPERWORK_ID = 2;

// export class IncidentReportController extends ADMController {
//     constructor() {
//         super();
//     }

//     public async get(req: Request, res: Response): Promise<Response> {

//         const id = req.params.id;
//         const incidentModel = new IncidentReportModel();
//         const incidentFileModel = new IncidentReportFilesModel();
//         const incidentTypeModel = new IncidentReportTypesModel();
//         const userModel = new UserModel();

//         const incidentDetails = await incidentModel.getWithPaperworkItem(id, PAPERWORK_ID);

//         if (!incidentDetails) {
//             return res.status(404).json({ message: 'Reporte vecinal no encontrado', success: false });
//         }

//         const incidentType = await incidentTypeModel.find(incidentDetails.incident_type);
//         const incidentFiles = await incidentFileModel.getFiles(id);
//         let userData =  await userModel.findUserDetails(incidentDetails.pwi_user_id);
    

//         const responseData = {
//             paperwork: incidentDetails,
//             incident_type: incidentType,
//             representing: '',
//             user: userData,
//             files: incidentFiles,
//             success: true
//         };

//         return res.status(200).json(responseData);
//     }

//     public async add(req: Request, res: Response): Promise<Response> {
 
//         const user_id = req.headers['x-user-id'] as string;
//         const user = req.body.user;

//         let  finalUserId = user.id;
//         let representation = '';
//         const incidentReportModel = new IncidentReportModel();
//         const itemModel = new PaperworkItemModel();
//         const incidenReport = {
//             incident_type: req.body.incident_type,
//             incident_subtype: req.body.incident_subtype,
//             location_incident: req.body.location_incident,
//             latitude: req.body.latitude,
//             longitude: req.body.longitude,
//             description: req.body.description
//         };

//         await incidentReportModel.save(incidenReport);
//         const incidenReportId = incidentReportModel.getInsertID();

//         const dataPaperwork = {
//             user_id: finalUserId,
//             paperwork_id: PAPERWORK_ID,
//             item_id: incidenReportId,
//             status: 1,
//             paid_id: '',
//             payment_url: '',
//             status_paid: 2,
//             representation: representation
//         };
//         await itemModel.save(dataPaperwork);
//         const itemId = itemModel.getInsertID();

//         const incidentFiles = req.body.files;
//         const digitalFileModel = new IncidentReportFilesModel();

//         for (const fileData of incidentFiles) {
//             if (fileData.title && fileData.id) {
//                 const data = {
//                     title: fileData.title,
//                     file: fileData.id,
//                     incident_report_id: incidenReportId
//                 };
//                 await digitalFileModel.insert(data);
//             }
//         }

//         this.insertPaperworkStatus(PAPERWORK_ID, incidenReportId, 'Creación', 0, finalUserId, '0');

//         return res.status(200).json({
//             message: 'Insert new request commerce',
//             success: true,
//             insert_id: itemId,
//             insert_data: dataPaperwork,
//             user_id: finalUserId
//         });
//     }

//     public async update(req: Request, res: Response): Promise<Response> {
//         const isAdmin = this.validateUserDataFromRequest(req);
//         if (!isAdmin) {
//             return res.status(403).json(this.genericError());
//         }

//         const id = req.params.id;
//         const status = req.body.status;
//         const note = req.body.note;
//         const paperworkItemModel = new PaperworkItemModel();
//         const pwi = await paperworkItemModel.find(id);

//         if (pwi) {
//             const itemId = pwi.item_id;
//             const operatorId = req.headers['x-user-id'] as string;

//             if (status === 3 || status === 4 || status === 7) {
//                 await paperworkItemModel.update(id, { status: status });
//                 const statusDescription = status === 3 ? 'Resuelto' : status === 4 ? 'Cancelado' : 'En proceso';
//                 await this.insertPaperworkStatus(PAPERWORK_ID, itemId, statusDescription, operatorId, pwi.user_id, status, note);
//                 this.sendEmailPaperworkUpdated(pwi.user_id, id);
//             }

//             return res.status(200).json({
//                 success: true,
//                 message: 'Paperwork item status updated successfully'
//             });
//         } else {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Paperwork item not found'
//             });
//         }
//     }

//     public async saveTypes(req: Request, res: Response): Promise<Response> {
//         const isAdmin = this.validateUserDataFromRequest(req);
//         if (!isAdmin) {
//             return res.status(403).json(this.genericError());
//         }

//         const typesModel = new IncidentReportTypesModel();
//         const name = req.body.name;
//         const subtypes = req.body.subtypes;

//         const data = {
//             name: name,
//             subtypes: subtypes
//         };

//         const insertID = await typesModel.insert(data);

//         return res.status(200).json({
//             success: true,
//             id: insertID,
//             message: 'Se agregó la lista.'
//         });
//     }

//     public async deleteTypes(req: Request, res: Response): Promise<Response> {
//         const isAdmin = this.validateUserDataFromRequest(req);
//         if (!isAdmin) {
//             return res.status(403).json(this.genericError());
//         }

//         const idType = req.params.idType;
//         const typesModel = new IncidentReportTypesModel();

//         const deleted = await typesModel.delete(idType);

//         if (deleted) {
//             return res.status(200).json({
//                 message: 'List type removed successfully',
//                 success: true
//             });
//         } else {
//             return res.status(500).json({
//                 message: 'Could not remove the list type.',
//                 success: false
//             });
//         }
//     }

//     public async updateTypes(req: Request, res: Response): Promise<Response> {
//         const isAdmin = this.validateUserDataFromRequest(req);
//         if (!isAdmin) {
//             return res.status(403).json(this.genericError());
//         }

//         const idType = req.params.idType;
//         const typesModel = new IncidentReportTypesModel();
//         const name = req.body.name;
//         const subtypes = req.body.subtypes;

//         const dataToUpdate = {
//             name: name,
//             subtypes: subtypes
//         };

//         const updateResult = await typesModel.update(idType, dataToUpdate);

//         if (updateResult) {
//             return res.status(200).json({
//                 message: 'Type updated successfully',
//                 success: true
//             });
//         } else {
//             return res.status(404).json({
//                 message: 'Type not found with id: ' + idType,
//                 success: false
//             });
//         }
//     }
// }
