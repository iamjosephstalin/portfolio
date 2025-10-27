<script setup lang="ts">
import { useToast } from '@/composables/useToast';
import Toast from './toast.vue';

const { toasts, removeToast } = useToast();
</script>

<template>
	<teleport to="body">
		<div class="toast-container" aria-live="polite" aria-atomic="true">
			<Toast
				v-for="toast in toasts"
				:key="toast.id"
				:message="toast.message"
				:type="toast.type"
				:duration="toast.duration"
				@close="removeToast(toast.id)"
			/>
		</div>
	</teleport>
</template>

<style lang="scss" scoped>
.toast-container {
	position: fixed;
	top: 30px;
	right: 30px;
	z-index: 9999;
	display: flex;
	flex-direction: column;
	gap: 16px;
	pointer-events: none;

	// Allow pointer events on children
	:deep(.toast) {
		pointer-events: auto;
	}
}

// Responsive adjustments
@media (max-width: 768px) {
	.toast-container {
		top: 15px;
		right: 15px;
		left: 15px;

		:deep(.toast) {
			min-width: auto;
			max-width: 100%;
		}
	}
}

// Tablet adjustments
@media (min-width: 769px) and (max-width: 1024px) {
	.toast-container {
		top: 20px;
		right: 20px;
	}
}
</style>
