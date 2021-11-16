<template>
	<v-navigation-drawer v-model="drawer">
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title class="text-h6"> Application </v-list-item-title>
				<v-list-item-subtitle> subtext </v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-divider></v-divider>

		<v-list dense nav>
			<v-list-item v-for="item in items" :key="item.title" link>
				<v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavDrawer extends Vue {
	private items: Array<{ icon: string; title: string }> = [
		{ icon: "mdi-view-dashboard", title: "Browse" },
	];
	private drawer = true;
}
</script>
