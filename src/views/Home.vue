<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Introduction } from '@/components';
import { useIntersectionObserver } from '@/composables/useIntersectionObserver';
import { Projects, Tools } from '@/views';

const { observe } = useIntersectionObserver();

const introSection = ref(null);
const projectsSection = ref(null);
const toolsSection = ref(null);

onMounted(() => {
	if (introSection.value) observe(introSection.value);
	if (projectsSection.value) observe(projectsSection.value);
	if (toolsSection.value) observe(toolsSection.value);
});
</script>

<template>
	<section>
		<div ref="introSection" class="fade-in-up">
			<Introduction />
		</div>
		<div ref="projectsSection" class="fade-in-up">
			<Projects class="mt-6 section-margin-top-0-mobile" />
		</div>
		<div ref="toolsSection" class="fade-in-up">
			<Tools />
		</div>
	</section>
</template>

<style lang="scss" scoped>
::v-deep(.tools) {
	margin-top: 3rem;
}

::v-deep(.tools .headline .heading),
::v-deep(.projects .headline .heading) {
	font-size: 58px !important;
	font-weight: 500 !important;
	text-shadow: 0.03em 0 0 currentColor;

	@media screen and (max-width: 768px) {
		font-size: var(--h2-mobile-size) !important;
	}
}
</style>
