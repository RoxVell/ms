import { Column, DataType, Model, Table } from 'sequelize-typescript';

type ServiceCreationAttrs = Pick<Service, 'name' | 'description' | 'isGroup'>;

@Table({ tableName: `services` })
export class Service extends Model<Service, ServiceCreationAttrs> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isGroup: boolean;
}
