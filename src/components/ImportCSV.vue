<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5">
        <v-file-input
          v-model="file"
          accept=".csv"
          label="Select a CSV file to import"
        ></v-file-input>
        <!-- <v-btn>Import</v-btn> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import importModule from "@/store/modules/Import";
import cardModule from "@/store/modules/Cards";
import apiModule from "@/store/modules/API";

@Component
export default class ImportCSV extends Vue {
  file: File | null = null;
  // Quantity
  // Name
  // Simple Name
  // Set
  // Card Number
  // Set Code
  // Printing
  @Watch("file")
  fileChanged(file: File | null): void {
    if (file) {
      this.$router.push("/");
      importModule.fileSelected(file).then(() => {
        cardModule.setCollection(apiModule.fetchedCards);
      });
    }
  }
}
</script>
