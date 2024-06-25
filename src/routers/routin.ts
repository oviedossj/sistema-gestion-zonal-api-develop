import { verifyRole } from '@src/middleware/permission.middleware';
// import { createObjectCsvWriter } from 'csv-writer';
import { Router, Response, Request, NextFunction } from 'express';
import { format } from 'fast-csv';
import fs from 'fs';
import path from 'path';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const users = 'Hello , you are into at future';
  console.log(users)
  console.log(req.cookies)
  res.send(users);
});


// router.get('/example', async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // Simulación de un error
//     throw new Error('general.UNAUTHORIZED.invalid_access_key');
//   } catch (err) {
//     next(err);
//   }
// });

// // server.js
// router.get('/export-csv', async (req, res) => {
//   const {data} = req.body;
//   const csvPath = path.join(__dirname, 'report.csv');

//   // Crear un stream de escritura con codificación UTF-8
//   const writableStream = fs.createWriteStream(csvPath, { encoding: 'utf8' });

//   writableStream.on('finish', () => {
//     res.setHeader('Content-Type', 'text/csv');
//     res.setHeader('Content-Disposition', 'attachment; filename="report.csv"');
//     res.download(csvPath, 'report.csv', (err) => {
//       if (err) {
//         res.status(500).send('Error al descargar el archivo');
//       }
//       fs.unlinkSync(csvPath); // Eliminar el archivo después de la descarga
//     });
//   });

//   const csvStream = format({ headers: true, delimiter: ',', writeBOM: true }); // Escribir BOM para UTF-8

//   csvStream.pipe(writableStream);

//   data.forEach(record => {
//     csvStream.write({
//       'Número de caso': record.caseNumber,
//       'Fecha de ingreso': record.entryDate,
//       'Nombre del reportante': record.reporterName,
//       'DNI': record.dni,
//       'Área': record.area,
//       'Tipo': record.type,
//       'Estado del caso': record.status,
//       'Nivel de urgencia': record.urgencyLevel,
//       'Canal de ingreso': record.entryChannel,
//       'Zona geográfica': record.geoZone,
//       'Ubicación del reporte: Calle': record.street,
//       'Ubicación del reporte: Altura': record.streetNumber,
//       'Ubicación del reporte: Localidad': record.locality,
//       'Ubicación del reporte: Barrio': record.neighborhood,
//       'Fecha de última modificación del trámite': record.lastModification,
//       'Plazo de resolución': record.resolutionDeadline,
//       'Operador que realizó la carga': record.operator
//     });
//   });

//   csvStream.end();
// });

// Ruta para darle permisos a un usuario
// router.post('/Permosos', async (req: Request, res: Response, next: NextFunction) => {
//     const { userId, permissions } = req.body;

//     if (!userId || !Array.isArray(permissions)) {
//         return res.status(400).json({ error: 'Invalid request' });
//     }

//     try {
        // await PermissionUser.destroy({ where: { userId } });

        // for (const permission of permissions) {
        //     await PermissionUser.create({
        //         userId,
        //         type: permission.type,
        //         accessId: permission.accessId,
        //         permissionLevel: permission.permissionLevel,
        //     });
        // }

//         return res.status(200).json({ success: true });
//     } catch (error) {
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// })


export default router;
