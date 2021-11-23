<template>
  <div>
    <div
      class="mana-icon"
      v-for="symbol in symbols"
      :key="symbol"
      :class="classMap(symbol)"
    ></div>
  </div>
</template>

<script lang="ts">
import { Identity } from "@/types/Card";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ManaSymbols extends Vue {
  @Prop({ default: [] }) private symbols!: string[];
  classMap = (symbol: Identity): any => {
    let obj: any = {};
    if (symbol == Identity.WHITE) {
      obj = { plains: true };
    } else if (symbol == Identity.BLUE) {
      obj = { island: true };
    } else if (symbol == Identity.BLACK) {
      obj = { swamp: true };
    } else if (symbol == Identity.RED) {
      obj = { mountain: true };
    } else if (symbol == Identity.GREEN) {
      obj = { forest: true };
    }
    return obj;
  };
}
</script>

<style scoped lang="scss">
$startingOffset: 108px;
$symbolOffset: 18px;
.mana-icon {
  display: inline-block;
  background: url("~@/assets/Mana.svg");
  background-position-y: -36px;
  background-size: 180px;
  height: 18px;
  width: 18px;
}
.plains {
  background-position-x: ($startingOffset);
}
.island {
  background-position-x: ($startingOffset - $symbolOffset);
}
.swamp {
  background-position-x: ($startingOffset - 2 * $symbolOffset);
}
.mountain {
  background-position-x: ($startingOffset - 3 * $symbolOffset);
}
.forest {
  background-position-x: ($startingOffset - 4 * $symbolOffset);
}
</style>
