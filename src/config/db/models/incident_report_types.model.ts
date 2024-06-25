import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import { Incident_Report } from './incident_report.models'; // Importa Incident_Report para definir la relación inversa

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

  @HasMany(() => Incident_Report)
  declare incidentReports: Incident_Report[]; // Define la relación inversa

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
