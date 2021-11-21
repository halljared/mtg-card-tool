import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";
import { fromCSV, ScryfallCard } from "@/types/Card";
import { parse } from "csv-parse/lib/sync";
import apiModule from "@/store/modules/API";
import { CSV } from "@/types/CSV";

@Module({ name: "import", store, dynamic: true })
class ImportModule extends VuexModule {
  fileText = "";
  csv: CSV[] = [];

  @Mutation
  setCSV(val: CSV[]) {
    this.csv = Array.from(val);
  }
  @Mutation
  setFileText(val: string) {
    this.fileText = val;
  }

  @Action
  fileSelected(
    val: File
  ): Promise<PromiseSettledResult<void | ScryfallCard>[]> {
    const reader = new FileReader();
    const fetchPromise = new Promise<
      PromiseSettledResult<void | ScryfallCard>[]
    >((resolve) => {
      reader.addEventListener("load", () => {
        const result: string | null = reader.result as string | null;
        if (result) {
          this.context.commit("setFileText", result);
          const records = parse(result, {
            columns: true,
            skip_empty_lines: true,
          });
          this.context.commit("setCSV", records);
          const promises: Promise<void | ScryfallCard>[] = [];
          for (const record of records) {
            promises.push(apiModule.fetchCard(fromCSV(record)));
          }
          const promiseAll = Promise.allSettled(promises);
          resolve(promiseAll);
        }
      });
      reader.readAsText(val);
    });
    return fetchPromise;
  }
  @Action
  parseCSV() {
    return;
  }
}

export default getModule(ImportModule);
