<template>
  <v-container class="pa-0">
    <v-expansion-panels class="pb-1" v-if="!wants">
      <v-expansion-panel>
        <v-card outlined tile>
          <v-expansion-panel-header expand-icon="mdi-filter" />
          <v-expansion-panel-content>
            <v-container>
              <v-row>
                <v-col cols="6" class="col-md-3">
                  <v-text-field
                    label="Name"
                    type="search"
                    v-model="nameInput"
                    clearable
                    @keyup="nameInputSearch"
                    @click:clear="nameInputCleared"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="col-md-3">
                  <v-text-field
                    label="Card Text"
                    type="search"
                    v-model="textInput"
                    clearable
                    @keyup="textInputSearch"
                    @click:clear="textInputCleared"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="col-md-3">
                  <v-autocomplete
                    label="Set Name"
                    type="search"
                    v-model="filterOptions.setNames"
                    :items="setNameOptions"
                    clearable
                    multiple
                    chips
                    deletable-chips
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="6" class="col-md-3">
                  <v-autocomplete
                    label="Type"
                    type="search"
                    v-model="filterOptions.superTypes"
                    :items="superTypeOptions"
                    clearable
                    multiple
                    chips
                    deletable-chips
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="6" class="col-md-3">
                  <v-autocomplete
                    label="Subtype"
                    type="search"
                    v-model="filterOptions.subTypes"
                    :items="subTypeOptions"
                    clearable
                    multiple
                    chips
                    deletable-chips
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="6" class="col-md-3">
                  <v-autocomplete
                    label="Keyword"
                    type="search"
                    v-model="filterOptions.keywords"
                    :items="keywordOptions"
                    clearable
                    multiple
                    chips
                    deletable-chips
                  >
                  </v-autocomplete>
                </v-col>
                <v-col cols="6" class="col-md-3">
                  <v-autocomplete
                    label="Identity"
                    type="search"
                    v-model="filterOptions.colors"
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
      :items="cards"
      :options.sync="tableOptions"
      :server-items-length="itemCount"
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
      <template v-slot:[`item.price`]="{ item }">
        <td class="text-start">{{ usdFormatter.format(item.price) }}</td>
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import {
  cardEquals,
  ScryfallCard,
  key,
  Printing,
  Identity,
} from "@/types/Card";
import cardModule from "@/store/modules/Cards";
import ManaSymbols from "./ManaSymbols.vue";
import importModule from "@/store/modules/Import";
import { debounce, DebouncedFunc } from "lodash";
import { DataTableOptions } from "../types/Vuetify";
import apiModule from "@/store/modules/API";
import { FilterOptions } from "@/types/API";
@Component({
  components: {
    ManaSymbols,
  },
})
export default class CardList extends Vue {
  created() {
    apiModule.fetchSetNames().then((options) => {
      if (options) this.setNameOptions = options;
    });
    apiModule.fetchKeywordOptions().then((options) => {
      if (options) this.keywordOptions = options;
    });
    apiModule.fetchSuperTypeOptions().then((options) => {
      if (options) this.superTypeOptions = options;
    });
    apiModule.fetchSubTypeOptions().then((options) => {
      if (options) this.subTypeOptions = options;
    });
    this.fetchPage();
    const _nameSearch = (() => {
      if (this.nameInput) {
        this.tableOptions.page = 1;
        this.filterOptions.name = this.nameInput;
      }
    }).bind(this);
    const _textSearch = (() => {
      if (this.textInput) {
        this.tableOptions.page = 1;
        this.filterOptions.text = this.textInput;
      }
    }).bind(this);
    this.textInputSearch = debounce(_textSearch, 500);
    this.nameInputSearch = debounce(_nameSearch, 500);
  }
  @Prop({ default: [] }) private cards!: ScryfallCard[];
  @Prop({ type: Boolean }) private wants!: boolean;
  tableOptions: DataTableOptions = {
    itemsPerPage: 10,
    multiSort: false,
    mustSort: false,
    page: 1,
    sortBy: ["price"],
    sortDesc: [true],
  };
  usdFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  itemCount = 0;
  keyCounter = 0;
  filtered: ScryfallCard[] = [];
  setNameOptions: string[] = [];
  keywordOptions: string[] = [];
  superTypeOptions: string[] = [];
  subTypeOptions: string[] = [];
  textInput = "";
  textInputSearch!: DebouncedFunc<() => void>;
  nameInputSearch!: DebouncedFunc<() => void>;
  filteredbyText: ScryfallCard[] = [];
  nameOptions: string[] = [];
  nameInput = "";
  nameSearch = "";
  filteredbyName: ScryfallCard[] = [];
  filterOptions: FilterOptions = {
    name: this.nameInput,
    text: this.textInput,
    setNames: [],
    superTypes: [],
    subTypes: [],
    keywords: [],
    colors: [],
  };
  forceRender(): void {
    this.keyCounter++;
  }
  fetchPage(): void {
    apiModule.fetchPage(this.options).then((result) => {
      this.itemCount = (result && result.count) || 0;
      cardModule.setCollection(apiModule.fetchedCards);
    });
  }
  nameInputCleared(): void {
    this.filterOptions.name = "";
  }
  textInputCleared(): void {
    this.filterOptions.text = "";
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
      value: "price",
      width: "12%",
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
  get keywords(): string[] {
    return this.cards
      .map((card) => {
        return card.keywords;
      })
      .flat();
  }
  get options(): {
    tableOptions: DataTableOptions;
    filterOptions: FilterOptions;
  } {
    return {
      tableOptions: this.tableOptions,
      filterOptions: this.filterOptions,
    };
  }
  get optionsString(): string {
    return JSON.stringify(this.options);
  }

  removeIdentity(identity: Identity): void {
    const index = this.filterOptions.colors.indexOf(identity);
    this.filterOptions.colors.splice(index, 1);
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
  @Watch("optionsString")
  optionsChanged(): void {
    this.fetchPage();
  }
  @Watch("nameSearch")
  nameSearchChanged(search: string): void {
    if (search == "") {
      this.nameOptions = [];
    } else {
      apiModule.fetchCardNames(search).then((names) => {
        if (names) this.nameOptions = names;
      });
    }
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
