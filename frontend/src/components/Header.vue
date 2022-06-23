<template>
  <header class="w-100 d-flex justify-content-between p-3">
    <Logo />

    <div
      v-if="getUserData.avatar"
      class="col-4 col-md-2 d-flex justify-content-end align-items-center"
    >
      <router-link :to="{ name: 'Profile' }">
        <img
          :src="getUserData.avatar"
          alt="avatar image"
          class="rounded-circle mx-1"
      /></router-link>
      <button @click="logout" class="btn">
        <BIconBoxArrowRight />
        Logout
      </button>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { BIconBoxArrowRight } from "bootstrap-vue";
import Logo from "./Logo.vue";

export default {
  name: "Header",
  components: {
    Logo,
    BIconBoxArrowRight,
  },
  methods: {
    ...mapActions(["profileData"]),
    ...mapMutations(["SET_TOKEN"]),
    logout() {
      this.SET_TOKEN("");
      location.reload();
    },
  },
  computed: {
    ...mapGetters(["getUserData"]),
  },
  created() {
    this.profileData();
  },
};
</script>

<style scoped>
img {
  width: 2.5rem;
}
</style>
