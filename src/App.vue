<template>
	<v-app>
		<nav-drawer>
			<!-- -->
		</nav-drawer>

		<v-app-bar app color="blue">
			<v-app-bar-nav-icon color="white" @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
			<v-toolbar-title class="white--text">Jared's Collection Browser</v-toolbar-title>
		</v-app-bar>

		<!-- Sizes your content based upon application components -->
		<v-main>
			<!-- Provides the application the proper gutter -->
			<v-container fluid>
				<!-- If using vue-router -->
				<router-view></router-view>
			</v-container>
		</v-main>

		<v-footer app>
			<!-- -->
		</v-footer>
	</v-app>
	<!--
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div>
		<router-view />
	</div>
	-->
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NavDrawer from "./components/NavDrawer.vue";
import appModule from '@/store/modules/App';

@Component({
	components: {
		NavDrawer,
	},
})
export default class App extends Vue {
	toggleDrawer() {
		appModule.setDrawer(!appModule.drawer);
	}
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
