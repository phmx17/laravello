import Vue from "vue";
import Vuex from "vuex";
import apollo from "./apollo.config";
import Me from "./graphql/Me.gql";

Vue.use(Vuex);

const store = {
  state: {
    isLoggedIn: false,
    user: {
      id: null,
      name: null,
      email: null
    }
  },
  mutations: {
    setLoggedIn(state, payload) {
      state.isLoggedIn = Boolean(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    async setLoggedIn({ commit }, payload) {  // {} = destructure,extract only commit function
      const isLoggedIn = Boolean(payload);
      localStorage.setItem("isLoggedIn", isLoggedIn); // only stores as string; no objs and no arrays!
      commit("setLoggedIn", isLoggedIn);
    },
    async logout({ commit, dispatch }) {
      commit("setUser", {
        id: null,
        name: null,
        email: null
      });
      dispatch("setLoggedIn", false);
    },
    async fetchCurrentUser({ commit, dispatch }) {
      const result = await apollo.defaultClient.query({
        query: Me,
        fetchPolicy: "no-cache"
      });
      const user = result.data?.me;

      // if there is a user returned commit setUser and setLoggedIn
      if (user) {
        commit("setUser", user);
        dispatch("setLoggedIn", true);
      } else {  // otherwise empty out local storge and dispatch false to store
        dispatch("logout");
      }
    }
  }
};

export default new Vuex.Store(store);