import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthService {
    constructor(private supabaseService: SupabaseService) {}

    async signIn(user: User) {
        const response = await this.supabaseService.signIn(user)
        try {
            return response.data.session.access_token
        } catch(error) {
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND)
        }
    }

    async signUp(user: User) {
        try {
            return this.supabaseService.signUp(user)
        } catch(error) {
            throw new HttpException('Invalid credentials.', HttpStatus.BAD_REQUEST)
        }
    }
}

class User {
    email: string
    password: string
    firstName: string
    lastName: string 
}