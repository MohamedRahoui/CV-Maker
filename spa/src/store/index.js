import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const vuexStorage = new VuexPersist({
  key: 'camipa',
  storage: localStorage,
  reducer: (state) => ({
    auth: {
      token: state.auth.token,
      user: state.auth.user,
    }
  })
});

export default function (/* { ssrContext } */) {
  return new Vuex.Store({
    modules: {
      auth
    },
    plugins: [vuexStorage.plugin],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
}
