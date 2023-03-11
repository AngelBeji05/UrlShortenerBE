import { Module } from '@nestjs/common'
import { SupabaseService } from 'src/supabase/supabase.service';
import { SupabaseStrategy } from 'src/supabase/supabase.strategy';
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SupabaseService, SupabaseStrategy]
})
export class AuthModule {}
