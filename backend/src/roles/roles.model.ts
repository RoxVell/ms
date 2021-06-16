import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RoleCreationAttrs {
  value: string;
}

@Table({ tableName: `roles` })
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  value: string;
}
