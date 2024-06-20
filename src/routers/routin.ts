import { verifyRole } from '@src/middleware/permission.middleware';
import { Router, Response, Request, NextFunction } from 'express';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const users = 'Hello , you are into at future';
  res.send(users);
});
// router.post('/',(req: Request, res: Response) => {
//     const { userId, permissions } = req.body;

//     if (!userId || !Array.isArray(permissions)) {
//         return res.status(400).json({ error: 'Invalid request' });
//     }

//     try {
//         // await PermissionUser.destroy({ where: { userId } });

//         // for (const permission of permissions) {
//         //     // await PermissionUser.create({
//         //     //     userId,
//         //     //     type: permission.type,
//         //     //     accessId: permission.accessId,
//         //     //     permissionLevel: permission.permissionLevel,
//         //     // });
//         // }

//         return res.status(200).json({ success: true });
//     } catch (error) {
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// })
router.get('/example', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Simulación de un error
    throw new Error('general.UNAUTHORIZED.invalid_access_key');
  } catch (err) {
    next(err);
  }
});

router.post('/assign-role', verifyRole(['SUPERVISOR', 'AREA']) , async (req: Request, res: Response) => {
    const users = 'Hello , you are into at future';
    res.send(users);
  });

export default router;
