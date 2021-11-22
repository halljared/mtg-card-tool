<template>
  <v-container>
    <div v-if="cards && cards.length > 0">
      <v-data-table :headers="headers" :items="cards">
        <template v-slot:[`item.action`]="{ item }" width="100%">
          <td>
            <v-btn
              outlined
              color="success"
              class="float-md-right"
              height="30px"
              width="48px"
              v-if="!selected(item)"
              @click.stop="wantClicked(item)"
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
              @click.stop="removeClicked(item)"
            >
              <v-icon>mdi-minus-box</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
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
  headers = [
    { text: "Name", value: "name" },
    { text: "Set", value: "set_name" },
    { text: "CMC", value: "cmc" },
    { text: "Cost", value: "mana_cost" },
    { text: "", value: "action", sortable: false },
  ];
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
