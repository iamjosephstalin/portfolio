<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
	message: string;
	type?: 'success' | 'error' | 'info';
	duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
	type: 'success',
	duration: 4000
});

const emit = defineEmits<{
	close: [];
}>();

const isVisible = ref(false);
const isLeaving = ref(false);

onMounted(() => {
	setTimeout(() => {
		isVisible.value = true;
	}, 10);

	// Auto close after duration
	const timer = setTimeout(() => {
		close();
	}, props.duration);

	// Cleanup timer
	return () => clearTimeout(timer);
});

const close = () => {
	isLeaving.value = true;
	setTimeout(() => {
		emit('close');
	}, 300);
};

const getIconClass = () => {
	switch (props.type) {
		case 'success':
			return 'fa-solid fa-check';
		case 'error':
			return 'fa-solid fa-xmark';
		case 'info':
			return 'fa-solid fa-circle-info';
		default:
			return 'fa-solid fa-circle-info';
	}
};

const getTypeClass = () => {
	return `toast--${props.type}`;
};
</script>

<template>
	<div
		class="toast"
		:class="[
			getTypeClass(),
			{ 'toast--visible': isVisible, 'toast--leaving': isLeaving }
		]"
		role="alert"
	>
		<div class="toast__icon">
			<i :class="getIconClass()"></i>
		</div>
		<div class="toast__content">
			<p class="toast__message">{{ message }}</p>
		</div>
		<button class="toast__close" @click="close" aria-label="Close notification">
			<i class="fa-solid fa-xmark"></i>
		</button>
	</div>
</template>

<style lang="scss" scoped>
.toast {
	display: flex;
	align-items: center;
	gap: 16px;
	min-width: 320px;
	max-width: 500px;
	padding: 20px 24px;
	background-color: var(--card-bg-color);
	border-radius: 16px;
	box-shadow:
		0 8px 32px rgba(0, 0, 0, 0.4),
		0 2px 8px rgba(0, 0, 0, 0.2);
	border: 1px solid var(--text-color-grey);
	border-left: 4px solid;
	opacity: 0;
	transform: translateY(-20px);
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	font-family: 'Outfit', sans-serif;

	&--visible {
		opacity: 1;
		transform: translateY(0);
	}

	&--leaving {
		opacity: 0;
		transform: translateY(-20px);
	}

	&--success {
		border-left-color: var(--text-highlight);
		background: linear-gradient(
			135deg,
			var(--card-bg-color) 0%,
			var(--card-bg-color) 100%
		);

		.toast__icon {
			background-color: rgba(145, 75, 241, 0.15);
			color: var(--text-highlight);
		}
	}

	&--error {
		border-left-color: #ef4444;
		background: linear-gradient(
			135deg,
			var(--card-bg-color) 0%,
			var(--card-bg-color) 100%
		);

		.toast__icon {
			background-color: rgba(239, 68, 68, 0.15);
			color: #ef4444;
		}
	}

	&--info {
		border-left-color: var(--text-highlight);
		background: linear-gradient(
			135deg,
			var(--card-bg-color) 0%,
			var(--card-bg-color) 100%
		);

		.toast__icon {
			background-color: rgba(145, 75, 241, 0.15);
			color: var(--text-highlight);
		}
	}
}

.toast__icon {
	width: 40px;
	height: 40px;
	border-radius: 12px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	font-size: 18px;
	flex-shrink: 0;

	i {
		font-size: 18px;
	}
}

.toast__content {
	flex: 1;
	min-width: 0; // Allow text to wrap properly
}

.toast__message {
	margin: 0;
	color: var(--text-color);
	font-size: 15px;
	font-weight: 400;
	line-height: 1.5;
	letter-spacing: -0.01em;
}

.toast__close {
	background: none;
	border: none;
	color: var(--text-color-grey);
	cursor: pointer;
	font-size: 14px;
	padding: 0;
	width: 28px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s ease;
	border-radius: 8px;
	font-weight: 400;

	i {
		font-size: 14px;
	}

	&:hover {
		background-color: var(--light-grey-shade);
		color: var(--text-color);
		transform: scale(1.1);
	}
}

// Mobile responsive
@media (max-width: 768px) {
	.toast {
		min-width: auto;
		max-width: calc(100vw - 20px);
		padding: 16px 20px;
	}

	.toast__icon {
		width: 36px;
		height: 36px;
		font-size: 18px;
	}

	.toast__message {
		font-size: 14px;
	}
}
</style>
