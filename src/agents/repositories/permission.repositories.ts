import { Permission_User } from '@src/config/db/models/permission_user.models';
import { IPermission_Repositories } from '@src/interface/permission.repositories.interface';
import logger from '@src/utils/logger';

export class Permission_Repositories implements IPermission_Repositories<Permission_User> {
  async addPermissionToUser(
    userId: number,
    type: string,
    accessId: number,
    permissionLevel: number
  ): Promise<Permission_User> {
    try {
      const permissionUserAttributes = {
        userId,
        type,
        accessId,
        permissionLevel,
      };

      const permissionUser = await Permission_User.create(permissionUserAttributes);
      return permissionUser;
    } catch (error) {
      logger.error('Error on addPermissionToUser Repository: ', error);
      throw error;
    }
  }

  async getUserPermissions(userId: number): Promise<Permission_User[]> {
    try {
      const userPermissions = await Permission_User.findAll({ where: { userId } });
      return userPermissions;
    } catch (error) {
      logger.error('Error on getUserPermissions Repository: ', error);
      throw error;
    }
  }
}
