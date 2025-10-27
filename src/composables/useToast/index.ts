import { ref } from 'vue';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
	id: string;
	message: string;
	type: ToastType;
	duration: number;
}

const toasts = ref<Toast[]>([]);

export function useToast() {
	const showToast = (message: string, type: ToastType = 'success', duration = 4000) => {
		const id = Date.now().toString();
		const toast: Toast = {
			id,
			message,
			type,
			duration
		};

		toasts.value.push(toast);

		// Auto remove after duration
		setTimeout(() => {
			removeToast(id);
		}, duration);

		return id;
	};

	const removeToast = (id: string) => {
		const index = toasts.value.findIndex((t) => t.id === id);
		if (index > -1) {
			toasts.value.splice(index, 1);
		}
	};

	const success = (message: string, duration?: number) => showToast(message, 'success', duration);
	const error = (message: string, duration?: number) => showToast(message, 'error', duration);
	const info = (message: string, duration?: number) => showToast(message, 'info', duration);

	return {
		toasts,
		success,
		error,
		info,
		removeToast
	};
}
