import { AxiosResponse } from 'axios'
import { AuthResponse } from '../interfaces/AuthResponse'
import $api from '../http'

export default class AuthService {
	static async login(
		login: string,
		password: string,
	): Promise<AxiosResponse<AuthResponse>> {
		return $api.post('/auth/login', { login, password })
	}

	static async logout() {
		return $api.get('/auth/logout')
	}
}
