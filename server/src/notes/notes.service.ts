import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Note, NoteDocument } from './note.schema'
import { Model } from 'mongoose'
import { CreateNoteDto } from './dto/create.note.dto'
import { UpdateNoteDto } from './dto/update.note.dto'

@Injectable()
export class NotesService {
	constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

	async createNote(dto: CreateNoteDto): Promise<NoteDocument> {
		const note = await this.noteModel.create(dto)
		return note
	}

	async getById(id: string): Promise<NoteDocument> {
		const note = await this.noteModel.findById(id)
		if (!note) throw new BadRequestException('Note not found!')
		return note
	}

	async getAll(offset: string, limit?: string) {
		const query = this.noteModel.find().skip(+offset)
		const [data, totalItems] = await Promise.all([
			limit ? await query.limit(+limit) : await query,
			this.noteModel.countDocuments(),
		])

		return { data, totalItems, itemsPerPage: +limit }
	}

	async updateNote(id: string, dto: UpdateNoteDto): Promise<NoteDocument> {
		const note = await this.getById(id)

		if (dto.title) note.title = dto.title
		if (dto.description) note.description = dto.description

		await note.save()
		return note
	}

	async delete(id: string) {
		const note = await this.noteModel.findByIdAndDelete(id)
		if (!note) throw new BadRequestException('Note not found!')
	}
}
