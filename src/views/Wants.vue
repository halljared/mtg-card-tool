<template>
  <v-container>
    <CardList :cards="wants" wants />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CardList from "@/components/CardList.vue";
import cardModule from "@/store/modules/Cards";
import { ScryfallCard } from "@/types/Card";

@Component({
  components: {
    CardList,
  },
})
export default class Wants extends Vue {
  get wants(): ScryfallCard[] {
    return cardModule.wants;
  }
}
</script>
