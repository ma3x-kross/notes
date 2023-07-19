import axios, { AxiosError, AxiosResponse } from 'axios'
import { RetryConfig } from '../interfaces/RetryConfig'
import { AuthResponse } from '../interfaces/AuthResponse'

export const API_URL = 'http://localhost:5000'

const $api = axios.create({ withCredentials: true, baseURL: API_URL })

$api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token')
	if (token) config.headers.Authorization = `Bearer ${token}`
	return config
})

$api.interceptors.response.use(
	(config: AxiosResponse) => {
		return config
	},
	async (error: AxiosError) => {
		const originalRequest = error.config as RetryConfig
		if (
			error?.response?.status === 403 &&
			error.config &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const response = await axios.get<AuthResponse>(
					`${API_URL}/auth/refresh`,
					{
						withCredentials: true,
					},
				)
			
				localStorage.setItem('token', response.data.accessToken)
				return $api.request(originalRequest)
			} catch (e) {
				console.log('Unauthorized')
			}
		}
		throw error
	},
)

export default $api
