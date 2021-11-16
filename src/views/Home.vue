<template>
  <div class="home">
    <CardList :cards="cardList" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CardList from "@/components/CardList.vue";
import Card from "@/types/Card";

@Component({
  components: {
    CardList,
  },
})
export default class Home extends Vue {
  cardList!: Card[];
  created() {
    this.cardList = [{ name: "Liliana Vess" }, { name: "Garruk Wildspeaker" }];
  }
}
</script>
