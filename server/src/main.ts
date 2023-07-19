import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'

const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.useGlobalPipes(new ValidationPipe())
	app.use(cookieParser())
	app.enableCors({ credentials: true, origin: CLIENT_URL })
	await app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
}
bootstrap()
