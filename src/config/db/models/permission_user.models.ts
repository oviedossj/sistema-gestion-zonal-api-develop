// eslint-disable-next-line import/no-extraneous-dependencies
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Permission_UserAttributes, Permission_UserCreationAttributes } from '@src/interface';
// eslint-disable-next-line import/no-cycle
import { User } from './users.models';

@Table({
  tableName: 'permission_user',
  timestamps: false,
})
export class Permission_User extends Model<Permission_UserAttributes, Permission_UserCreationAttributes> {
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare type: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare accessId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare userId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  declare permissionLevel: number;
}
