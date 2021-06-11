import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface WindowTypesCreationAttrs {
  value: string;
}

@Table({ tableName: `window-types` })
export class WindowType extends Model<WindowType, WindowTypesCreationAttrs> {
  @Column({
    type: DataType.STRING,
    unique: true,
    primaryKey: true,
  })
  value: number;
}
