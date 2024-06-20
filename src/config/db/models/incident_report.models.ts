import { IncidentReportAttributes, IncidentReportCreationAttributes } from '@src/interface';
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'incident_report',
  timestamps: true,
  paranoid: true,
})
export class Incident_Report extends Model<IncidentReportAttributes, IncidentReportCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare incidentType: number;

  @Column({
    type: DataType.STRING(85),
    allowNull: false,
  })
  declare incidentSubtype: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare locationIncident: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  declare latitude: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  declare longitude: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare nivelRiesgo: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare localidad: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare barrio: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare calle: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  declare altura: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare informacionAdicional?: string;

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
