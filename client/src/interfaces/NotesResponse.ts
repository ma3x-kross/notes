export interface Notes {
	_id: string
	title: string
	description: string
	timestamp: number
}

export interface NotesResponse {
	data: Notes[]
	itemsPerPage: number
	totalItems: number
}
