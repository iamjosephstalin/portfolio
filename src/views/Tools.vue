<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Tool } from '@/components';
import { useIntersectionObserver } from '@/composables/useIntersectionObserver';
import { tools } from '@/config';

const { observe } = useIntersectionObserver();
const toolRefs = ref<HTMLElement[]>([]);

const setToolRef = (el: any) => {
	if (el) toolRefs.value.push(el.$el || el);
};

onMounted(() => {
	toolRefs.value.forEach((el) => observe(el));
});
</script>

<template>
	<div class="columns is-block tools">
		<div class="column has-text-left has-text-centered-mobile pb-5 headline">
			<p class="heading">
				Top-Tier Tech for Exceptional
				<span class="text-highlight">Results</span>
			</p>
		</div>
		<div class="column is-inline-flex is-flex-wrap-wrap p-0 pl-3">
			<div
				class="column is-6 pl-0 fade-in-up"
				v-for="(tool, index) in tools"
				:key="tool.name"
				:ref="setToolRef"
				:style="{ transitionDelay: `${index * 50}ms` }"
			>
				<a :href="tool.url" target="_blank" rel="noopener noreferrer">
					<Tool :tool="tool" class="hover-lift" />
				</a>
			</div>
		</div>
	</div>
</template>
