<template>
  <v-container id="cardList">
    <v-expansion-panels class="pb-1">
      <v-expansion-panel>
        <v-card outlined tile>
          <v-expansion-panel-header expand-icon="mdi-filter" />
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-card>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-data-table :headers="headers" :items="cards" :loading="loading">
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
    <div v-if="wants && cards.length == 0">
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
import importModule from "@/store/modules/Import";

@Component({
  components: {
    ManaSymbols,
  },
})
export default class CardList extends Vue {
  @Prop() private cards!: ScryfallCard[];
  @Prop({ type: Boolean }) private wants!: boolean;
  private Printing = Printing;
  headers = [
    { text: "Name", value: "name", width: "30%" },
    { text: "Set", value: "set_name", width: "20%" },
    { text: "CMC", value: "cmc", width: "12%" },
    { text: "Colors", value: "color_identity", width: "12%" },
    { text: "Qty", value: "quantity", width: "12%", sortable: false },
    { text: "", value: "action", sortable: false },
  ];
  key = key;
  get loading(): boolean {
    return importModule.loading;
  }

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
