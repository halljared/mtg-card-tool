<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="5">
        <v-file-input
          v-model="file"
          :success="hasCSV"
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
  get hasCSV(): boolean {
    return !!importModule.csv;
  }

  @Watch("hasCSV")
  csvLoaded(hasCSV: boolean): void {
    if (hasCSV) {
      importModule.parseCSV();
      cardModule.setCollection(importModule.cards);
    }
  }

  @Watch("file")
  fileChanged(file: File | null): void {
    if (file) {
      importModule.fileSelected(file);
    }
  }
}
</script>
