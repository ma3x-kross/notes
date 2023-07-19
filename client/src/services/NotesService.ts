import { AxiosResponse } from 'axios'
import { Notes, NotesResponse } from '../interfaces/NotesResponse'
import $api from '../http'

export default class NotesService {
	static async create(
		title: string,
		description: string,
	): Promise<AxiosResponse<Notes>> {
		return $api.post('/notes', {
			title,
			description,
			timestamp: new Date().getTime(),
		})
	}

	static async getAll(offset: number): Promise<AxiosResponse<NotesResponse>> {
		return $api.get(`notes?offset=${offset}&limit=5`)
	}

	static async getById(id: string): Promise<AxiosResponse<Notes>> {
		return $api.get(`notes/${id}`)
	}

	static async update(
		id: string,
		title?: string,
		description?: string,
	): Promise<AxiosResponse<Notes>> {
		return $api.put(`/notes/${id}`, {
			title,
			description,
		})
	}

	static async delete(id: string) {
		$api.delete(`notes/${id}`)
	}
}
