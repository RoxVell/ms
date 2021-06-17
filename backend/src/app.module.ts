import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WindowsModule } from './windows/windows.module';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { OperatorsModule } from './operators/operators.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ServiceTreeModule } from './service-tree/service-tree.module';
import { TicketsModule } from './tickets/tickets.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.POSTGRES_USERNAME || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'root',
      database: process.env.POSTGRES_DATABASE || 'equeue',
      models: [],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
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
