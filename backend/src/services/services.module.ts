import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './service.model';

@Module({
  providers: [ServicesService],
  controllers: [ServicesController],
  exports: [ServicesService],
  imports: [SequelizeModule.forFeature([Service])],
})
export class ServicesModule {}
