import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateNoteDto {
	@IsString()
	title: string

	@IsString()
	description: string

	@IsNumber()
	timestamp: number
}
