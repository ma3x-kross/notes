import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { NotesModule } from './notes/notes.module';

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: '.env' }),
		MongooseModule.forRoot(process.env.DB_URL),
		AuthModule,
		NotesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
