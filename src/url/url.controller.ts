import { Controller, Post, Get, Request, UseGuards, HttpException, HttpStatus, Param, Redirect } from '@nestjs/common'
import { UrlService } from './url.service'
import { SupabaseGuard } from 'src/supabase/supabase.guard'

@Controller('')
export class UrlController {

    constructor(private readonly urlService: UrlService) {}

    @Get(':urlId')
    @Redirect()
    async redirect(@Param('urlId') urlId) {
        try {
            const url = await this.urlService.getRedirectURL(urlId)
            if(!url)
                throw new HttpException('Invalid link.', HttpStatus.BAD_REQUEST)
            return {
                url: url,
                statusCode: 301
            }
        } catch(error) {
            throw new HttpException('Invalid link.', HttpStatus.BAD_REQUEST)
        }
    }

    @UseGuards(SupabaseGuard)
    @Post('generate')
    async generate(@Request() req) {
        const url = req.body.url
        const userId = req.user.sub
        if(!url)
            throw new HttpException('Please send an URL.', HttpStatus.BAD_REQUEST)
        return await this.urlService.generateURL(url, userId)
    }
}
