import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo, HasMany, BeforeCreate } from 'sequelize-typescript';
import { Zone } from './zonas.models'; // Asegúrate de importar el modelo Zone
import { Incident_Report_Types } from './incident_report_types.model';
import { Incident_Report_Files } from './incident_report_files.model';

@Table({
  tableName: 'incident_report',
  timestamps: true,
  paranoid: true,
})
export class Incident_Report extends Model<Incident_Report> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare incidentId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare incidentType: number;

  @ForeignKey(() => Incident_Report_Types)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
  })
  declare incidentReportTypeId?: number;

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
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare status: string;

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

  @ForeignKey(() => Zone)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  declare zoneId: number;

  @BelongsTo(() => Zone)
  declare zone: Zone;

  @HasMany(() => Incident_Report_Files)
  declare files: Incident_Report_Files[];

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

  @DeletedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare deletedAt?: Date;

  @BeforeCreate
  static async generateConsultId(instance: Incident_Report) {
    const maxId = await Incident_Report.max('id') as number | null;
    const nextId = maxId !== null ? maxId + 1 : 1;
    instance.incidentId = `G${String(nextId).padStart(5, '0')}`;
  }
}
