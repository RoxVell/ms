import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../roles/roles.model';
import { WINDOW_TYPE, WINDOW_TYPES } from './dto/window-type';

interface WindowCreationAttrs {
  name: string;
  type: WINDOW_TYPE;
  roleId: number;
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
}
