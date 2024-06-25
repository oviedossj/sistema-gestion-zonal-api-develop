import { loadRoles } from '@src/utils/roleLoader';

let RolesEnum: { [key: string]: number } = {
  ADMIN: 1,
  SUPERVISOR: 2,
  AREA: 3,
  CGM: 4,
};

export const initRolesEnum = async () => {
  RolesEnum = await loadRoles();
};

export const getRolesEnum = () => RolesEnum;
