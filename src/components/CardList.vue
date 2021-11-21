<template>
  <v-container>
    <div v-if="cards && cards.length > 0">
      <v-card outlined tile elevation="4" width="100%" class="mb-2">
        <v-container class="pa-0">
          <v-row>
            <v-col cols="8" md="10" class="pr-0">
              <v-container class="py-0">
                <v-row>
                  <v-col
                    cols="6"
                    :md="val == 'name' ? 3 : 2"
                    v-for="val in columns"
                    :key="val"
                  >
                    <v-card-text class="pa-2 text-truncate">
                      {{ val }}
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-hover v-slot="{ hover }" v-for="card in cards" :key="sfKey(card)">
        <v-card
          outlined
          tile
          :elevation="hover ? 2 : 0"
          width="100%"
          :class="{ 'on-hover': hover }"
          class="my-1"
        >
          <v-container class="pa-0">
            <v-row>
              <v-col cols="8" md="10" class="pr-0">
                <v-container>
                  <v-row>
                    <v-col
                      cols="6"
                      :md="val == 'name' ? 3 : 2"
                      v-for="val in columns"
                      :key="val"
                      class="pa-1"
                    >
                      <v-card-text class="pa-1 text-truncate">
                        {{ card[val] }}
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col
                cols="4"
                md="2"
                class="pa-1"
                :class="{ 'd-none': !hover && !selected(card) }"
              >
                <v-container fill-height>
                  <v-row>
                    <v-col>
                      <v-btn
                        outlined
                        color="success"
                        class="float-md-right"
                        height="30px"
                        width="48px"
                        v-if="!selected(card)"
                        @click.stop="wantClicked(card)"
                      >
                        <v-icon>mdi-plus-box</v-icon>
                      </v-btn>
                      <v-btn
                        outlined
                        color="warning"
                        class="float-md-right"
                        height="30px"
                        width="48px"
                        v-else
                        @click.stop="removeClicked(card)"
                      >
                        <v-icon>mdi-minus-box</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-hover>
    </div>
    <div v-else>
      <v-card outlined tile elevation="4" width="100%" class="mb-2">
        <v-card-title
          class="text-center mx-auto d-block"
          style="word-break: keep-all"
          >No wants have been selected</v-card-title
        >
      </v-card>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { sfCardEquals, ScryfallCard, sfKey } from "@/types/Card";
import cardModule from "@/store/modules/Cards";

@Component
export default class CardList extends Vue {
  @Prop() private cards!: ScryfallCard[];
  columns = ["name", "set_name", "cmc", "mana_cost"];
  sfKey = sfKey;

  wantClicked(card: ScryfallCard): void {
    cardModule.addWant(card);
  }
  removeClicked(card: ScryfallCard): void {
    cardModule.removeWant(card);
  }
  selected(card: ScryfallCard): boolean {
    let filtered = cardModule.wants.filter((_card) => {
      return sfCardEquals(card, _card);
    });

    return filtered.length == 1;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.v-application.theme--dark .elevation-6 {
  border-color: rgb(109, 109, 109);
}
.on-hover {
  // cursor: pointer;
}
</style>
