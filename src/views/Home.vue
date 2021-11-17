<template>
  <v-container>
    <CardList :cards="cards" />
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
export default class Home extends Vue {
  get cards(): Card[] {
    return cardModule.collection;
  }
}
</script>
