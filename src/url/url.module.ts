import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

@Module({
  controllers: [UrlController],
  providers: [UrlService, PrismaService]
})
export class UrlModule {}
