<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-textarea label="url" v-model="input"></v-textarea>
        <v-btn @click.stop="goClicked()">Go</v-btn>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Output:</v-card-title>
          <v-card-text>{{ APIOutput }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import apiModule from "@/store/modules/API";

@Component
export default class MongoAPI extends Vue {
  input = "";
  goClicked(): void {
    // let card = cardModule.collection[0];
    // apiModule.fetchCard(card);
    return;
  }
  get APIOutput(): string {
    return apiModule.response;
  }
}
</script>
