import { hashValue, removeExtraFromReturnedFields } from './../utils/helpers'
import { ConfigService } from '@nestjs/config'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.schema'
import { Model } from 'mongoose'
import { UserDto, UserWithTokens } from './dto/user.dto'
import { compare, genSalt, hash } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private userModel: Model<User>,
		private jwtService: JwtService,
		private configService: ConfigService,
	) {}

	async generateTokens(login: string) {
		const payload = { login }
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: '24h',
			secret: this.configService.get('JWT_ACCESS_SECRET'),
		})

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: '30d',
			secret: this.configService.get('JWT_REFRESH_SECRET'),
		})

		return { accessToken, refreshToken }
	}

	async register(dto: UserDto): Promise<UserWithTokens> {
		const user = await this.userModel.create({
			...dto,
			password: await hashValue(dto.password),
		})

		const { accessToken, refreshToken } = await this.generateTokens(user.login)

		user.refreshToken = refreshToken

		await user.save()

		return { ...removeExtraFromReturnedFields(user), accessToken }
	}

	async login(dto: UserDto): Promise<UserWithTokens> {
		const user = await this.userModel.findOne({ login: dto.login })
		if (!user) throw new UnauthorizedException('User not found')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Invalid password')

		const { accessToken, refreshToken } = await this.generateTokens(user.login)

		user.refreshToken = refreshToken
		await user.save()

		return { ...removeExtraFromReturnedFields(user), accessToken }
	}

	async logout(login: string, refreshToken: string) {
		const user = await this.userModel.findOne({ login, refreshToken })

		if (!user) throw new UnauthorizedException('User not found!')

		user.refreshToken = null
		await user.save()
	}

	async getAllUsers(): Promise<User[]> {
		const users = await this.userModel.find()
		return users
	}
}
