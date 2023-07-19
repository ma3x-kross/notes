import { AuthService } from './auth.service'
import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { UserDto, UserWithTokens } from './dto/user.dto'
import { RtJwtAuthGuard } from './guard/rt.guard'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	async create(
		@Body() dto: UserDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { refreshToken, accessToken, ...user } =
			await this.authService.register(dto)

		res.cookie('refresh', refreshToken, { httpOnly: true })

		return { ...user, accessToken }
	}

	@Post('login')
	async login(@Body() dto: UserDto, @Res({ passthrough: true }) res: Response) {
		const { refreshToken, accessToken, ...user } = await this.authService.login(
			dto,
		)

		res.cookie('refresh', refreshToken, { httpOnly: true })

		return { ...user, accessToken }
	}

	@UseGuards(RtJwtAuthGuard)
	@Get('refresh')
	async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken, ...user } = req.user as UserWithTokens
		res.cookie('refresh', refreshToken, { httpOnly: true })
		return { ...user, accessToken }
	}

	@UseGuards(RtJwtAuthGuard)
	@Get('logout')
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const { accessToken, refreshToken, ...user } = req.user as UserWithTokens
		await this.authService.logout(user.login, refreshToken)
		res.clearCookie('refresh')
		return null
	}
}
