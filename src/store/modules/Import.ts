import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";
import Card from "@/types/Card";

@Module({ name: "app", store, dynamic: true })
class ImportModule extends VuexModule {
  csv = "";
  cards: Card[] = [];

  @Mutation
  setCSV(val: string) {
    this.csv = val;
  }

  @Action
  fileSelected(val: File) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const result: string | null = reader.result as string | null;
      if (result) {
        this.context.commit("setCSV", result);
      }
    });
    reader.readAsText(val);
    return val;
  }
  @Action
  parseCSV() {
    return;
  }
}

export default getModule(ImportModule);
