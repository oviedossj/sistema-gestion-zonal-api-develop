export interface IPermission_Repositories<T> {
  addPermissionToUser(userId: number, type: string, accessId: number, permissionLevel: number): Promise<T>;
  getUserPermissions(userId: number): Promise<T[]>;
}

export enum Roles {
  OPERADOR = 1,
  CGM = 2,
  AREA = 3,
  SUPERVISOR = 4,
}

export interface Permission_UserAttributes {
  id?: number;
  userId: number;
  type: string;
  accessId: number;
  permissionLevel: number;
}

// Excluir 'id' de los atributos de creación
export type Permission_UserCreationAttributes = Omit<Permission_UserAttributes, 'id'>;
