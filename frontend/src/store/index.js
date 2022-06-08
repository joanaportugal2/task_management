import Vue from "vue";
import Vuex from "vuex";
import api from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("appToken")
      ? sessionStorage.getItem("appToken")
      : "",
  },
  getters: {
    getToken: (state) => state.token,
  },
  mutations: {
    SET_TOKEN(state, item) {
      state.token = item;
      sessionStorage.setItem("appToken", item);
    },
  },
  actions: {
    async registerAccount(context, payload) {
      try {
        const response = await api.post("/users", payload);
        return response.data.message;
      } catch ({ response }) {
        return response.data.error;
      }
    },
    async logAccount(context, payload) {
      try {
        const response = await api.post("/users/login", payload);
        if (response.data.success) {
          context.commit("SET_TOKEN", response.data.authKey);
        }
      } catch ({ response }) {
        alert(response.data.error);
      }
    },
  },
});
