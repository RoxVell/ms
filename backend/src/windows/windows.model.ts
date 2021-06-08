import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { WINDOW_TYPE, WINDOW_TYPES } from './dto/window-type';

interface WindowCreationAttrs {
  name: string;
  type: WINDOW_TYPE;
  serviceIds: number[];
  operatorIds: number[];
}

@Table({ tableName: `windows` })
export class Window extends Model<Window, WindowCreationAttrs> {
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
    type: DataType.ENUM(...WINDOW_TYPES),
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.ARRAY({ type: DataType.NUMBER }),
    allowNull: false,
  })
  serviceIds: number[];

  @Column({
    type: DataType.ARRAY({ type: DataType.NUMBER }),
    allowNull: false,
  })
  operatorIds: number[];
}
