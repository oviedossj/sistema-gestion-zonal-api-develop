import { Role } from '@src/config/db/models/roles.models';

export const loadRoles = async () => {
  const roles = await Role.findAll();
  const rolesEnum: { [key: string]: number } = {};

  roles.forEach(role => {
    rolesEnum[role.name.toUpperCase()] = role.id;
  });

  return rolesEnum;
};
