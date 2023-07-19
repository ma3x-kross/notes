import { InternalAxiosRequestConfig } from "axios";

export interface RetryConfig extends InternalAxiosRequestConfig {
	_isRetry: boolean
}
