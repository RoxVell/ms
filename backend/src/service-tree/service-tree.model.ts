import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Service } from '../services/service.model';

interface ServiceTreeCreationAttrs {
  path: string;
  service_id: number;
}

@Table({ tableName: `service_tree` })
export class ServiceTree extends Model<ServiceTree, ServiceTreeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  path: string;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  service_id: number;
}
