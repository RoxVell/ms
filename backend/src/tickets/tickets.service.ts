import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Tickets } from './tickets.model';
import { Op } from 'sequelize';
import { TicketStatus } from './consts/ticket-status';

interface TicketNumber {
  prefix: string;
  number: number;
}

const MAX_TICKET_NUMBER = 99;

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Tickets) private ticketsRepository: typeof Tickets,
  ) {}

  async create(dto: CreateTicketDto) {
    const { prefix, number } = await this.getNextTicketNumber();

    return this.ticketsRepository.create({
      number,
      prefix,
      serviceTreeId: dto.serviceTreeId,
      status: TicketStatus.Waiting,
    });
  }

  private async getNextTicketNumber(): Promise<TicketNumber> {
    const TODAY_START = new Date().setHours(0, 0, 0, 0);
    const NOW = new Date();

    const lastTicket = await this.ticketsRepository.findOne({
      where: {
        createdAt: {
          [Op.gt]: TODAY_START,
          [Op.lt]: NOW,
        },
      },
      order: [['createdAt', 'DESC']],
    });

    if (!lastTicket) {
      return {
        prefix: 'А',
        number: 1,
      };
    }

    const newNumber = lastTicket.number + 1;
    const currentPrefix = lastTicket.prefix;

    return {
      number: newNumber === MAX_TICKET_NUMBER ? 1 : newNumber,
      prefix:
        newNumber === MAX_TICKET_NUMBER
          ? this.getNextPrefix(currentPrefix)
          : currentPrefix,
    };
  }

  private getNextPrefix(symbol: string) {
    const charCode = symbol.charCodeAt(0);
    return String.fromCharCode(charCode + 1);
  }
}
