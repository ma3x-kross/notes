export const formatDate = (timestamp: number) =>
	new Date(timestamp).toLocaleDateString(undefined, {
		hour: 'numeric',
		minute: 'numeric',
		timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	})
