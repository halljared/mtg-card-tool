<template>
  <v-navigation-drawer v-model="drawer" app>
    <!-- <v-list-item>
			<v-list-item-content>
				<v-list-item-title class="text-h6"> Title </v-list-item-title>
				<v-list-item-subtitle> Subtitle </v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item> -->

    <!-- <v-divider></v-divider> -->

    <v-list dense nav>
      <v-list-item-group color="primary">
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon class="mr-0">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Dark Mode</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action class="mr-4">
          <v-switch v-model="$vuetify.theme.dark"></v-switch>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import appModule from "@/store/modules/App";

@Component
export default class NavDrawer extends Vue {
  private items: Array<{ icon: string; title: string }> = [
    { icon: "mdi-view-dashboard", title: "Browse" },
    { icon: "mdi-magnify", title: "Search" },
  ];
  get drawer(): boolean {
    return appModule.drawer;
  }
  set drawer(val: boolean) {
    appModule.setDrawer(val);
  }
}
</script>
