<template>
  <v-app>
    <nav-drawer> </nav-drawer>

    <v-app-bar app dense color="primary">
      <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text"></v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <v-bottom-navigation app color="primary" :value="value">
        <v-btn value="browse" to="/">
          <span>Browse</span>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn value="wants" to="/wants">
          <span>Wants</span>
          <v-icon>mdi-playlist-check</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
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
import appModule from "@/store/modules/App";
import cards from "@/store/cards.json";
import cardModule from "@/store/modules/Cards";
import Card from "./types/Card";

@Component({
  components: {
    NavDrawer,
  },
})
export default class App extends Vue {
  value = "browse";
  created() {
    cardModule.importCollection(cards as Card[]);
  }
  toggleDrawer(): void {
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
