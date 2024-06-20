/* eslint-disable import/no-extraneous-dependencies */
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users_temp',
  timestamps: true,
})
export class User_Temp extends Model<User_Temp> {
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  cuit!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  dni!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  surname!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthday!: Date;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  phone!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  phoneCompany!: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
  })
  isLocality!: boolean;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  addressNumber!: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
  })
  addressUnknown!: boolean;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  addressAdditional!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  localityId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  levelId!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  profilePicture!: string;

  @Column({
    type: DataType.STRING(100),
  })
  typeCitizen?: string;
}
