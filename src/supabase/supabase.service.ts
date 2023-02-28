import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SupabaseClient, AuthResponse } from '@supabase/supabase-js'

@Injectable()
export class SupabaseService extends SupabaseClient {
    constructor(private configService: ConfigService) {
        const supabaseUrl = configService.get('SUPABASE_URL')
        const supabaseKey = configService.get('SUPABASE_ANON_KEY')
        super(supabaseUrl, supabaseKey)
    }

    async signUp(user: User) : Promise<AuthResponse> {
        return await this.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                data: {
                    first_name: user.firstName,
                    last_name: user.lastName
                }
            }
        })
    }

    async signIn(user: User) : Promise<AuthResponse> {
        const response = await this.auth.signInWithPassword({
            email: user.email,
            password: user.password
        })
        console.log(response)
        this.auth.signOut()
        return response
    }
}

class User {
    email: string
    password: string
    firstName: string
    lastName: string 
}