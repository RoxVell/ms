import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ServiceTree } from '../service-tree/service-tree.model';
import { TicketStatus } from './consts/ticket-status';

type TicketCreationAttrs = Pick<
  Tickets,
  'serviceTreeId' | 'prefix' | 'number' | 'status'
>;

export const TICKET_STATUSES = Object.values(TicketStatus);

@Table({ tableName: `tickets` })
export class Tickets extends Model<Tickets, TicketCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => ServiceTree)
  @Column({
    type: DataType.INTEGER,
  })
  serviceTreeId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  prefix: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  number: number;

  @Column({
    type: DataType.ENUM(...TICKET_STATUSES),
    allowNull: false,
  })
  status: string;
}
