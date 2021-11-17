<template>
  <v-container>
    <CardList :cards="wants" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CardList from "@/components/CardList.vue";
import Card from "@/types/Card";
import cardModule from "@/store/modules/Cards";

@Component({
  components: {
    CardList,
  },
})
export default class Wants extends Vue {
  get wants(): Card[] {
    return cardModule.collection.slice(0, 2);
  }
}
</script>
