import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UzerController } from './uzer.controller';

@Module({
  controllers: [UzerController],
  imports: [PrismaModule]
})
export class UzerModule {}
