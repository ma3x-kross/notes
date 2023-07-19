import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '../user.schema'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'at-jwt') {
	constructor(
		private configSerfice: ConfigService,
		@InjectModel(User.name) private userModel: Model<User>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_ACCESS_SECRET,
		})
	}

	async validate({ login }: Pick<User, 'login'>) {
		const user = await this.userModel.find({ login })
		return user
	}
}
