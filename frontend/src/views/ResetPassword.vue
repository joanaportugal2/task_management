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
      <h2 class="my-4">Getting a new password</h2>
      <BForm class="col-8 col-md-4" @submit.prevent="reset">
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
        <BFormGroup label="Email" label-for="input-email">
          <BFormInput
            id="input-email"
            class="my-1 px-1 border-0 border-bottom"
            type="email"
            v-model="form.email"
            placeholder="Enter email"
            required
          />
        </BFormGroup>
        <BFormGroup label="Password" label-for="input-password">
          <BFormInput
            id="input-password"
            class="my-1 px-1 border-0 border-bottom"
            type="password"
            v-model="form.newPassword"
            placeholder="Enter password"
            required
          />
        </BFormGroup>
        <button class="col-12 px-2 py-1 mt-4 btn btn-danger fw-bold">
          Set as new password
        </button>
      </BForm>
      <div class="mt-4 col-4">
        <p class="alert alert-success p-1" role="alert" v-if="message">
          {{ message }}
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
import router from "../router";
import { BForm, BFormGroup, BFormInput } from "bootstrap-vue";
import { mapActions } from "vuex";

export default {
  name: "ResetPassword",
  data() {
    return {
      form: {
        username: "",
        email: "",
        newPassword: "",
      },
      message: "",
    };
  },
  methods: {
    goRegister() {
      router.push({ name: "Register" });
    },
    goLogin() {
      router.push({ name: "Login" });
    },
    reset() {
      this.resetPassword(this.form).then((text) => (this.message = text));
    },
    ...mapActions(["resetPassword"]),
  },
  components: {
    Logo,
    BForm,
    BFormGroup,
    BFormInput,
  },
};
</script>

<style scoped></style>
