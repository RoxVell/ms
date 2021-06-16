import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WindowsModule } from './windows/windows.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { User } from './users/users.model';
import { OperatorsModule } from './operators/operators.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { Service } from "./services/service.model";
import { AuthModule } from './auth/auth.module';
import { ServiceTreeModule } from './service-tree/service-tree.module';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'equeue',
      models: [],
      autoLoadModels: true,
    }),
    WindowsModule,
    UsersModule,
    ServicesModule,
    OperatorsModule,
    RolesModule,
    AuthModule,
    ServiceTreeModule,
    TicketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
