import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt, ForeignKey, BelongsTo, BeforeCreate } from 'sequelize-typescript';
import { Zone } from './zonas.models';

@Table({
  tableName: 'consult_report',
  timestamps: true,
  paranoid: true,
})
export class Consult_Report extends Model<Consult_Report> {
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
  declare consultId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare incidentType: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare incidentSubtype: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare nivelRiesgo: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare localidad: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare barrio: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare numero_padron_municipal: string;

  @ForeignKey(() => Zone)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
  })
  declare zoneId?: number;

  @BelongsTo(() => Zone)
  declare zone?: Zone;

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
  static async generateConsultId(instance: Consult_Report) {
    const maxId = await Consult_Report.max('id') as number | null;
    const nextId = maxId !== null ? maxId + 1 : 1;
    instance.consultId = `C${String(nextId).padStart(5, '0')}`;
  }
}
