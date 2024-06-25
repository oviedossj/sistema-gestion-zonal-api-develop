import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Incident_Report } from './incident_report.models';

@Table({
  tableName: 'paperwork_item',
  timestamps: true,
})
export class Paperwork_Item extends Model<Paperwork_Item> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare userId: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  declare paperworkId: number;

  @ForeignKey(() => Incident_Report)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  declare itemId: number;

  @BelongsTo(() => Incident_Report)
  declare incidentReport: Incident_Report;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  declare statusPaid: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare createdAt: Date;

  @Column({
    type: DataType.STRING(135),
    allowNull: true,
  })
  declare paidId?: string;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare updatedAt?: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  declare paymentUrl?: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  declare representation: string;
}
