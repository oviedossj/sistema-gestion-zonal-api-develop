// eslint-disable-next-line import/no-extraneous-dependencies
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'incident_report_list',
  timestamps: true,
  paranoid: true,
})
export class Incident_Report_Types extends Model<Incident_Report_Types> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(85),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare subtypes: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare updatedAt?: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare deletedAt?: Date;
}
