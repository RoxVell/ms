import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Tickets } from './tickets.model';

@Module({
  providers: [TicketsService],
  controllers: [TicketsController],
  exports: [TicketsService],
  imports: [SequelizeModule.forFeature([Tickets])],
})
export class TicketsModule {}
