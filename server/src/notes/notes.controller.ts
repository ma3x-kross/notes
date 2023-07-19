import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common'
import { NotesService } from './notes.service'
import { CreateNoteDto } from './dto/create.note.dto'
import { AtJwtAuthGuard } from 'src/auth/guard/at.guard'
import { UpdateNoteDto } from './dto/update.note.dto'

@UseGuards(AtJwtAuthGuard)
@Controller('notes')
export class NotesController {
	constructor(private notesService: NotesService) {}

	@Post()
	async create(@Body() dto: CreateNoteDto) {
		return await this.notesService.createNote(dto)
	}

	@Get()
	async getAll(
		@Query('offset') offset: string,
		@Query('limit') limit?: string,
	) {
		return await this.notesService.getAll(offset, limit)
	}

	@Get(':id')
	async getById(@Param('id') id: string) {
		return await this.notesService.getById(id)
	}

	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
		return await this.notesService.updateNote(id, dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		await this.notesService.delete(id)
	}
}
