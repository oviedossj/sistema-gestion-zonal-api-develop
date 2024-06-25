import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Incident_Report } from './incident_report.models';

@Table({
  tableName: 'zone',
  timestamps: false,
})
export class Zone extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare zoneGeografica: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare nombreReal: string;

  @HasMany(() => Incident_Report)
  declare incidentReports: Incident_Report[];
}
