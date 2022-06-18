import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './users/strategy';
import { UzerModule } from './uzer/uzer.module';

@Module({
  imports: [UsersModule, ReportsModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }), UsersModule, ReportsModule, UzerModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
