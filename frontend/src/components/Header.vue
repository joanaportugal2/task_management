<template>
  <header class="w-100 d-flex justify-content-between p-3">
    <Logo />

    <div v-if="getUserData.avatar" class="d-flex justify-content-end">
      <img
        :src="getUserData.avatar"
        alt="avatar image"
        class="col-2 rounded-circle mx-1"
      />
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

<style scoped></style>
