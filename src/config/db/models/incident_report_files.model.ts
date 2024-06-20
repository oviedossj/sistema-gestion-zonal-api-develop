// eslint-disable-next-line import/no-extraneous-dependencies
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { Incident_Report } from './incident_report.models';

@Table({
  tableName: 'incident_report_files',
  timestamps: false,
})
export class Incident_Report_Files extends Model<Incident_Report_Files> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare file: number;

  @ForeignKey(() => Incident_Report)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  declare incidentReportId: number;
}
