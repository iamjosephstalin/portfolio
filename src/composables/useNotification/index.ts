import axios from 'axios';

export interface Contact {
	name: string;
	email: string;
	message?: string;
}

export function useNotification() {
	async function sendNotification(contact: Contact): Promise<void> {
		try {
			// Determine the API endpoint
			// In development, use the dev API server (port 3001)
			// In production on Vercel, it will call the Vercel domain
			let apiUrl = import.meta.env.VITE_API_URL;

			// If no explicit API URL is set, use the appropriate endpoint
			if (!apiUrl) {
				// In development with the dev server, use localhost:3001
				if (import.meta.env.DEV) {
					apiUrl = 'http://localhost:3001';
				} else {
					// In production, use the current origin
					apiUrl = window.location.origin;
				}
			}

			const endpoint = `${apiUrl}/api/send-email`;

			await axios.post(endpoint, contact, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} catch (error) {
			console.error('Error sending email:', error);
			throw error;
		}
	}

	return { sendNotification };
}
