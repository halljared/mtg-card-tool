<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list dense nav>
      <v-list-item-group color="primary">
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
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
  private items: Array<{ icon: string; title: string; to: string }> = [
    { icon: "mdi-view-dashboard", title: "Browse", to: "/" },
    // { icon: "mdi-import", title: "Import", to: "/import" },
  ];
  get drawer(): boolean {
    return appModule.drawer;
  }
  set drawer(val: boolean) {
    appModule.setDrawer(val);
  }
}
</script>
