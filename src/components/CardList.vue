<template>
  <v-container id="cardList">
    <v-expansion-panels class="pb-1">
      <v-expansion-panel>
        <v-card outlined tile>
          <v-expansion-panel-header expand-icon="mdi-filter" />
          <v-expansion-panel-content>
            <v-container>
              <v-row>
                <v-col>
                  <v-autocomplete
                    label="Name"
                    v-model="nameInput"
                    :items="names"
                    clearable
                    aria-autocomplete="none"
                    autocomplete="off"
                    type="search"
                    @input="nameInputSearch"
                  >
                  </v-autocomplete>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Card Text"
                    v-model="textInput"
                    clearable
                    aria-autocomplete="none"
                    autocomplete="off"
                    type="search"
                    @keyup="textInputSearch"
                    @click:clear="textInputCleared"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-autocomplete
                    label="Set Name"
                    :items="setNames"
                    clearable
                    multiple
                    chips
                    deletable-chips
                  >
                  </v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete
                    label="Type"
                    :items="types"
                    clearable
                    multiple
                    chips
                    deletable-chips
                  >
                  </v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete
                    label="Subtype"
                    :items="subTypes"
                    clearable
                    multiple
                    chips
                    deletable-chips
                  >
                  </v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete
                    label="Keyword"
                    :items="keywords"
                    clearable
                    multiple
                    chips
                    deletable-chips
                  >
                  </v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete
                    label="Identity"
                    v-model="selectedIdentities"
                    :items="identities"
                    clearable
                    multiple
                    chips
                  >
                    <template v-slot:selection="data">
                      <v-chip close @click:close="removeIdentity(data.item)">
                        <mana-symbols :symbols="[data.item]" />
                      </v-chip>
                    </template>
                    <template v-slot:item="data">
                      <mana-symbols :symbols="[data.item]" />
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-card>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-data-table
      :headers="headers"
      :items="filtered.length ? filtered : cards"
      :loading="loading"
      :key="keyCounter"
    >
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
      <template v-slot:[`item.prices`]="{ item }">
        <td class="text-start">
          {{
            `\$${
              item.printing == Printing.NORMAL
                ? item.prices["usd"]
                : item.prices["usd_foil"]
            }`
          }}
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
import {
  cardEquals,
  ScryfallCard,
  key,
  Printing,
  Identity,
  Price,
} from "@/types/Card";
import cardModule from "@/store/modules/Cards";
import ManaSymbols from "./ManaSymbols.vue";
import importModule from "@/store/modules/Import";
import { debounce, DebouncedFunc } from "lodash";
@Component({
  components: {
    ManaSymbols,
  },
})
export default class CardList extends Vue {
  created() {
    const _textSearch = (() => {
      if (this.textInput) {
        const needle = this.textInput.toLowerCase();
        this.filteredbyText = this.cards.filter((card) => {
          return (
            card.oracle_text &&
            card.oracle_text.toLowerCase().indexOf(needle) >= 0
          );
        });
      } else {
        this.filteredbyText = [];
      }
      this.mergeFilters();
      this.forceRender();
    }).bind(this);
    this.textInputSearch = debounce(_textSearch, 500);
  }
  @Prop({ default: [] }) private cards!: ScryfallCard[];
  @Prop({ type: Boolean }) private wants!: boolean;
  keyCounter = 0;
  filtered: ScryfallCard[] = [];
  selectedIdentities: Identity[] = [];
  textInput = "";
  textInputSearch!: DebouncedFunc<() => void>;
  filteredbyText: ScryfallCard[] = [];
  nameInput = "";
  filteredbyName: ScryfallCard[] = [];
  forceRender(): void {
    this.keyCounter++;
  }
  textInputCleared(): void {
    this.filteredbyText = [];
    this.mergeFilters();
  }
  nameInputSearch(): void {
    this.filteredbyName = this.cards.filter((card) => {
      return card.name == this.nameInput;
    });
    this.mergeFilters();
  }
  mergeFilters(): void {
    const filters: Array<ScryfallCard[]> = [];
    let filtered = this.cards;
    if (this.filteredbyText.length) filters.push(this.filteredbyText);
    if (this.filteredbyName.length) filters.push(this.filteredbyName);
    for (let filter of filters) {
      filtered = filtered.filter((card) => {
        return filter.indexOf(card) >= 0;
      });
    }
    if (filtered.length < this.cards.length) {
      this.filtered = filtered;
    } else {
      this.filtered = [];
    }
  }
  private Printing = Printing;
  headers = [
    { text: "Name", value: "name", width: "30%" },
    { text: "Set", value: "set_name", width: "20%" },
    { text: "CMC", value: "cmc", width: "12%" },
    { text: "Colors", value: "color_identity", width: "12%" },
    { text: "Qty", value: "quantity", width: "12%", sortable: false },
    {
      text: "Price",
      value: "prices",
      width: "12%",
      sort: (a: Price, b: Price): number => {
        const numA = a.usd || a.usd_foil,
          numB = b.usd || b.usd_foil;
        return parseFloat(numA) > parseFloat(numB) ? 1 : -1;
      },
    },
    { text: "", value: "action", sortable: false },
  ];
  key = key;
  identities = [
    Identity.WHITE,
    Identity.BLUE,
    Identity.BLACK,
    Identity.RED,
    Identity.GREEN,
  ];
  get loading(): boolean {
    return importModule.loading;
  }
  get setNames(): string[] {
    return this.cards.map((card) => {
      return card.set_name;
    });
  }
  get names(): string[] {
    return this.cards.map((card) => {
      return card.name;
    });
  }
  get keywords(): string[] {
    return this.cards
      .map((card) => {
        return card.keywords;
      })
      .flat();
  }
  get types(): string[] {
    return this.cards
      .map((card) => {
        let types: string;
        if (card.type_line.indexOf("—") > 0) {
          types = card.type_line.split("—")[0];
        } else {
          types = card.type_line;
        }
        return types.split(" ").filter((split) => {
          return split.length > 0 && split != " ";
        });
      })
      .flat()
      .filter((flat, index, self) => {
        return self.indexOf(flat) === index;
      });
  }
  get subTypes(): string[] {
    return this.cards
      .map((card) => {
        let types: string;
        if (card.type_line.indexOf("—") > 0) {
          types = card.type_line.split("—")[1];
        } else {
          types = " ";
        }
        return types.split(" ").filter((split) => {
          return split.length > 0 && split != " ";
        });
      })
      .flat()
      .filter((flat, index, self) => {
        return self.indexOf(flat) === index;
      });
  }

  removeIdentity(identity: Identity): void {
    const index = this.selectedIdentities.indexOf(identity);
    this.selectedIdentities.splice(index, 1);
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
