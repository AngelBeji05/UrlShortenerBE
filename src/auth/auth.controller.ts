import { Body, Post } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signIn')
    async signIn(@Body() user) {
        return this.authService.signIn(user)
    }

    @Post('signUp')
    async signUp(@Body() user) {
        return this.authService.signUp(user)
    }
}
