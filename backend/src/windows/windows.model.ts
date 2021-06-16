import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { WINDOW_TYPE } from './dto/window-type';
import { WindowType } from './windows-types.model';

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

  @ForeignKey(() => WindowType)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.ARRAY({ type: DataType.INTEGER }),
    allowNull: false,
  })
  serviceIds: number[];

  @Column({
    type: DataType.ARRAY({ type: DataType.INTEGER }),
    allowNull: false,
  })
  operatorIds: number[];
}
