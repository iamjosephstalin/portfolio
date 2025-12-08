import { onMounted, onUnmounted, ref } from 'vue';

export function useIntersectionObserver(
	options = { threshold: 0.1, rootMargin: '0px' }
) {
	const observer = ref<IntersectionObserver | null>(null);

	const observe = (element: HTMLElement) => {
		if (observer.value) {
			observer.value.observe(element);
		}
	};

	const unobserve = (element: HTMLElement) => {
		if (observer.value) {
			observer.value.unobserve(element);
		}
	};

	onMounted(() => {
		observer.value = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					// Optional: Stop observing once visible to run animation only once
					observer.value?.unobserve(entry.target);
				}
			});
		}, options);
	});

	onUnmounted(() => {
		if (observer.value) {
			observer.value.disconnect();
		}
	});

	return {
		observe,
		unobserve
	};
}
