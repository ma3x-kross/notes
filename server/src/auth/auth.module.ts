import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './user.schema'
import { JwtModule } from '@nestjs/jwt'
import { getJWTConfig } from 'src/config/jwt.config'
import { AtStrategy } from './strategies/at.strategy'
import { RtStrategy } from './strategies/rt.strategy'

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: '.env' }),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
	],
	providers: [AuthService, AtStrategy, RtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
