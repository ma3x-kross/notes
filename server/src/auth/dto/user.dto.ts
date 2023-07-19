import { User } from '../user.schema'

export class UserDto {
	login: string
	password: string
}

export interface UserWithTokens extends User {
	accessToken: string
	refreshToken: string
}
