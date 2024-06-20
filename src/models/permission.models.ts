export interface IPermissionUser  {
    id: number;
    type: string;
    accessId: number;
    userId: number;
    permissionLevel: number;
  }
export type permission_type =   {  
                userId: number, 
                type: string, 
                accessId: number, 
                permissionLevel: number}