<template>
  <v-container>
    <v-card outlined tile elevation="4" width="100%" class="mb-2">
      <v-row>
        <v-col cols="6" md="2" v-for="(val, prop) in cards[1]" :key="prop">
          <v-card-text class="pa-2">
            {{ prop }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <v-hover
      v-slot="{ hover }"
      v-for="card in cards"
      :key="card.name + card.setCode"
    >
      <v-card
        outlined
        tile
        :elevation="hover ? 6 : 0"
        width="100%"
        :class="{ 'on-hover': hover }"
        class="my-1"
      >
        <v-container>
          <v-row>
            <v-col
              cols="6"
              md="2"
              v-for="(val, prop) in card"
              :key="prop"
              class="pa-1"
            >
              <v-card-text class="pa-1">
                {{ val }}
              </v-card-text>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-hover>
    <!-- </v-row> -->
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
.v-application.theme--dark .elevation-6 {
  border-color: rgb(109, 109, 109);
}
.on-hover {
  // cursor: pointer;
}
</style>
