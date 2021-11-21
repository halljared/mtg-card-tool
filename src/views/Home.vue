<template>
  <v-container>
    <CardList :cards="cards" :columns="columns" />
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
export default class Home extends Vue {
  private columns: string[] = ["name", "set_name", "cmc", "mana_cost"];
  get cards(): ScryfallCard[] {
    return cardModule.collection;
  }
}
</script>
