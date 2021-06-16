import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post('/')
  async create(@Body() dto: CreateTicketDto) {
    try {
      return await this.ticketsService.create(dto);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
