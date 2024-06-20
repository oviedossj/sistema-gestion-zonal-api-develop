// eslint-disable-next-line import/no-extraneous-dependencies
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'zonas',
  timestamps: false,
})
export class Zona extends Model<Zona> {
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
