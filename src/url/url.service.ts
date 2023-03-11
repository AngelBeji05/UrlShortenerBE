import { Injectable } from '@nestjs/common'
import * as Base64 from 'base-64'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UrlService {
    constructor(private readonly prisma: PrismaService) {}

    async getRedirectURL(urlCode: string) {
        const urlId = parseInt(Base64.decode(urlCode))
        const { url } =  await this.prisma.urls.findFirst({
            where: {
                id: urlId
            }
        })
        return url
    }

    async generateURL(redirectURL: string, userId: string) {
        const { id } =  await this.prisma.urls.create({
            data: {
                url: redirectURL,
                user_id: userId
            }
        })
        return Base64.encode(id)
    }
}
