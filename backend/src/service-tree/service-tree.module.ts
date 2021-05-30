import { Module } from '@nestjs/common';
import { ServiceTreeService } from './service-tree.service';
import { ServiceTreeController } from './service-tree.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { ServiceTree } from "./service-tree.model";
import { ServicesModule } from "../services/services.module";

@Module({
  providers: [ServiceTreeService],
  controllers: [ServiceTreeController],
  imports: [
    SequelizeModule.forFeature([ServiceTree]),
    ServicesModule,
  ],
})
export class ServiceTreeModule {}
