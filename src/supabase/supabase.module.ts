import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { SupabaseStrategy } from './supabase.strategy';
import { SupabaseGuard } from './supabase.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [SupabaseStrategy, SupabaseGuard, SupabaseService],
  exports: [SupabaseService, SupabaseStrategy, SupabaseGuard],
})
export class SupabaseModule {}
