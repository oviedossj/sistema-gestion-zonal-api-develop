// src/models/Area.ts
// eslint-disable-next-line import/no-extraneous-dependencies
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'areas',
  timestamps: false,
})
export class Area extends Model<Area> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;
}
