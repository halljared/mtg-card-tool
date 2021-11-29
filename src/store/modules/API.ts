import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import axios from "axios";
import store from "@/store";
import Card, { key, ScryfallCard } from "@/types/Card";
import {
  DB_HOST,
  FETCH_All_CARDS_ROUTE,
  FETCH_CARD_NAME_OPTIONS_ROUTE,
  FETCH_CARD_ROUTE,
  FETCH_KEYWORD_OPTIONS_ROUTE,
  FETCH_PAGE_ROUTE,
  FETCH_SET_NAME_OPTIONS_ROUTE,
  FETCH_SUBTYPE_OPTIONS_ROUTE,
  FETCH_SUPERTYPE_OPTIONS_ROUTE,
  FilterOptions,
} from "@/types/API";
import { DataTableOptions } from "../../types/Vuetify";

@Module({ name: "api", store, dynamic: true })
class APIModule extends VuexModule {
  response = "";
  fetchedCards: ScryfallCard[] = [];

  @Mutation
  setResponse(val: string) {
    this.response = JSON.stringify(val);
  }
  @Mutation
  addFetchedCard(options: [Card, ScryfallCard]) {
    const card = options[0];
    let sfCard = options[1];
    sfCard = Object.assign(Object.assign({}, card), sfCard);
    sfCard.id = key(sfCard);
    this.fetchedCards.push(sfCard);
  }
  @Mutation
  setFetchedCards(cards: ScryfallCard[]) {
    for (const card of cards) {
      card.id = key(card);
    }
    this.fetchedCards = cards;
  }

  @Action
  fetchCardNames(search: string): Promise<void | string[]> {
    return axios
      .get<string[]>(`${DB_HOST}/${FETCH_CARD_NAME_OPTIONS_ROUTE}`, {
        params: { search },
      })
      .then((response) => {
        if (response.data) {
          return response.data;
        }
      });
  }
  @Action
  fetchSetNames(): Promise<void | string[]> {
    return axios
      .get<string[]>(`${DB_HOST}/${FETCH_SET_NAME_OPTIONS_ROUTE}`)
      .then((response) => {
        if (response.data) {
          return response.data;
        }
      });
  }
  @Action
  fetchKeywordOptions(): Promise<void | string[]> {
    return axios
      .get<string[]>(`${DB_HOST}/${FETCH_KEYWORD_OPTIONS_ROUTE}`)
      .then((response) => {
        if (response.data) {
          return response.data;
        }
      });
  }
  @Action
  fetchSubTypeOptions(): Promise<void | string[]> {
    return axios
      .get<string[]>(`${DB_HOST}/${FETCH_SUBTYPE_OPTIONS_ROUTE}`)
      .then((response) => {
        if (response.data) {
          return response.data;
        }
      });
  }
  @Action
  fetchSuperTypeOptions(): Promise<void | string[]> {
    return axios
      .get<string[]>(`${DB_HOST}/${FETCH_SUPERTYPE_OPTIONS_ROUTE}`)
      .then((response) => {
        if (response.data) {
          return response.data;
        }
      });
  }

  @Action
  fetchAll(): Promise<void> {
    return axios
      .get<ScryfallCard>(`${DB_HOST}/${FETCH_All_CARDS_ROUTE}`)
      .then((response) => {
        if (response.data) {
          this.context.commit("setFetchedCards", response.data);
        }
      });
  }

  @Action
  fetchCard(card: Card): Promise<void | ScryfallCard> {
    return axios
      .get<ScryfallCard>(
        `${DB_HOST}/${FETCH_CARD_ROUTE}/set/${card.setCode.toLowerCase()}/number/${
          card.setNumber
        }`
      )
      .then((response) => {
        this.context.commit("setResponse", response.data);
        if (response.data) {
          this.context.commit("addFetchedCard", [card, response.data]);
        }
      });
  }

  @Action
  fetchPage(options: {
    tableOptions: DataTableOptions;
    filterOptions: FilterOptions;
  }): Promise<void | { count: number; docs: ScryfallCard[] }> {
    return axios
      .post<void | { count: number; docs: ScryfallCard[] }>(
        `${DB_HOST}/${FETCH_PAGE_ROUTE}`,
        {
          tableOptions: options.tableOptions,
          filterOptions: options.filterOptions,
        }
      )
      .then((response) => {
        this.context.commit("setResponse", response.data);
        if (response.data) {
          this.context.commit("setFetchedCards", response.data.docs);
        }
        return response.data;
      });
  }
}

export default getModule(APIModule);
