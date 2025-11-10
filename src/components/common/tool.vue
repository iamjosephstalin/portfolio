<script setup lang="ts">
interface Tool {
	name: string;
	icon: string;
	color: string;
	detail: string;
}

interface Props {
	tool: Tool;
}

defineProps<Props>();
</script>

<template>
	<div class="column card is-narrow p-0 is-clickable tool">
		<div class="column is-narrow is-flex is-align-items-center py-0">
			<div class="column is-3 is-narrow-mobile icon">
				<i
					v-if="!tool.icon.includes('.svg')"
					:class="tool.icon"
					:style="{ color: tool.color }"
				></i>
				<img v-else :src="`icons/${tool.icon}`" :alt="tool.name" />
			</div>
			<div class="column has-text-left is-narrow">
				<div class="name">{{ tool.name }}</div>
				<div class="detail">{{ tool.detail }}</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.tool {
	background-color: var(--card-bg-color);
	.icon {
		position: relative;
		padding: 30px;
		font-size: 40px;
		border-radius: 8px;
		background-color: var(--text-color);

		i,
		img {
			top: 50%;
			right: 50%;
			position: absolute;
			transform: translate(50%, -50%);
			width: 40px;
			height: 40px;
		}
	}
	.name {
		color: var(--text-color);
		font-size: 28px;
		font-weight: 550;
	}
	.detail {
		color: var(--text-color-grey);
		font-size: var(--text-small-font-size);
	}

	&:hover {
		background-color: var(--bg-purple);

		.text-highlight {
			color: var(--text-color);
		}
	}
}
</style>
