import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'
import axios from 'axios'
import { AuthResponse } from '../interfaces/AuthResponse'
import { API_URL } from '../http'
import { Notes } from '../interfaces/NotesResponse'
import NotesService from '../services/NotesService'
import { titles } from '../pages/NotesPage/NotesPage'

export default class Store {
	user = ''
	isAuth = false
	loading = false
	totalItems = 0

	sortDirection = {
		title: '',
		description: '',
		timestamp: '',
	}

	note = {} as Notes
	notes = [] as Notes[]

	constructor() {
		makeAutoObservable(this)
	}

	setUser(user: string) {
		this.user = user
	}

	setAuth(bool: boolean) {
		this.isAuth = bool
	}

	setLoading(bool: boolean) {
		this.loading = bool
	}

	setNotes(notes: Notes[]) {
		this.notes = notes
	}

	setOneNote(note: Notes) {
		this.note = note
	}

	setTotalItems(num: number) {
		this.totalItems = num
	}

	setSortDirection(columnName: string) {
		this.sortDirection = {
			...this.sortDirection,
			[columnName]:
				this.sortDirection[columnName as keyof typeof this.sortDirection] ===
				'asc'
					? 'desc'
					: 'asc',
		}
	}

	sortNotes(field: string) {
		try {
			switch (field) {
				case titles[0]: {
					this.notes.sort((a, b) =>
						b.title.toLocaleLowerCase() > a.title.toLocaleLowerCase() ? 1 : -1,
					)
					this.setSortDirection('title')
					if (this.sortDirection.title === 'asc') this.notes.reverse()
					break
				}
				case titles[1]: {
					this.notes.sort((a, b) =>
						b.description.toLocaleLowerCase() >
						a.description.toLocaleLowerCase()
							? 1
							: -1,
					)
					this.setSortDirection('description')
					if (this.sortDirection.description === 'asc') this.notes.reverse()
					break
				}
				case titles[2]: {
					this.notes.sort((a, b) => b.timestamp - a.timestamp)
					this.setSortDirection('timestamp')
					if (this.sortDirection.timestamp === 'asc') this.notes.reverse()
					break
				}
				case titles[3]: {
					break
				}
			}
		} catch (e) {}
	}

	async login(login: string, password: string) {
		try {
			this.setLoading(true)
			const response = await AuthService.login(login, password)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.login)

			return true
		} catch (error) {
			console.log(error)
			return false
		} finally {
			this.setLoading(false)
		}
	}

	async logout() {
		try {
			await AuthService.logout()
			localStorage.removeItem('token')
			this.setAuth(false)
			this.setUser('')
		} catch (e) {
			console.log(e)
		}
	}

	async checkAuth() {
		try {
			this.setLoading(true)
			const response = await axios.get<AuthResponse>(
				`${API_URL}/auth/refresh`,
				{
					withCredentials: true,
				},
			)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.login)
		} catch (e) {
			console.log(e)
		} finally {
			this.setLoading(false)
		}
	}

	async createNotes(title: string, description: string) {
		try {
			this.setLoading(true)
			await NotesService.create(title, description)
			return true
		} catch (e) {
			console.log(e)
			return false
		} finally {
			this.setLoading(false)
		}
	}

	async getAllNotes(offset: number, limit?: number) {
		try {
			const response = await NotesService.getAll(offset)
			this.setNotes(response.data.data)
			this.setTotalItems(response.data.totalItems)
		} catch (e) {
			console.log(e)
		}
	}

	async getNoteById(id: string) {
		try {
			const response = await NotesService.getById(id)
			this.setOneNote(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	async updateNote(id: string, title?: string, description?: string) {
		try {
			const response = await NotesService.update(id, title, description)
			this.setOneNote(response.data)
			console.log(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	async deleteNote(id: string) {
		try {
			await NotesService.delete(id)
		} catch (e) {
			console.log(e)
		}
	}
}
