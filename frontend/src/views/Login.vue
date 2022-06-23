<template>
  <div class="page">
    <header class="d-flex justify-content-between align-items-center p-3">
      <Logo />
      <div>
        <button class="px-2 py-1 btn" @click="goLogin">Log in</button>
        <button class="px-2 py-1 btn btn-danger fw-bold" @click="goRegister">
          Start for free
        </button>
      </div>
    </header>

    <main class="d-flex flex-column align-items-center">
      <h2 class="my-4">Log In</h2>
      <BForm class="col-8 col-md-4" @submit.prevent="login">
        <BFormGroup label="Username" label-for="input-username">
          <BFormInput
            id="input-username"
            class="my-1 px-1 border-0 border-bottom"
            type="text"
            v-model="form.username"
            placeholder="Enter username"
            required
          />
        </BFormGroup>
        <BFormGroup label="Password" label-for="input-password">
          <BFormInput
            id="input-password"
            class="my-1 px-1 border-0 border-bottom"
            type="password"
            v-model="form.password"
            placeholder="Enter password"
            required
          />
        </BFormGroup>
        <button class="col-12 px-2 py-1 mt-4 btn btn-danger fw-bold">
          Log in
        </button>
      </BForm>
      <router-link :to="{ name: 'ResetPassword' }" class="mt-4"
        >Forgot password? Reset here!</router-link
      >
    </main>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
import router from "../router";
import { BForm, BFormGroup, BFormInput } from "bootstrap-vue";
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    goRegister() {
      router.push({ name: "Register" });
    },
    goLogin() {
      router.push({ name: "Login" });
    },
    login() {
      this.logAccount(this.form).then(() => location.reload());
    },
    ...mapActions(["logAccount"]),
  },
  components: {
    Logo,
    BForm,
    BFormGroup,
    BFormInput,
  },
};
</script>

<style scoped>
a {
  color: black;
}
</style>
