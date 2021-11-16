import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";

@Module({ name: "app", store, dynamic: true })
class AppModule extends VuexModule {
  drawer = true;

  @Mutation
  setAppDrawer(val: boolean) {
    this.drawer = val;
  }

  @Action({ commit: "setAppDrawer" })
  setDrawer(val: boolean) {
    return val;
  }
}

export default getModule(AppModule);
