import { incident_report_controller } from '@src/agents/controllers';
import { verifyRole } from '@src/middleware/permission.middleware';
import { Router } from 'express';

const router = Router();

router.get('/search', incident_report_controller.search);
router.post('/new-case', verifyRole(['SUPERVISOR', 'AREA']), incident_report_controller.create);
// router.patch('update-case', verifyRole(['SUPERVISOR', 'AREA']), incident_report_controller.update);
router.get('/export-csv', incident_report_controller.exportarCsv);
router.get('/verify-direction', verifyRole(['CGM', 'AREA', 'SUPERVISOR']), incident_report_controller.verify_direction);

export default router;
