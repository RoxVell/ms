import { Module } from '@nestjs/common';
import { WindowsService } from './windows.service';
import { WindowsController } from './windows.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Window } from "./windows.model";

@Module({
  providers: [WindowsService],
  controllers: [WindowsController],
  imports: [SequelizeModule.forFeature([Window])],
})
export class WindowsModule {}
