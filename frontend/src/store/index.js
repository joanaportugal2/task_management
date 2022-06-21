import Vue from "vue";
import Vuex from "vuex";
import api from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem("appToken")
      ? sessionStorage.getItem("appToken")
      : "",
    user: {},
  },
  getters: {
    getToken: (state) => state.token,
    getUserData: (state) => state.user,
  },
  mutations: {
    SET_TOKEN(state, item) {
      state.token = item;
      sessionStorage.setItem("appToken", item);
    },
    SET_USER(state, item) {
      state.user = item;
    },
  },
  actions: {
    async registerAccount(context, payload) {
      try {
        const response = await api.post("/users", payload);
        return response.data.message;
      } catch ({ response }) {
        alert(response.data.error);
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
    async resetPassword(context, payload) {
      try {
        const response = await api.patch("/users/reset", payload);
        if (response.data.success) {
          return response.data.message;
        }
      } catch ({ response }) {
        alert(response.data.error);
      }
    },
    async profileData(context) {
      try {
        const response = await api.get("/users/profile", {
          headers: { Authorization: `Bearer ${this.state.token}` },
        });
        if (response.data.success) {
          context.commit("SET_USER", response.data.user);
        }
      } catch ({ response }) {
        alert(response.data.error);
      }
    },
  },
});
