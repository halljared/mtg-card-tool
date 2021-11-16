<template>
  <v-container>
    <v-row v-for="card in cards" :key="card.name" class="mb-3">
      <v-card outlined elevation="2">
        <v-row>
          <v-col cols="2">
            <v-card-text>
              {{ card.name }}
            </v-card-text>
          </v-col>
          <v-col cols="2">
            <v-card-text> EMN </v-card-text>
          </v-col>
          <v-col cols="2">
            <v-card-text> LP </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Card from "../types/Card";

@Component
export default class CardList extends Vue {
  @Prop() private cards!: Card[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
