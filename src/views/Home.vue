<template>
  <div class="home">
    <CardList :cards="cardList" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CardList from "@/components/CardList.vue";
import Card, { Condition } from "@/types/Card";

@Component({
  components: {
    CardList,
  },
})
export default class Home extends Vue {
  cardList!: Card[];
  created() {
    this.cardList = [
      {
        name: "Liliana Vess",
        setNumber: 123,
        setCode: "M12",
        condition: Condition.NM,
      },
      {
        name: "Ajani Whitemane",
        setNumber: 123,
        setCode: "LWN",
        condition: Condition.MP,
      },
      {
        name: "Jace Beleren",
        setNumber: 123,
        setCode: "LWN",
        condition: Condition.LP,
      },
      {
        name: "Garruk Wildspeaker",
        setNumber: 123,
        setCode: "LWN",
        condition: Condition.NM,
      },
    ];
  }
}
</script>
