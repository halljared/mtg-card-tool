<template>
  <v-container>
    <div v-if="cards && cards.length > 0">
      <v-data-table :headers="headers" :items="cards">
        <template v-slot:[`item.name`]="{ item }">
          <td class="text-start">
            <v-img
              v-if="item.printing == Printing.FOIL"
              src="@/assets/foil_icon_24.png"
              height="18px"
              width="18px"
              class="mr-1 foil-icon"
            ></v-img>
            <span>{{ item.name }}</span>
          </td>
        </template>
        <template v-slot:[`item.color_identity`]="{ item }">
          <td class="text-start">
            <mana-symbols :symbols="item.color_identity"></mana-symbols>
          </td>
        </template>
        <template v-slot:[`item.action`]="{ item }">
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
import { cardEquals, ScryfallCard, key, Printing } from "@/types/Card";
import cardModule from "@/store/modules/Cards";
import ManaSymbols from "./ManaSymbols.vue";

@Component({
  components: {
    ManaSymbols,
  },
})
export default class CardList extends Vue {
  @Prop() private cards!: ScryfallCard[];
  private Printing = Printing;
  headers = [
    { text: "Name", value: "name" },
    { text: "Set", value: "set_name" },
    { text: "CMC", value: "cmc" },
    { text: "Colors", value: "color_identity" },
    { text: "", value: "action", sortable: false },
  ];
  key = key;

  wantClicked(card: ScryfallCard): void {
    cardModule.addWant(card);
  }
  removeClicked(card: ScryfallCard): void {
    cardModule.removeWant(card);
  }
  selected(card: ScryfallCard): boolean {
    let filtered = cardModule.wants.filter((_card) => {
      return cardEquals(card, _card);
    });

    return filtered.length == 1;
  }
}
</script>

<style scoped lang="scss">
.foil-icon {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
