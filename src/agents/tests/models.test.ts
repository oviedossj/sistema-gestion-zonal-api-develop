// import { Consult_Report } from '@src/config/db/models/consult_report.model';
// import { Incident_Report } from '@src/config/db/models/incident_report.model';

// describe('Consult_Report Model', () => {
//   test('should generate consultId with prefix "C" when no records exist', async () => {
//     const consult = await Consult_Report.create({
//       incidentType: 1,
//       incidentSubtype: 'Subtype 1',
//       description: 'Test',
//       nivelRiesgo: 'High',
//       status: 'Open',
//       localidad: 'Localidad 1',
//       barrio: 'Barrio 1',
//       numero_padron_municipal: '123'
//     });

//     expect(consult.consultId).toBe('C00001');
//   });

//   test('should generate consultId with prefix "C" when records exist', async () => {
//     await Consult_Report.create({
//       id: 1,
//       incidentType: 1,
//       incidentSubtype: 'Subtype 1',
//       description: 'Test',
//       nivelRiesgo: 'High',
//       status: 'Open',
//       localidad: 'Localidad 1',
//       barrio: 'Barrio 1',
//       numero_padron_municipal: '123'
//     });

//     const consult = await Consult_Report.create({
//       incidentType: 1,
//       incidentSubtype: 'Subtype 2',
//       description: 'Test 2',
//       nivelRiesgo: 'Medium',
//       status: 'Closed',
//       localidad: 'Localidad 2',
//       barrio: 'Barrio 2',
//       numero_padron_municipal: '456'
//     });

//     expect(consult.consultId).toBe('C00002');
//   });
// });

// describe('Incident_Report Model', () => {
//   test('should generate incidentId with prefix "G" when no records exist', async () => {
//     const incident = await Incident_Report.create({
//       incidentType: 1,
//       incidentSubtype: 'Subtype 1',
//       locationIncident: 'Test Location',
//       latitude: '40.7128',
//       longitude: '-74.0060',
//       description: 'Test',
//       nivelRiesgo: 'High',
//       localidad: 'Localidad 1',
//       barrio: 'Barrio 1',
//       calle: 'Calle 1',
//       altura: '100',
//       status: 'Open',
//       zoneId: 1
//     });

//     expect(incident.incidentId).toBe('G00001');
//   });

//   test('should generate incidentId with prefix "G" when records exist', async () => {
//     await Incident_Report.create({
//       id: 1,
//       incidentType: 1,
//       incidentSubtype: 'Subtype 1',
//       locationIncident: 'Test Location',
//       latitude: '40.7128',
//       longitude: '-74.0060',
//       description: 'Test',
//       nivelRiesgo: 'High',
//       localidad: 'Localidad 1',
//       barrio: 'Barrio 1',
//       calle: 'Calle 1',
//       altura: '100',
//       status: 'Open',
//       zoneId: 1
//     });

//     const incident = await Incident_Report.create({
//       incidentType: 1,
//       incidentSubtype: 'Subtype 2',
//       locationIncident: 'Test Location 2',
//       latitude: '40.7129',
//       longitude: '-74.0061',
//       description: 'Test 2',
//       nivelRiesgo: 'Medium',
//       localidad: 'Localidad 2',
//       barrio: 'Barrio 2',
//       calle: 'Calle 2',
//       altura: '200',
//       status: 'Closed',
//       zoneId: 2
//     });

//     expect(incident.incidentId).toBe('G00002');
//   });
// });
