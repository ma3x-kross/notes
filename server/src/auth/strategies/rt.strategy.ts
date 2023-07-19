import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy } from 'passport-jwt'
import { InjectModel } from '@nestjs/mongoose'
import { User } from '../user.schema'
import { ConfigService } from '@nestjs/config'
import { Model } from 'mongoose'
import { Request } from 'express'
import { compare } from 'bcryptjs'
import { AuthService } from '../auth.service'
import { removeExtraFromReturnedFields } from 'src/utils/helpers'

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'rt-jwt') {
	constructor(
		private configService: ConfigService,
		@InjectModel(User.name) private userModel: Model<User>,
		private authService: AuthService,
	) {
		super({
			jwtFromRequest: (req: Request) => req.cookies.refresh,
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_REFRESH_SECRET'),
			passReqToCallback: true,
		})
	}

	async validate(req: Request, { login }: Pick<User, 'login'>) {
		const oldRefreshToken = req.cookies.refresh
		const user = await this.userModel.findOne({
			login,
			refreshToken: oldRefreshToken,
		})
		if (!user) throw new UnauthorizedException('User not found!')
		const { accessToken, refreshToken } = await this.authService.generateTokens(
			user.login,
		)

		return { ...removeExtraFromReturnedFields(user), accessToken }
	}
}
